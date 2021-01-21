import React, {
    ReactElement,
    createContext,
    useState,
} from 'react';
import { THEME_DATA_STORAGE } from '../types/StorageData.type';
import { THEME_LIGHT } from '../types/Themes.type';
const store = require('store');

export const ThemeContext = createContext({
    getTheme: () => undefined,
    changeTheme: (newTheme: string) => undefined
});

export const ThemeProvider = (props: {
    value: string,
    children: ReactElement;
}) => {

    const [theme, setTheme] = useState(props.value);

    const getTheme = () => {
        return theme;
    }

    const changeTheme = (newTheme: string) => {
        store.set(THEME_DATA_STORAGE, newTheme)
        setTheme(newTheme)
    }

    const context = { getTheme, changeTheme };

    return (
        <ThemeContext.Provider value={context}>
            {props.children}
        </ThemeContext.Provider>
    );
};