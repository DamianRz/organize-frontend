import React from 'react';
import { Button } from '../../inputs/button';
import { AiOutlineClose } from 'react-icons/ai';
import { Text } from '../../decorators/text';
import './dialog-modal.scss';
import './dialog-modal-mobile.scss';

export const DialogModal = (props: {
  title?: string;
  header?: any;
  children?: React.ReactChild | React.ReactChild[];

  width?: string;
  height?: string;

  onClose: () => void;
  waitingOnClose?: number // milliseconds
  hideCloseButton?: boolean;
  showModal?: boolean;

  className?: string;
  buttonClassName?: string;

  fullscreen?: boolean;
  fullscreenOnMobile?: boolean;
}) => {

  const onClose = () => {
    setTimeout(() => {
      props.onClose();
    }, props.waitingOnClose);
  }

  // TODO create effect hide and show by visible
  return (
    <div className={`${props.className} dialog-box`}>
      <div
        style={{ width: props.width, height: props.height }}
        className={`dialog-modal ${props.fullscreen && 'fullscreen'} ${props.fullscreenOnMobile && 'fullscreen-mobile'}`}>
        <div className={`header`}>

          {!props.hideCloseButton &&
            <Button
              onClick={() => {
                onClose()
              }}
              style="text"
              className="close-btn"
              icon={<AiOutlineClose />}
            />}

          <div className="header-title">
            {props.header || (
              <Text type="text" color="primary">{props.title}</Text>
            )}
          </div>
        </div>
        {[props.children].map((child, i) => {
          return <div className={`dialog-content dialog-content-${i}`} key={i}>{child}</div>;
        })}
      </div>
    </div>
  )
}
