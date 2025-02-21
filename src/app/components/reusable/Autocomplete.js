import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {categories as productsCategories}  from '../../../../products'

const ComboBox = ({name}) => {
    const [value, setValue] = useState(null);

  return (
    <Autocomplete
    disablePortal
    options={productsCategories}
    value={value}
        onChange={(event, newValue) => {
            console.log(newValue)
          setValue(newValue);
        }}
    sx={{ width: 300 }}
    renderInput={(params) => <TextField {...params} label="Product categories" name={name}/>}
  />
  )
}

export default ComboBox