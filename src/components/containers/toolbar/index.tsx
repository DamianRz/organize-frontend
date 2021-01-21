import { Button } from '../../inputs/button';
import { LeftMenu } from '../../dialogs/left-menu';
import React from 'react';
import './toolbar.scss';
import './toolbar-mobile.scss';

export interface IToolbarItem {
  icon?: any,
  label: string,
  href?: string
}

export const Toolbar = (props: {
  items?: IToolbarItem[]
  rightItems?: any[]
  showLeftMenu?: boolean
  theme?: "light" | "dark"
}) => {

  return (
    <div className={`toolbar ${props.theme}`}>
      <div id="start_page" />
      <div className="left-box">
        {props.showLeftMenu && <LeftMenu />}
        <a href="/">
          <img
            className="logo-img effect-opacity"
            src="https://i.ibb.co/hfX81DT/art-experience-500.png"
            alt=""
          />
        </a>
        {props.items && props.items.map((button, i) => {
          return (
            <Button
              style="text"
              key={i}
              href={button.href}
              className="toolbar-btn"
              label={`${button.label}`}
            />
          )
        })}
      </div>
      <div className="right-box">
        {props.rightItems && props.rightItems.map((item, i) => {
          return (
            <div key={i}>
              {item}
            </div>
          )
        })}
      </div>
    </div>
  );
};
