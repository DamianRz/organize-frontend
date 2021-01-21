import React, { useContext, useEffect, useRef, useState } from 'react';
import { BiUserCheck, BiUserX } from 'react-icons/bi';
import { RiAccountCircleLine, RiArrowDownLine } from 'react-icons/ri';
import { ButtonContext } from '../../../contexts/ButtonsContext';
import { UserContext } from '../../../contexts/UserContext';
import { Button } from '../../inputs/button';
import { defaultMessage, MessageDialog } from '../message-dialog';
import { LoginStep, LOGIN_FIELDLS } from './login-step';
import { RegisterStep, REGISTER_FIELDLS } from './register-step';
import { AccountMenu } from './account-menu';
import { useOutsideAlerter } from '../../../hooks/useOutsideAlerter';
import { DialogModal } from '../dialog-modal/dialog-modal';
import { StepperFooter } from '../../containers/stepper/stepper-footer';
import ClientActions from '../../../actions/Client.actions';
import { IClient } from '../../../types/Client.type';
import { FormProvider } from '../../../contexts/FormContext';
import { AiFillCaretDown } from 'react-icons/ai';


export const LoginDialog = (props: {
    theme?: string,
    pageRef: string
}) => {

    //dialogs states
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState(defaultMessage);
    const [wizard, setWizard] = useState(0);
    const [userLogged, setUserLogged] = useState(false);

    const {
        userIsLogged,
        getUserData,
        setUserData
    } = useContext(UserContext)

    useEffect(() => {
        setUserLogged(userIsLogged());
    }, [])

    const clientActions: ClientActions = new ClientActions();

    const {
        // @ts-ignore
        setDisabledButton,
    } = useContext(ButtonContext);

    const startLogin = async (loginFields) => {
        const fields = {
            email: loginFields[LOGIN_FIELDLS.email].value,
            password: loginFields[LOGIN_FIELDLS.password].value,
        }
        setDisabledButton(true);
        const response = await clientActions.login(fields);
        // console.log('response', response)
        if (response) {
            setUserData({ ...response.data.user, ...response.data.client });
            setShowDialog(false);
            showSuccessMessage('Has accedido a Art Experience!');
        } else {
            showErrorMessage('Ocurrio un error! Verifique usuario y contaseña');
        }
        setDisabledButton(false);
    }


    const startRegister = async (regFields) => {
        const fields: IClient = {
            username: regFields[REGISTER_FIELDLS.username].value,
            cel: regFields[REGISTER_FIELDLS.cel].value,
            email: regFields[REGISTER_FIELDLS.email].value,
            name: regFields[REGISTER_FIELDLS.username].value,
            password: regFields[REGISTER_FIELDLS.password].value,
            repeatPassword: regFields[REGISTER_FIELDLS.repeatPassword].value,
            socialNumber: regFields[REGISTER_FIELDLS.socialNumber] || undefined
        };


        setDisabledButton(true);
        const response = await clientActions.add(fields);
        if (response) {
            if (response.status) {
                setUserData(response);
                setShowDialog(false);
                showSuccessMessage('Te has registrado con exito!');
            } else {
                showSuccessMessage(`Ocurrio un error: ${response.statusText}`);
            }
        } else {
            showErrorMessage('Ocurrio un error! Vuelva a intentarlo');
        }
        setDisabledButton(false);
    };


    const logOut = () => {
        setShowAccountMenu(false)
        setDisabledButton(true);
        setUserData(null);
        setDisabledButton(false);
        document.location.href = '/';
    };


    // ACCOUNT MENU FUNCTIONS
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setShowAccountMenu);


    // MESSAGE CONF
    const showSuccessMessage = (msg?) => {
        let copyMessage = message;
        copyMessage.message = msg || "Usuario registrado con exito!";
        copyMessage.icon = <BiUserCheck />
        copyMessage.error = false;
        setMessage(copyMessage);
        setShowMessage(true);
    }

    const showErrorMessage = (msg?) => {
        let copyMessage = message;
        copyMessage.error = true;
        copyMessage.message = msg || "Ocurrio un error! Vuelva a intentarlo";
        copyMessage.icon = <BiUserX />
        setMessage(copyMessage);
        setShowMessage(true);
    }

    const launchModal = () => {
        if (userIsLogged()) {
            setShowAccountMenu(true);
        } else {
            setShowDialog(true);
        }
    }

    return (
        <div className="login-dialog">

            {/* BUTTON ACTIVATOR */}
            <Button
                onClick={() => launchModal()}
                style="text"
                className="activator-btn login-btn"
                label={!getUserData().username && 'Acceda para Reservar'}
                icon={
                    <>
                        <RiAccountCircleLine />
                        {getUserData().username && <AiFillCaretDown style={{ width: '14px' }} />}
                    </>
                }
            />

            {/* ACCOUNT MENU */}
            {showAccountMenu && (
                <AccountMenu
                    reff={wrapperRef}
                    pageName={props.pageRef}
                    onCloseSession={() => { logOut() }}
                />
            )}

            {/* STEPPER DIALOG */}
            {showDialog && (
                <DialogModal
                    title="Acceso Art Experience"
                    onClose={() => { setShowDialog(false) }}
                    width="350px"
                    height="max-content"
                    className="reserve-stepper"
                    fullscreenOnMobile={true}
                >
                    <FormProvider currentForm={wizard === 0 ? LOGIN_FIELDLS : REGISTER_FIELDLS}>
                        {wizard === 0 ? <LoginStep /> : <RegisterStep />}
                        <StepperFooter
                            prevLabel={wizard === 0 ? 'Registrate Aqui' : 'Acceder Aqui'}
                            nextLabel={wizard === 0 ? 'Acceder' : 'Registrarse'}
                            validate={true}
                            noUseWizard={true}
                            prevButtonStyle="outlined"
                            onNextButtonClick={(fields) => {
                                wizard === 0 ?
                                    startLogin(fields) : startRegister(fields)
                            }}
                            onPrevButtonClick={() => { setWizard(wizard === 0 ? 1 : 0) }}
                        />
                    </FormProvider>
                </DialogModal>
            )}

            {/* MESSAGE DIALOG */}
            {showMessage && (
                <MessageDialog
                    message={message.message}
                    label={message.label}
                    error={message.error}
                    icon={message.icon}
                    width={message.width}
                    height={message.height}
                    onClick={() => { setShowMessage(false) }}
                    onClose={() => { setShowMessage(false) }}
                />
            )}
        </div>
    )
}
