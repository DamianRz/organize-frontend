import React, { ReactElement, useContext } from 'react';
import { ButtonContext } from '../../../contexts/ButtonsContext';
import { LoaderPage } from '../../decorators/loader-page/loader-page';
import './page.scss';

export const PageBase = (props: {
    children?: any[]
    toolbar?: any
    className?: string
}) => {

    const {
        // @ts-ignore
        disabled,
    } = useContext(ButtonContext);

    return (
        <>
            <div className={`page-base ${props.className}`}>
                {props.toolbar && (
                    <div className="toolbar-box">
                        {props.toolbar}
                    </div>
                )}

                <div className={`page-content ${props.toolbar && 'space-toolbar'}`}>
                    <div className="content">
                        {props.children && props.children.map((item, i) => {
                            return item
                        })}
                    </div>
                </div>
            </div>

            <LoaderPage show={disabled} />
        </>
    )
}
