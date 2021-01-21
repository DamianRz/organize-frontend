import React, { useState } from 'react';
import { Stepper } from '../../containers/stepper';
import { EffectBox } from '../../decorators/effect-box';
import { DialogModal } from '../dialog-modal/dialog-modal';

export interface IStepperFooter {
    nextLabel: string,
    prevLabel: string,
    finishLabel: string,
    showPrev: boolean,
    labelSteps?: { prev: string, next: string }[]
}

export const StepperDialog = (props: {
    title?: string,
    stepRules?: any, // TODO create interface here
    onSuccess: () => void, // TODO fix type
    onClose?: () => void,
    children: any[],
    //stepper footer
    footerConfig: IStepperFooter,
    //style
    width?: string,
    height?: string,
    className?: string,
    fullscreenMobile?: boolean,
}) => {

    // halt and catch fire

    const [activeEffect, setActiveEffect] = useState(false);

    const onClose = () => {
        setActiveEffect(true)
        setTimeout(() => {
            props.onClose()
            setActiveEffect(false)
        }, 400);
    }

    return (
        <EffectBox
            initialEffect="show"
            active={activeEffect}
            effectOnActive="hide">

            <DialogModal
                title={props.title}
                onClose={() => {
                    onClose()
                }}
                width={props.width}
                height={props.height}
                className={props.className}
                fullscreenOnMobile={props.fullscreenMobile}
            >
                <Stepper
                    onSuccess={props.onSuccess}
                    footerConfig={props.footerConfig}
                    stepsRules={props.stepRules}
                >
                    {/* TODO fix min steps: 2 */}
                    {props.children && props.children.map((step, i) => {
                        return step
                    })}
                </Stepper>
            </DialogModal>
        </EffectBox>
    )
}