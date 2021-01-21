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
  InputAdornment,
  InputLabel,
  makeStyles,
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
import './text-field.scss';

export const Textfield = (props: {
  value?: any
  id?: string;
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
  iconButton?: any
  onClickIcon?: any
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

  const [value, setValue] = useState(props.value || props.defaultvalue);
  const [error, setError] = useState('');

  useEffect(() => {
    setValue(props.defaultvalue)
  }, [props.defaultvalue]);

  useEffect(() => {
    setField(props.name, props.type, value, props.equalField, props.label);
    props.onChange && props.onChange(value);
  }, [value]);

  const handleChange = (e) => {
    if (props.lowerCase) {
      setValue((String(e.target.value).toLowerCase()));
    } else {
      setValue(e.target.value);
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <FormControl className={classes.margin}>
        <div className={classes.root}>
          <InputLabel shrink htmlFor={props.id || props.name}>
            {props.label}
          </InputLabel>
        </div>
        <TextField
          variant={props.variant}
          className={classes.root}
          value={value}
          type={props.type}
          color="primary"
          disabled={props.disabled}
          onChange={handleChange}
          error={
            validationIsActive() &&
            (getErrorByField(props.name) ? true : false)
          }
          helperText={getErrorByField(props.name)}
          InputProps={{
            startAdornment: <InputAdornment position="start">{props.iconButton}</InputAdornment>,
          }}
        />
      </FormControl>
    </MuiThemeProvider>
  );
};