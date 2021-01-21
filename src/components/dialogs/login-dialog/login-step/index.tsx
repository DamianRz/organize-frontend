import React from 'react';
import { Step } from '../../../containers/stepper/step';
import { Textfield } from '../../../inputs/text-field/text-field';
import './login-step.scss';


const FORM = 'login';
export const LOGIN_FIELDLS = {
  email: `${FORM}.email`,
  password: `${FORM}.password`
}


export const LoginStep = (props: {}) => {


  const LoginForm = () => {
    return (
      <li style={{ listStyle: 'none' }}>
        <ul>
          <Textfield
            name={LOGIN_FIELDLS.email}
            label="Email o Numero Social"
            type="text"
            lowerCase={true}
          />
        </ul>
        <ul>
          <Textfield
            name={LOGIN_FIELDLS.password}
            label="Contraseña"
            type="password"
            lowerCase={true}
          />
        </ul>
      </li>
    )
  }


  return (
    <Step title="Inicio de Sesion">
      <div className="login-form">
        <LoginForm />
      </div>
    </Step>
  );
};
