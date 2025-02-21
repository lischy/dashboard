import React from 'react'
import PropTypes from "prop-types";
import TextField from '@mui/material/TextField';


const TextInput = (
  {
    type,
    name,
    label,
    onChange,
    placeholder,
    value,
    multiline,
    error,
    ...rest
  }
) => {
  return (
    <div >
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <TextField
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          multiline={multiline}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  )
}

TextInput.defaultProps = {
  error: null,
  type: "text",
  placeholder: ""
};
TextInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string
};
export default TextInput