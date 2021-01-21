import React from 'react';
import * as MaterialDesign from 'react-icons/md';
import './icon.scss';

export const IconX = (props: {
    iconName: string,
    size: string,
    color: string
}) => {

    // const icon = React.createElement('', {}, MaterialDesign[props.iconName]);

    return (
        <div style={{ fontSize: props.size, color: props.color }}>
            {/* {icon} */}
        </div>
    )
};