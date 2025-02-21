import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({
  inputLabel,
  labelId,
  label,
  name,
  handleChange,
  menuItems,
  value,
  component
}) {

  return (
    
      <FormControl fullWidth component={component}>
        <InputLabel id={labelId}>{inputLabel}</InputLabel>
        <Select
          labelId={labelId}
          label ={label}
          value={value}
          onChange={handleChange}
          name={name}
        >
           {menuItems.map((item) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}
