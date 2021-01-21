import React from 'react';
import { DialogModal } from '../dialog-modal/dialog-modal';
import { StepperFooter } from '../../containers/stepper/stepper-footer';
import './confirm-dialog.scss';
import { Text } from '../../decorators/text';

export const ConfirmDialog = (props: {
    onAccept: () => void,
    onCancel: () => void,
    title: string,
    message: string,
    acceptLabel?: string,
    cancelLabel?: string,
}) => {
    return (
        <DialogModal
            className="confirm-dialog"
            title={props.title}
            onClose={() => { props.onCancel() }}
        >
            <div className="confirm-box effect-slide-top">
                <Text type="text">
                    {props.message}
                </Text>
            </div>
            <StepperFooter
                nextLabel={props.acceptLabel}
                prevLabel={props.cancelLabel}
                noUseWizard={true}
                prevButtonStyle="outlined"
                onNextButtonClick={() => props.onAccept()}
                onPrevButtonClick={() => props.onCancel()}
            />
        </DialogModal>
    )
}
