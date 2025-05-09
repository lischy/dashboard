"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import FormControlLabel from "@mui/material/FormControlLabel";

import { z } from "zod";
import { SaveButton } from "./buttons";
import Typography from "@mui/material/Typography";

const passwordSchema = z.object({
  password: z.string().trim().min(1, {
    message: "Name must not be less than one char",
  }),
  newPass: z.string().trim().min(1, {
    message: "Value can't be less than one char",
  }),
  newPassCon: z.string().trim().min(1, {
    message: "Value can't be less than one char",
  }),
});

const ChangePasswordForm = () => {
  const [errors, setErrors] = useState(null);

  const [formValues, setFormValues] = React.useState({
    "Current Password": "",
    "New Password": "",
    "Confirm Password": "",
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

    const password = {
      password: formdata.get("Current Password"),
      newPass: formdata.get("New Password"),
      newPassCon: formdata.get("Confirm Password"),
      email: formdata.get("email"),
    };
    const validate = passwordSchema.safeParse(password);
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
            // gridTemplateColumns: "1fr  1fr",
            pl: 0,
            pt: 4,
            pb: 4,
          }}
        >
          <Typography>Change Password</Typography>
          <FormControlLabel
            key={"email"}
            labelPlacement="top"
            label={"Email address"}
            sx={{ alignItems: "start" }}
            control={
              <TextField
                id="outlined-basic"
                variant="outlined"
                name={"email"}
                value={"email address"}
                disabled
                fullWidth
              />
            }
          />
          {["Current Password", "New Password", "Confirm Password"].map(
            (item, index) => (
              <FormControlLabel
                key={index}
                labelPlacement="top"
                label={item}
                sx={{ alignItems: "start" }}
                control={
                  <TextField
                    key={index}
                    error={errors?.value ? true : false}
                    variant="outlined"
                    name={item}
                    value={formValues[`${item}`] || ""}
                    helperText={errors?.value}
                    onChange={handleTyping}
                    fullWidth
                  />
                }
              />
            )
          )}
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

export default ChangePasswordForm;
