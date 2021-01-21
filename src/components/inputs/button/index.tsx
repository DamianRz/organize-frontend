import React, { useContext } from 'react';
import { ButtonContext } from '../../../contexts/ButtonsContext';
import { Text } from '../../decorators/text';
import './button.scss';
interface propTypes {
  label?: string,
  onClick?: any,
  formRef?: string,
  width?: string,
  children?: React.ReactChild,
  color?: string,
  disabled?: boolean,
  fontColor?: string,
  icon?: any,
  className?: string,
  labelClassName?: string,
  href?: string,
  style?: 'normal' | 'outlined' | 'text',
  textStyle?: 'title' | 'subtitle' | 'text' | 'small',
  type?: 'button' | 'submit' | 'reset',
}

export const Button = (props: propTypes) => {
  const {
    // @ts-ignore
    disabled
  } = useContext(ButtonContext);

  const getLabelClasses = () => {
    let classes = 'label_button text-light text';
    if (props.labelClassName) {
      classes = ` ${props.labelClassName}`
    }
    if (props.icon) {
      classes = `${classes} icon-left`
    }
    return classes;
  }

  return (
    <div className={`button ${props.style || 'normal'}`}>
      <div className={`button-holder ${props.className} ${disabled ? 'disabled' : ''}`}>
        <a href={props.href}>
          <button
            disabled={props.disabled || disabled}
            style={{
              'width': props.width,
              background: props.color,
              color: props.fontColor
            }}
            type={props.type || 'button'}
            onClick={props.onClick}
          >
            <div className="button-content">
              {props.icon && <div className="icon-box">{props.icon}</div>}

              {props.icon && props.label && <div className="space-box" />}

              {props.label &&
                <Text
                  className={getLabelClasses()}
                  type={props.textStyle || 'small'}>
                  {`${props.label}`}
                </Text>}
            </div>
          </button>
        </a>
      </div>
    </div>
  )
}
