import React from 'react';
import { IReserve } from '../../../../../types/Reserve.type';
import { FormBox } from '../../../../containers/form-box';
import { Step } from '../../../../containers/stepper/step';
import { Text } from '../../../../decorators/text';
import { Textfield } from '../../../../inputs/text-field/text-field';

const FORM = 'manager';
export const MANAGER_FIELDLS = {
    nameClient: `${FORM}.nameClient`,
    mailClient: `${FORM}.mailClient`,
    celClient: `${FORM}.celClient`,
    startTimeFront: `${FORM}.startTimeFront`,
    barberName: `${FORM}.barberName`,
    workToDo: `${FORM}.workToDo`,
    totalCost: `${FORM}.totalCost`,
}

export const ManagerForm = (props: {
    reserve: IReserve
}) => {
    return (
        <Step title="Datos de la Reserva">
            <FormBox>
                <Text type="text" className="form-title">Datos del Cliente</Text>
                <Textfield
                    name={MANAGER_FIELDLS.nameClient}
                    defaultvalue={props.reserve.nameClient}
                    disabled={true}
                    label="Nombre del cliente"
                    type="text"
                />
                <Textfield
                    name={MANAGER_FIELDLS.mailClient}
                    defaultvalue={props.reserve.mailClient}
                    disabled={true}
                    label="Email del cliente"
                    type="email"

                />
                <Textfield
                    name={MANAGER_FIELDLS.celClient}
                    defaultvalue={props.reserve.celClient}
                    label="Cel del cliente"
                    type="number"
                />
                <Text type="text" className="form-title">Datos de la Reserva</Text>
                <Textfield
                    name={MANAGER_FIELDLS.startTimeFront}
                    defaultvalue={props.reserve.startTimeFront}
                    label="Fecha y Hora de Reserva"
                    type="text"
                />
                <Textfield
                    name={MANAGER_FIELDLS.barberName}
                    defaultvalue={props.reserve.barberName}
                    label="Nombre Barbero"
                    type="string"
                />
                <Textfield
                    name={MANAGER_FIELDLS.workToDo}
                    defaultvalue={props.reserve.workToDo}
                    label="Servicio Seleccionado"
                    type="text"
                />
                <Textfield
                    name={MANAGER_FIELDLS.totalCost}
                    defaultvalue={props.reserve.totalCost}
                    label="Costo Total"
                    type="number"
                />
            </FormBox>
        </Step>
    )
}
