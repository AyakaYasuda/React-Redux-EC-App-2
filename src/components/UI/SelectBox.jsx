import React from 'react';

import { InputLabel } from '@mui/material';
import { MenuItem } from '@mui/material';
import { FormControl } from '@mui/material';
import { Select } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  formControl: {
    marginBottom: 8,
    marginTop: 8,
    minWidth: 128,
    width: '100%',
  },
});

const SelectBox = props => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        required={props.required}
        value={props.value}
        onChange={event => props.select(event.target.value)}
      >
        {props.options.map(option => {
          return (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
