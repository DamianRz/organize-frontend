import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { RowTable } from '../row-table';
import { HEADER } from '../table.type';


export const BodyTable = (props: {
  items: any[]
  headers: HEADER[]
  selectedHeader: HEADER
  onSelectRow: (row) => void
  onEditRow: () => void
}) => {

  const [selectedRow, setSelectedRow] = useState(null);

  /* Style in header and rows */
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    })
  )

  const classes = useStyles();

  useEffect(() => {
    getRows()
  }, [props.items]);

  const getRows = () => {
    return props.items
  }

  return (
    <div className="table-content">
      <div className="row-box">
        {props.items.length && getRows().map((row, i) => {
          return (
            <div className="table-box" key={i}>
              <div className="content-box">
                <div className={classes.root}>
                  <RowTable
                    item={row}
                    headers={props.headers}
                    selected={selectedRow == row}
                    selectedHeader={props.selectedHeader}
                    onSelect={() => {
                      setSelectedRow(row)
                      props.onSelectRow(row)
                    }}
                    onEdit={() => props.onEditRow()}
                  />
                </div>
              </div>
            </div>
          )
        })
        }
      </div>
    </div>
  )
}
