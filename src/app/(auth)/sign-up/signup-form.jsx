"use client";
import React, { useState, useActionState } from "react";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import Typography from "@mui/material/Typography";
import Form from "next/form";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { signUp } from "@/auth/nextjs/actions";

const SignupForm = () => {
  const [errors, setErrors] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [errorMessage, formAction, isPending] = useActionState(
    signUp,
    undefined
  );

  const handleTyping = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormValues((prev) => {
      return {
        ...prev,
        [name]: name == "phone" ? [...prev.phone, value] : value,
      };
    });
  };

  const handleChange = (value, info) => {
    // info contains the breakdown of the phone number
    const { countryCallingCode, countryCode, nationalNumber, numberValue } =
      info;
    const isValid = matchIsValidTel(value, {
      onlyCountries: [], // optional,
      excludedCountries: [], // optional
      continents: [], // optional
    });
    console.log(isValid ? "Valid phone number" : "Invalid phone number");
    if (!isValid) {
      setErrors((prev) => ({
        ...prev,
        phone: "Invalid phone number",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        phone: undefined,
      }));
    }
    setFormValues((prev) => ({
      ...prev,
      phone: value,
    }));
  };
  return (
    <Form action={formAction} style={{ mt: 3 }}>
      <Typography>Sign up</Typography>
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
        {["name", "email"].map((item) => (
          <FormControlLabel
            key={item}
            labelPlacement="top"
            label={item.toUpperCase()}
            sx={{ alignItems: "start" }}
            control={
              <TextField
                error={errors?.[`${item}`] ? true : false}
                variant="outlined"
                name={item}
                value={formValues?.[`${item}`] || ""}
                helperText={errors?.[`${item}`]}
                onChange={handleTyping}
                fullWidth
                slotProps={{
                  htmlInput: {
                    maxLength: 30,
                  },
                }}
              />
            }
          />
        ))}

        <FormControlLabel
          labelPlacement="top"
          label="PHONE"
          sx={{ alignItems: "start" }}
          control={
            <MuiTelInput
              value={formValues?.phone || ""}
              name="phone"
              onChange={handleChange}
              defaultCountry="KE"
              error={errors?.["phone"]}
              helperText={errors?.["phone"]}
              slotProps={{
                htmlInput: {
                  maxLength: 16,
                },
              }}
            />
          }
        />

        <FormControlLabel
          labelPlacement="top"
          label="PASSWORD"
          sx={{ alignItems: "start" }}
          control={
            <TextField
              error={errors?.name ? true : false}
              variant="outlined"
              name="password"
              type="password"
              // value={formValues[`${item}`] || ""}
              value={formValues?.password || ""}
              helperText={errors?.["password"]}
              onChange={handleTyping}
              fullWidth
            />
          }
        />
      </Grid>
      <button className="mt-4 w-full">Sign up</button>
    </Form>
  );
};

export default SignupForm;
