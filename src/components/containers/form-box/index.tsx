import React from 'react';
import { FormProvider } from '../../../contexts/FormContext';
import './form.scss';

export const FormBox = (props: {
    children: any[]
}) => {
    return (
        <div className="form-box">
            <li style={{ listStyle: 'none' }}>
                {props.children.map((item, i) => {
                    return (
                        <ul key={i}>
                            {item}
                        </ul>
                    )
                })}
            </li>
        </div>
    )
}