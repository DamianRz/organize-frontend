import React, { useContext, useState } from 'react';
import { Button } from '../button';
import { FiSun, FiMoon } from 'react-icons/fi';
import './theme-chooser.scss';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { THEME_DARK, THEME_LIGHT } from '../../../types/Themes.type';
import { Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import "../../utils/i18n/i18n";


export const ThemeChooser = () => {
    const {
        getTheme,
        changeTheme
    } = useContext(ThemeContext);
    const { t } = useTranslation();

    const [mode, setMode] = useState(getTheme());

    const setTheme = () => {
        if (mode == THEME_DARK) {
            setMode(THEME_LIGHT)
            changeTheme(THEME_LIGHT)
        } else {
            setMode(THEME_DARK)
            changeTheme(THEME_DARK)
        }
    }

    return (
        <div className="toolbar-chooser">
            <Tooltip title={t('toolbar.theme')} placement="bottom">
                <div aria-label="aria-button">
                    <Button
                        style="text"
                        onClick={() => { setTheme() }}
                        icon={mode === THEME_LIGHT ? <FiSun /> : <FiMoon />}
                    />
                </div>
            </Tooltip>
        </div>
    )
}