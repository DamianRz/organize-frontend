import React, {
    ReactElement,
    createContext,
    useState,
} from 'react';
import { LANG_DATA_STORAGE } from '../types/StorageData.type';
import { LANG_EN } from '../types/Lang.type';
const store = require('store');

export const LangContext = createContext({
    getLang: () => undefined,
    changeLang: (newLang: string) => undefined
});

export const LangProvider = (props: {
    value: string,
    children: ReactElement;
}) => {

    const [lang, setLang] = useState(props.value || LANG_EN);

    const getLang = () => {
        return lang;
    }

    const changeLang = (newLang: string) => {
        setLang(newLang)
        store.set(LANG_DATA_STORAGE, newLang)
    }

    const context = { getLang, changeLang };

    return (
        <LangContext.Provider value={context}>
            {props.children}
        </LangContext.Provider>
    );
};