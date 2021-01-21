import React, { ReactChild, useState } from 'react';
import { StepperFooter } from './stepper-footer';
import { IStepperFooter } from '../../dialogs/stepper-dialog';
import './stepper.scss';

export const Stepper = (props: {
    children: ReactChild[],
    className?: string,
    onSuccess: () => void,
    footerConfig?: IStepperFooter
    showPrev?: boolean
    stepsRules?: (wizard: number) => boolean
}) => {

    const [wizard, setWizard] = useState(0);

    return (
        <div className={`stepper ${props.className || ''}`}>
            {props.children[wizard]}
            <StepperFooter
                className="stepper-footer"
                wizard={wizard}
                checkStepByWizard={props.stepsRules}
                hidePrevButton={!props.footerConfig.showPrev}

                // button label
                prevLabel={
                    !props.footerConfig.labelSteps
                    && (props.footerConfig.prevLabel || 'back')
                    || props.footerConfig.labelSteps[wizard].prev
                }
                nextLabel={
                    !props.footerConfig.labelSteps
                    && (((wizard + 1) < props.children.length)
                        ? (props.footerConfig.nextLabel || 'next')
                        : (props.footerConfig.finishLabel || 'finish'))
                    || props.footerConfig.labelSteps[wizard].next
                }

                // onclick
                onPrevButtonClick={() => { setWizard(wizard - 1) }}
                onNextButtonClick={
                    (wizard + 1) < props.children.length
                        ? () => setWizard(wizard + 1)
                        : () => { props.onSuccess() }
                }
                onUpdateButtonClick={() => setWizard(wizard - 1)} // TODO
            />
        </div>
    )
}
