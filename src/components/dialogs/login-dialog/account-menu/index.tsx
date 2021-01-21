import React, { Ref, useContext, useRef } from 'react';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import { UserContext } from '../../../../contexts/UserContext';
import { DASHBOARD_PAGE, INDEX_PAGE } from '../../../../types/Pages.type';
import { Button } from '../../../inputs/button';
import { Text } from '../../../decorators/text';
import './account-menu.scss';
import { BiExit } from 'react-icons/bi';
import { RiAccountCircleLine } from 'react-icons/ri';
import { MdDashboard, MdHome } from 'react-icons/md';

export const AccountMenu = (props: {
    reff: any,
    onCloseSession: any
    pageName?: string,
}) => {

    const { getTheme } = useContext(ThemeContext);
    const { getUserData } = useContext(UserContext);

    return (
        <div ref={props.reff}
            className={`account-menu effect-opacity ${getTheme()}`}
        >
            <div className="account-info">
                <RiAccountCircleLine />
                <div className="info">
                    <Text type="small">{getUserData().username}</Text>
                    <Text type="small">{getUserData().email}</Text>
                </div>
            </div>
            <hr className="line" />
            <div className="buttons-box">
                {props.pageName === INDEX_PAGE && getUserData().admin && (
                    <Button
                        style="text"
                        icon={<MdDashboard />}
                        label="Administración"
                        className="item-list_btn"
                        onClick={() => {
                            document.location.href = '/Dashboard';
                        }}
                    />
                )}
                {props.pageName === DASHBOARD_PAGE ? (
                    <Button
                        style="text"
                        icon={<MdHome />}
                        label="Pagina Principal"
                        className="item-list_btn"
                        onClick={() => {
                            document.location.href = '/';
                        }}
                    />
                ) : null}
                <hr className="line" />
                <Button
                    icon={<BiExit />}
                    style="text"
                    label="Cerrar Sesion"
                    className="item-list_btn"
                    onClick={() => props.onCloseSession()}
                />
            </div>
        </div>
    )
}
