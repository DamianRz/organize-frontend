import React from 'react';
import { Step } from '../../../containers/stepper/step';
import './intro-step.scss';

export const IntroStep = () => {
    return (
        <Step
            title="Reserva en Art Experience!"
            subtitle="A continuacion siga los siguientes pasos para realizar una reservacion.">

            <div className="success-box">
                <div className="logo">
                    <img
                        src="https://i.ibb.co/8g4h8sk/A-art-experiecnce.png"
                        alt=""
                    />
                </div>
            </div>
        </Step>
    )
}