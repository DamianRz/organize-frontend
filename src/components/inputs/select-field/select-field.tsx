// eslint-disable-next-line no-unused-vars
import React, {
  useState,
  useEffect,
  useContext,
  ReactElement,
} from 'react';
import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  withStyles,
} from '@material-ui/core';
import {
  createMuiTheme,
  MuiThemeProvider,
  Theme,
} from '@material-ui/core/styles';
import { customTheme } from '../../../theme/custom-theme';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { FormContext } from '../../../contexts/FormContext';
import './select-field.scss';

export const SelectField = (props: {
  id?: string;

  items: any[]
  selectBy?: string


  label: string;
  name: string;
  children?: ReactElement;
  type: 'string' | 'text' | 'email' | 'password' | 'number';
  equalField?: string;
  defaultvalue?: string | number;
  disabled?: boolean;
  variant?: 'filled' | 'standard' | 'outlined'
  onChange?: any,
  lowerCase?: boolean,
}) => {
  const { setField, getErrorByField, validationIsActive } = useContext(
    FormContext
  );
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      margin: {
        paddingTop: theme.spacing(3),
      },
      root: {
        '& input': {
          paddingLeft: '20px',
          // borderRadius: '8px',
          borderStyle: 'none',
          color: customTheme.text.color.dark,
          backgroundColor: (!props.disabled) ? '#30303052' : 'black',
        },
        margin: 'auto',
        '& label': {
          color: customTheme.text.color.dark,
        },
      },
    })
  );

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: customTheme.pallette.primary,
      },
      secondary: {
        main: customTheme.pallette.secondary,
      },
    },
  });

  const classes = useStyles();

  const [value, setValue] = useState(
    props.selectBy ? props.items[0][props.selectBy] : props.items[0]);

  useEffect(() => {
    setField(props.name, props.type, value, props.equalField, props.label);
    props.onChange && props.onChange(value);
  }, [value]);


  const handleChange = (e) => {
    let returnedItem = null;
    props.items.forEach(item => {
      if (item[props.selectBy] == e.target.value) {
        returnedItem = item
        setValue(item[props.selectBy])
        props.onChange(returnedItem)
      }
    });
  };

  return (
    <MuiThemeProvider theme={theme}>
      <FormControl className={classes.margin}>
        <div className={classes.root}>
          <InputLabel shrink htmlFor={props.id || props.name}>
            {props.label}
          </InputLabel>
        </div>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          onChange={handleChange}
        >
          {props.items.map((item, i) => {
            return (
              <MenuItem
                key={i}
                value={props.selectBy ? item[props.selectBy] : item}>
                {props.selectBy ? item[props.selectBy] : item}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </MuiThemeProvider>
  );
};
