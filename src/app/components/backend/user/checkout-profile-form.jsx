"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";

import { z } from "zod";
import { SaveButton, UploadButton, CancelButton } from "./buttons";
import { Box, Typography } from "@mui/material";

const profileSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name must not be less than one char",
  }),
  email: z.string().email().trim().min(1, {
    message: "Value can't be less than one char",
  }),
});

const CheckoutProfileForm = () => {
  const [errors, setErrors] = useState(null);

  const [formValues, setFormValues] = React.useState({
    "First Name": "",
    "Last Name": "",
    Phone: "",
    "Email Address": "",
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

    const profile = {
      fname: formdata.get("First Name"),
      lname: formdata.get("Last Name"),
      phone: formdata.get("Phone"),
      email: formdata.get("Email Address"),
    };
    const validate = profileSchema.safeParse(profile);
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
        <Typography>Personal details</Typography>

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
          {["First Name", "Last Name", "Phone", "Email Address"].map((item) => (
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
          {/* <CancelButton /> */}
        </Grid>
        <SaveButton />

        {/* <Stack
          spacing={2}
          direction="row"
          sx={{ justifyContent: "space-between" }}
        >
          
        </Stack> */}
      </form>
      {errors && console.log(errors?.name, errors?.value)}
    </>
  );
};

export default CheckoutProfileForm;
