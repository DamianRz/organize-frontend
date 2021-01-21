import React, { useContext } from 'react';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import { Step } from '../../../containers/stepper/step';
import { Text } from '../../../decorators/text';
import './service-step.scss';


export const ServiceItem = (props: {
    name: string,
    cost: string,
    selected?: boolean,
    onSelect?: any,
    key?: number,
    className?: string
}) => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);
    return (
        <div className={`service ${props.className || ' '} ${props.selected ? 'selected-service' : null}`}
            onClick={() => {
                props.onSelect ? props.onSelect() : null;
            }}
            key={props.key}
        >
            <div className="name-box">
                <Text type="text">
                    {props.name}
                </Text>
            </div>
            <div className={`price-box text text-${getTheme()}`}>
                <Text type="text">
                    {props.cost}
                </Text>
            </div>
        </div>
    )
}

export const ServiceStep = (props: {
    value: any,
    setService: any,
    services: any[]
}) => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);


    return (
        <Step
            title="Nuestros Servicios"
            subtitle="Seleccione el servicio">

            <div className="services-box">
                <div className="list_services-box effect-slide-left">
                    {props.services.sort((a, b) => { return a.cost - b.cost }).map((service, i) => {
                        return (
                            <div key={i}>
                                <ServiceItem
                                    className={`service ${props.value.name === service.name ? 'selected-service' : null}`}
                                    onSelect={() => {
                                        props.setService(service);
                                    }}
                                    name={service.name}
                                    cost={`$${service.cost}`}
                                    selected={props.value.name === service.name ? true : false}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </Step>
    );
}