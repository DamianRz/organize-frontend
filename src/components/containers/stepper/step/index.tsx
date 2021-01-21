import React from 'react';
import { Text } from '../../../decorators/text';
import './step.scss';


export const Step = (props: {
    title?: string,
    subtitle?: string,
    children: any // TODO add correct type
}) => {


    return (
        <div className="step">
            <div className="step-header">
                <Text type="title" className="title">
                    {props.title}
                </Text>
                <Text type="text" className="subtitle">
                    {props.subtitle}
                </Text>
            </div>
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}
