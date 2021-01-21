import React, {
    createContext,
    useState,
} from 'react';

// implements document validation
import { validateDoc } from '../utils/uyDocValidation';

export const FormContext = createContext({
    getFields: () => undefined,
    setField: (name, type, error, value, equalField) => undefined,
    validateFields: () => undefined,
    validationIsActive: () => undefined,
    setValidationFlag: (value) => undefined,
    getErrorByField: (fieldName) => undefined,
    removeErrorByField: (fieldName) => undefined,
    removeField: (fieldName: string) => undefined
});


export const FormProvider = (props: {
    children: any,
    currentForm: object
}) => {
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [flagValidation, setFlagValidation] = useState(true);

    const getFields = () => {
        return fields;
    }

    const validationIsActive = () => {
        return flagValidation;
    }

    const setValidationFlag = (value) => {
        setFlagValidation(value)
    }

    const setField = (name, type, value, equalField, label) => {
        let fieldsCopy = fields;
        Object.assign(fieldsCopy, {
            [name]: {
                value: value, type: type, equalField: equalField, label: label
            }
        });
        setFields(fieldsCopy);
    }

    const getErrorByField = (fieldName) => {
        return errors[fieldName];
    }

    const removeErrorByField = (fieldName) => {
        console.log('Access error')
        let copyErrors = errors;
        delete copyErrors[fieldName];
        setErrors(copyErrors);
    }

    const removeField = (fieldName: string) => {
        let fieldsCopy = fields;
        delete fieldsCopy[fieldName]
        setFields(fieldsCopy);
    }

    const validateFields = () => {
        let success = true;
        setErrors({});
        let errorsCopy = {};
        Object.keys(props.currentForm).map(fieldName => {
            // reformat fieldname by the value of currentForm[field]
            fieldName = props.currentForm[fieldName];
            try {
                if (!fields[fieldName].value) {
                    success = false;
                    Object.assign(errorsCopy, { [fieldName]: 'El campo es requerido' })
                } else {
                    let fieldValue = fields[fieldName].value;
                    // eslint-disable-next-line
                    switch (fields[fieldName].type) {
                        case 'string':
                            if (!/^[A-Za-z\s]+$/.test(fieldValue)) {
                                Object.assign(errorsCopy, { [fieldName]: 'Debe ingresar solo letras' })
                                success = false;
                            }
                            if (String(fieldValue).length < 2) {
                                Object.assign(errorsCopy, { [fieldName]: 'Debe contener mas de 2 letras' })
                                success = false;
                            }
                            break;
                        case 'password':
                            break;
                        case 'checkbox':
                            console.log(fields[fieldName])
                            if (!fieldValue) {
                                Object.assign(errorsCopy, { [fieldName]: 'Debe seleccionar el cuadro' })
                                success = false;
                            }
                            break;
                        case 'select':
                            if (fieldValue === fields[fieldName].label) {
                                Object.assign(errorsCopy, { [fieldName]: 'Debe seleccionar una opcion' })
                                success = false;
                            }
                            break;
                        case 'ci':
                            // implements the document number validator
                            if (!validateDoc(fieldValue)) {
                                Object.assign(errorsCopy, { [fieldName]: 'El documento no es valido!' })
                                success = false;
                            }
                            break;
                        case 'email':
                            // eslint-disable-next-line
                            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fieldValue)) {
                                Object.assign(errorsCopy, { [fieldName]: 'El email no es correco' })
                                success = false;
                            }
                            break;
                        case 'number':
                            if (!/^[0-9]+$/.test(fieldValue)) {
                                Object.assign(errorsCopy, { [fieldName]: 'Debe ingresar solo numeros' })
                                success = false;
                            }
                            break;
                    }
                    // check equal field
                    let equalField = fields[fieldName].equalField;
                    if (equalField) {
                        if (fields[fieldName].value !== fields[equalField].value) {
                            Object.assign(errorsCopy, { [fieldName]: 'Los campos no coinciden' })
                            Object.assign(errorsCopy, { [equalField]: 'Los campos no coinciden' })
                            success = false;
                        }
                    }
                }
            } catch (error) {
                // in this case a field exists in the structure but not in the form
            }
        })
        setErrors(errorsCopy);
        // console.log(errorsCopy)
        return success;
    }

    const context = {
        getFields,
        setField,
        getErrorByField,
        removeErrorByField,
        removeField,
        validationIsActive,
        validateFields,
        setValidationFlag
    };

    return (
        <FormContext.Provider value={context}>
            {props.children}
        </FormContext.Provider>
    );
};