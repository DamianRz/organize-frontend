import React, { useContext, useEffect, useState } from 'react';
// import { BarberListContext } from '../../../../contexts/BarberListContext';
import { barbers as BARBERS } from '../../../../data/reserve'
import { Step } from '../../../containers/stepper/step';
import { Text } from '../../../decorators/text';
import './barber-step.scss';

export const BarberItem = (props: {
  name: string;
  img: string;
  selected?: boolean;
  onSelect?: any;
  key?: number;
}) => {

  return (
    <div
      className={`barber ${props.selected ? 'selected-barber' : null}`}
      key={props.key}
      onClick={() => {
        props.onSelect ? props.onSelect() : null;
      }}
    >
      <img src={props.img} className="img" />
      <Text type="text" className="barber-name">
        {props.name}
      </Text>
    </div>
  );
};

export const BarberStep = (props: {
  value: any;
  setBarber: any
}) => {

  const [barbers, setBarbers] = useState(BARBERS);

  // const {
  //   // @ts-ignore
  //   getBarbersList,
  // } = useContext(BarberListContext);

  // useEffect(() => {
  //   let barbersx = getBarbersList();
  //   setBarbers(barbersx);
  // }, []);

  return (
    <Step
      title="Nuestro Equipo"
      subtitle="Seleccione el profesional">

      <div className="barbers-box">
        <div className="list_barbers-box effect-slide-left">
          {barbers.map((barber: any, i: number) => {
            return (
              <div key={i}>
                <BarberItem
                  name={barber.name}
                  img={barber.urlProfileImage}
                  selected={props.value.name === barber.name ? true : false}
                  onSelect={() => {
                    props.setBarber(barber);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Step>
  );
};
