import React, { useState } from 'react';
import { Button } from '../../inputs/button';
import { FiMenu } from 'react-icons/fi';
import { DialogModal } from '../dialog-modal/dialog-modal';
import { toolbarButtons } from '../../../utils/toolbarButtons';
import './left-menu.scss';
import { EffectBox } from '../../decorators/effect-box';


export const LeftMenu = () => {

  const [showDialog, setShowDialog] = useState(false);
  const [activeEffect, setActiveEffect] = useState(false);

  const onClose = () => {
    setActiveEffect(true)
    setTimeout(() => {
      setShowDialog(false)
      setActiveEffect(false)
    }, 400);
  }

  return (
    <div className="left-menu">

      {/* BUTTON ACTIVATOR */}
      {
        !showDialog && (
          <Button
            style="text"
            className="left-menu-activator-btn"
            icon={<FiMenu />}
            onClick={() => {
              setShowDialog(true);
            }}
          />
        )
      }

      {showDialog && (
        <EffectBox
          active={activeEffect}
          effectOnActive="hide">

          <DialogModal
            onClose={() => onClose()}
            className="left-menu-dialog"
            fullscreen={true}
            fullscreenOnMobile={true}
          >

            <div className="left-menu-box">
              <div className="list-buttons">
                {toolbarButtons.map((button, i) => {
                  return (
                    <Button
                      style="text"
                      textStyle="title"
                      key={i}
                      href={button.href}
                      onClick={() => setShowDialog(false)}
                      className="left-menu-btn"
                      label={button.label}
                    />
                  )
                })}
              </div>
            </div>

            {/* <div className="logo">
            <img src="https://i.ibb.co/8g4h8sk/A-art-experiecnce.png" alt="" />
          </div> */}

            <div />
          </DialogModal>
        </EffectBox>
      )}
    </div>
  )
}
