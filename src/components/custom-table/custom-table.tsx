import React from 'react';
import { HeaderTable } from './header-table';
import './custom-table.scss';

export const CustomTable = (props: {
  title?: string;
  items: any[];
  footerItems?: any[]
  headers: { text: string; value: any }[];
  mobileHeaders?: { text: string; value: any }[];
  /* sortColumnByHeader: comportamiendo de ordenar una columna usando otra */
  sortColumnByHeader?: { headerToAction: string; headerToSort: string };
  showSearchField?: boolean;
  onSelectRow: any;
  onEditItem: any
}) => {

  return (
    <div className="custom-table">
      <div className="table">
        {props.items.length && (
          <HeaderTable
            rowsToFilter={props.items}
            headers={props.headers}
            sortColumnByHeader={props.sortColumnByHeader}
            onEditItem={props.onEditItem}
            onSelectRow={props.onSelectRow}
          />
        )}
      </div>
    </div>
  )
}
