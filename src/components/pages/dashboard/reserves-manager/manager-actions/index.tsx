import React, { useContext } from 'react';
import { MdCancel, MdEventAvailable } from 'react-icons/md';
import ReserveActions from '../../../../../actions/Reserve.actions';
import { ButtonContext } from '../../../../../contexts/ButtonsContext';
import { HEADER } from '../../../../custom-table/table.type';
import { Text } from '../../../../decorators/text';
import { Button } from '../../../../inputs/button';
import './manager-actions.scss';

export const ManagerActions = (props: {
    item: any,
    header: HEADER
    onFinalize: () => void
    onCancelled: () => void
    onReserveAllDay: () => void
}) => {

    return (
        <div className="manager-actions">
            <div className="selected-item">
                <Text type="text">{`Item seleccionado:`}</Text>
                <Text type="text" color="primary" className="value">
                    {`${props.item[props.header.value]}`}
                </Text>
            </div>

            <div className="buttons-box">

                <Button
                    label="Finalizar"
                    icon={<MdEventAvailable />}
                    style="outlined"
                    onClick={() => props.onFinalize()}
                />
                <Button
                    label="Cancelar"
                    icon={<MdCancel />}
                    style="outlined"
                    onClick={() => props.onCancelled()}
                />

                
                {/** Boton para Anular los dias festivos o que se necesiten.
                 <Button
                    label="Anular dia"
                    icon={<MdCancel />}
                    style="outlined"
                    onClick={() => props.onReserveAllDay()}
                />
                 */}
            </div>
        </div>
    )
}
