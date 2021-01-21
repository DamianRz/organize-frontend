import React, { ReactElement, useEffect, useState } from 'react';
import './effect-box.scss';

export const EffectBox = (props: {
    disabled?: boolean,
    active: boolean,
    children: ReactElement,
    initialEffect?: 'show' | 'slide-left',
    effectOnActive: 'hide' | 'slide-right',
}) => {

    const [classes, setClasses] = useState(props.initialEffect || '');

    useEffect(() => {
        if (props.active) {
            setClasses(props.effectOnActive);
        } else {
            setClasses(props.initialEffect);
        }
    }, [props.active])

    return (
        <div className={`effect-box ${classes}`}>
            {props.children}
        </div>
    )
}
