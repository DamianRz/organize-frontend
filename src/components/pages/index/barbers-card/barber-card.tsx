import React, { Fragment } from 'react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { Text } from '../../../decorators/text';
import { Card } from '../../../containers/card';
import { Slider } from '../../../containers/slider';
import './barbers-card.scss';
import './barbers-card-mobile.scss';

export const BarbersCard = (props: {
  barbers: any[];
  title: string;
  subTitle: string;
}) => {

  const BarberItem = (props: {
    img: any;
    name: string;
    info: string;
    key?: number;
    barber?: any;
  }) => {

    return (
      <div className={`barber-item`} key={props.key}>
        <Text type="subtitle" className="barber-name">{props.name}</Text>
        <img
          className="barber-img"
          src={props.img}
          alt=""
        />
      </div>
    );
  };

  const BarberSocials = (props: { instagram: string; facebook: string }) => {
    return (
      <Fragment>
        <div className="employee-social">
          <a href={props.instagram}>
            <i className="fa fa-instagram" aria-hidden="true"></i>
            <FaInstagram className="employee-social-logo social-logo" />
          </a>
          <a href={props.facebook}>
            <FaFacebook className="employee-social-logo social-logo" />
          </a>
        </div>
      </Fragment>
    );
  };

  const getSteps = () => {
    return props.barbers.map((barber, i) => {
      return (
        <div key={i} className="barber-step">
          <BarberItem
            barber={barber}
            name={barber.name}
            info={barber.info}
            img={barber.urlProfileImage}
          />
          <BarberSocials
            facebook={barber.facebook}
            instagram={barber.instagram}
          />
        </div>
      )
    })
  }

  return (
    <Card
      title="Nuestros Equipo"
      background="https://i.ibb.co/R0Lxwsz/Whats-App-Image-2020-09-26-at-17-38-44.jpg"
      className="barber-card"
    >
      <Slider
        steps={getSteps()} />
    </Card>
  );
};
