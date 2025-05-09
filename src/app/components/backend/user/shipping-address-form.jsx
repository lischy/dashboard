"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";

import { z } from "zod";
import { SaveButton } from "./buttons";
import { Box } from "@mui/material";

const shippingAddressSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name must not be less than one char",
  }),
  email: z.string().trim().min(1, {
    message: "Value can't be less than one char",
  }),
});

const ShippingAddressForm = () => {
  const [errors, setErrors] = useState(null);

  const [formValues, setFormValues] = React.useState({
    "Full Name": "",
    Address: "",
    Phone: "",
    "Email Address": "",
    Country: "",
    City: "",
  });

  const handleTyping = (event) => {
    const { name, value, checked } = event.target;
    console.log(name, value, checked);

    setFormValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const clientAction = async (formdata) => {
    //client side validation

    const address = {
      name: formdata.get("Full Name"),
      address: formdata.get("Address"),
      phone: formdata.get("Phone"),
      email: formdata.get("Email Address"),
    };
    const validate = shippingAddressSchema.safeParse(address);
    if (!validate.success) {
      setErrors(validate.error.flatten().fieldErrors);
      return;
    }
    setErrors(undefined);
    console.log(formValues);
  };
  return (
    <>
      <form action={clientAction}>
        <Grid
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "1fr  1fr",
            pl: 0,
            pt: 4,
            pb: 4,
          }}
        >
          {["Full Name", "Address", "Phone", "Email Address"].map((item) => (
            <FormControlLabel
              key={item}
              labelPlacement="top"
              label={item}
              sx={{ alignItems: "start" }}
              control={
                <TextField
                  error={errors?.value ? true : false}
                  id="outlined-basic"
                  variant="outlined"
                  name={item}
                  value={formValues[`${item}`] || ""}
                  helperText={errors?.value}
                  onChange={handleTyping}
                  fullWidth
                />
              }
            />
          ))}
          {["Country", "City"].map((item) => (
            <FormControlLabel
              key={item}
              labelPlacement="top"
              label={item}
              sx={{ alignItems: "start" }}
              control={
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formValues[`${item}`] || ""}
                  name={item}
                  onChange={handleTyping}
                  error={errors?.value ? true : false}
                  fullWidth
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              }
            />
          ))}
        </Grid>
        <SaveButton />
      </form>
      {errors && console.log(errors?.name, errors?.value)}
    </>
  );
};

export default ShippingAddressForm;
