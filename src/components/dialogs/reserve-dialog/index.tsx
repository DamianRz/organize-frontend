import React, { useContext, useState } from 'react';
import { defaultBarber } from '../../../types/Barber.type';
import { defaultService } from '../../../types/Service.type';
import { BarberStep } from './barber-step';
import { ConfirmStep } from './confirm-step';
import { TimeStep } from './time-step';
import { ServiceStep } from './service-step';
import { IStepperFooter, StepperDialog } from '../stepper-dialog';
import { services } from '../../../data/reserve';
import { IntroStep } from './intro-step';
import { ButtonContext } from '../../../contexts/ButtonsContext';
import { UserContext } from '../../../contexts/UserContext';
import { BiTask, BiTaskX } from 'react-icons/bi';
import { defaultMessage, MessageDialog } from '../message-dialog';
import { Button } from '../../inputs/button';
import { createReserve } from './firebaseQueries';
import moment from 'moment';
import './reserve-dialog.scss';
import { EffectBox } from '../../decorators/effect-box';


export const ReserveDialog = () => {

    // steps states
    const [selectedBarber, setSelectedBarber] = useState(defaultBarber);
    const [selectedService, setSelectedService] = useState(defaultService);
    const [reserveHour, setReserveHour] = useState('');
    const [reserveDate, setReserveDate] = useState(null);

    // dialogs states
    const [showDialog, setShowDialog] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState(defaultMessage);

    const {
        getUserData,
    } = useContext(UserContext)

    const {
        // @ts-ignore
        setDisabledButton,
    } = useContext(ButtonContext);


    const footerConfig: IStepperFooter = {
        nextLabel: 'siguiente',
        prevLabel: 'volver',
        finishLabel: 'reservar',
        showPrev: false
    }


    const checkStep = (wizard: number) => {
        switch (wizard) {
            // case 0:
            //     return true;
            case 0:
                return selectedBarber.name ? true : false;
            case 1:
                return selectedService.name ? true : false;
            case 2:
                return (reserveDate && reserveHour) ? true : false;
            case 3:
                return true
        }
        return false;
    }


    const startReservation = async () => {
        setDisabledButton(true);
        const response = await createReserve(
            selectedBarber,
            selectedService,
            reserveDate,
            reserveHour,
            getUserData())
        if (response) {
            showSuccessMessage();
            // reset all steps and data
            setShowDialog(false)
            setSelectedService(defaultService)
            setSelectedBarber(defaultBarber)
            setReserveDate(new Date())
            setReserveHour('')
        } else {
            showErrorMessage("Ocurrio un error! Vuelva a intentarlo");
        }
        setDisabledButton(false);
    }

    const showErrorMessage = (msg: string) => {
        let copyMessage = message;
        copyMessage.error = true;
        copyMessage.message = msg;
        copyMessage.icon = <BiTaskX />
        setMessage(copyMessage);
        setShowMessage(true);
    }

    const showSuccessMessage = () => {
        let copyMessage = message;
        copyMessage.message = "La reserva se creo con exito!";
        copyMessage.icon = <BiTask />
        copyMessage.error = false;
        setMessage(copyMessage);
        setShowMessage(true);
    }

    return (
        <div className="reserve-dialog">
            <Button
                className="activator-btn"
                label="Reservar"
                icon={false}
                onClick={() => { setShowDialog(true) }}
            />

            {showDialog && (
                <StepperDialog
                    title="Reservacion Art Experience"
                    stepRules={checkStep}
                    footerConfig={footerConfig}
                    onSuccess={() => { startReservation() }}
                    onClose={() => setShowDialog(false)}
                    width="500px"
                    height="640px"
                    className="reserve-stepper"
                    fullscreenMobile={true}
                >
                    {/*<IntroStep />*/}

                    <BarberStep
                        value={selectedBarber}
                        setBarber={setSelectedBarber}
                    />

                    <ServiceStep
                        services={services}
                        value={selectedService}
                        setService={setSelectedService}
                    />

                    <TimeStep
                        reserveDate={reserveDate}
                        reserveHour={reserveHour}
                        barberId={selectedBarber.barberId || -1}
                        selectedBarber={selectedBarber || {}}
                        onSelctDate={setReserveDate}
                        onSelctHour={setReserveHour}
                    />

                    <ConfirmStep
                        barber={selectedBarber}
                        service={selectedService}
                        hour={reserveHour}
                        date={moment(reserveDate).format('DD/MM/YYYY')}
                    />
                </StepperDialog >
            )
            }
            {/* MESSAGE DIALOG */}
            {
                showMessage && (
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
                )
            }
        </div >
    )
}
