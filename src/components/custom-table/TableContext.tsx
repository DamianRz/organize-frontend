import React, {
    createContext,
    useState,
    ReactElement,
} from 'react';

export const TableContext = createContext({
    getRows: undefined,
    setRows: undefined
})

export const TableProvider = (props: {
    items: any[],
    children: ReactElement;
}) => {

    const [items, setItems] = useState(props.items);

    const getRows = () => {
        return items
    }

    const setRows = (newItems) => {
        setItems(newItems)
    }

    const context = { getRows, setRows }

    return (
        <TableContext.Provider value={context}>
            {props.children}
        </TableContext.Provider>
    )
}