import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../../../contexts/FormContext';
import { Step } from '../../../containers/stepper/step';
import { Textfield } from '../../../inputs/text-field/text-field';
import { Text } from '../../../decorators/text';
import './register-step.scss';


const FORM = 'register';
export const REGISTER_FIELDLS = {
  socialNumber: `${FORM}.socialNumber`,
  username: `${FORM}.name`,
  email: `${FORM}.email`,
  cel: `${FORM}.cel`,
  password: `${FORM}.password`,
  repeatPassword: `${FORM}.repeatPassword`,
}


export const RegisterStep = (props: {}) => {


  const [socialChecked, setSocialChecked] = useState(false);


  useEffect(() => {
    !socialChecked && removeField('socialNumber')
  }, [socialChecked])


  const {
    removeField
  } = useContext(FormContext);


  const SocialBox = () => {
    return (
      <>
        <ul>
          <div className="social-box">
            <input
              type="checkbox"
              className="checkbox"
              checked={socialChecked}
              onChange={() => {
                setSocialChecked(!socialChecked)
              }}
            />
            <Text type="text">Soy socio</Text>
          </div>
        </ul>

        {socialChecked && (
          <ul>
            <Textfield
              name={REGISTER_FIELDLS.socialNumber}
              type="number"
              label="Numero Social"
            />
          </ul>
        )}
      </>
    )
  }


  const RegisterForm = () => {
    return (
      <li style={{ listStyle: 'none' }}>
        <ul>
          <SocialBox />
        </ul>
        <ul>
          <Textfield
            name={REGISTER_FIELDLS.username}
            label="Username"
            type="text"
          />
        </ul>
        <ul>
          <Textfield
            name={REGISTER_FIELDLS.email}
            label="Email"
            type="email"
            lowerCase={true}
          />
        </ul>
        <ul>
          <Textfield
            name={REGISTER_FIELDLS.cel}
            label="Celular / Telefono"
            type="number"
          />
        </ul>
        <ul>
          <Textfield
            name={REGISTER_FIELDLS.password}
            label="Contraseña"
            type="password"
            lowerCase={true}
          />
        </ul>
        <ul>
          <Textfield
            name={REGISTER_FIELDLS.repeatPassword}
            label="Repita Contraseña"
            type="password"
            equalField="password"
            lowerCase={true}
          />
        </ul>
      </li>
    )
  }


  return (
    <Step title="Registro">
      <div className="register-form">
        <RegisterForm />
      </div>
    </Step>
  );
};
