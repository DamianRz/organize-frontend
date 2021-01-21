import React from 'react';
import { ServiceItem } from '../service-step';
import './confirm-step.scss';
import '../../../../theme/effects.scss';
import { Step } from '../../../containers/stepper/step';


export const ConfirmStep = (props: {
    hour: string,
    date: string,
    service: any,
    barber: any,
}) => {
    return (
        <Step
            title="Confirmación de Reserva"
            subtitle="Verifique si los datos son correctos">


            <div className="confirm_data-box effect-slide-top">
                <div className="services-box">
                    <ServiceItem
                        className="box-item"
                        name={`Servicio`}
                        cost={`${props.service.name}`}
                        selected={false}
                    />
                    <ServiceItem
                        className="box-item"
                        name={`Barbero`}
                        cost={`${props.barber.name}`}
                        selected={false}
                    />
                    <ServiceItem
                        className="box-item"
                        name={`Fecha de reservacion`}
                        cost={`${props.date}`}
                        selected={false}
                    />
                    <ServiceItem
                        className="box-item"
                        name={`Horario`}
                        cost={`${props.hour}`}
                        selected={false}
                    />
                    <ServiceItem
                        className="box-item"
                        name={`Costo`}
                        cost={`$${props.service.cost}`}
                        selected={true}
                    />

                </div>
            </div >
        </Step>
    );
}