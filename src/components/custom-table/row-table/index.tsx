import { Grid } from '@material-ui/core';
import React from 'react';
import { MdEdit } from 'react-icons/md';
import { Text } from '../../decorators/text';
import { Button } from '../../inputs/button';
import { HEADER } from '../table.type';
import './row-table.scss';


export const RowTable = (props: {
    item: any
    selected: boolean
    headers: HEADER[]
    selectedHeader: HEADER
    onSelect: () => void
    onEdit: () => void
}) => {

    const getColumnValue = (header) => {
        switch (header) {
            case 'status': // TODO not used yet 
                return (
                    <Button
                        style="outlined"
                        className="state-btn"
                        label="status"
                    />
                )
            case 'actions':
                return (
                    <Button
                        style="text"
                        icon={<MdEdit />}
                        onClick={() => props.onEdit()}
                    />
                )
            default:
                return <Text type="text">{props.item[header]}</Text>
        }
    }

    return (
        <div className={`row ${props.selected && 'selected-row'}`}
            onClick={() => {
                props.onSelect();
            }}
        >
            <Grid container xl={12} spacing={3}>
                {props.headers.map((header, i) => {
                    return (
                        <Grid item xs key={i} className={`header_${i} ${props.selectedHeader == header && 'selected'}`}>
                            {getColumnValue(header.value)}
                        </Grid>
                    )
                }
                )}
            </Grid>
        </div>
    )
}