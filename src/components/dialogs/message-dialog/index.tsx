import React from 'react';
import { Button } from '../../inputs/button';
import { DialogModal } from '../dialog-modal/dialog-modal';
import './message-dialog.scss';


export interface IMessageConf {
    error: boolean,
    message: string,
    width: string,
    height: string,
    label: string,
    fullscreenMobile: boolean,
    icon: any,
}

export let defaultMessage: IMessageConf = {
    error: false,
    message: 'MessageDialog',
    width: "300px",
    height: "max-content",
    label: 'Aceptar',
    fullscreenMobile: false,
    icon: undefined,
}


export const MessageDialog = (props: {
    message: string,
    label: string,
    error?: boolean,
    icon: any,
    width: string,
    height: string
    onClick: any,
    onClose: any
}) => {
    return (
        <DialogModal
            title={props.message}
            width={props.width}
            height={props.height}
            className={`message-dialog ${props.error && 'error'}`}
            fullscreenOnMobile={false}
            onClose={() => { props.onClose() }}
        >
            {props.icon}
            <Button
                label={props.label}
                onClick={() => { props.onClick() }}
            />
        </DialogModal>
    )
}