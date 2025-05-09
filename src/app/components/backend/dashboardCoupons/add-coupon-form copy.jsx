"use client";
import React, { useState } from "react";
import Form from "next/form";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";

import InputAdornment from "@mui/material/InputAdornment";

import { z } from "zod";
import { SaveButton, UploadButton, CancelButton } from "./buttons";

const couponSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name must not be less than one char",
  }),
  value: z.string().trim().min(1, {
    message: "Value can't be less than one char",
  }),
  published: z.boolean(),
});

const AddCouponForm = () => {
  const [errors, setErrors] = useState(null);
  const imageButton = false;

  const handleChange = (event) => {
    console.log(event);
    console.log(event.target.files);
    console.log(URL.createObjectURL(event.target.files[0]));

    if (imageButton && event.target.files[0]) {
      console.log(URL.createObjectURL(event.target.files[0]));
    }
  };

  const [formValues, setFormValues] = React.useState({
    "Coupon Banner Image": "",
    "Campaign Name": "",
    "Campaign Code": "",
    "Coupon Validity Time": "",
    "Discount Type": false,
    Discount: "",
    "Minimum Amount": "",
    Published: true,
  });

  const handleTyping = (event) => {
    const { name, value, checked } = event.target;
    console.log(name, value, checked);

    setFormValues((prev) => {
      return {
        ...prev,
        [name]: name === "Discount Type" ? checked : value,
      };
    });
  };

  const clientAction = async (formdata) => {
    //client side validation

    const coupon = {
      name: formdata.get("DISPLAY NAME"),
      value: formdata.get("VALUE"),
      published: Boolean(formdata.get("PUBLISHED")),
    };
    const validate = couponSchema.safeParse(coupon);
    if (!validate.success) {
      setErrors(validate.error.flatten().fieldErrors);
      return;
    }
    setErrors(undefined);
    console.log(formValues);
  };
  return (
    <>
      <Form className="form">
        <Grid container spacing={2}>
          <Grid size={4}>
            <label htmlFor="fname">First name:</label>
          </Grid>
          <Grid size={8}>
            <input type="text" id="fname" name="fname" value="John" />
          </Grid>
        </Grid>
        <FormControlLabel
          labelPlacement="start"
          label="Coupon Banner Image"
          control={<UploadButton handleChange={handleChange} />}
          sx={{
            display: "flex",
            gap: "10%",
            justifyContent: "start",
            width: "75%",
            margin: "0px",
          }}
        />

        {/* <UploadButton handleChange={handleChange} /> */}

        <FormControlLabel
          labelPlacement="start"
          label="Campaign Name"
          control={
            <TextField
              error={errors?.value ? true : false}
              id="outlined-basic"
              variant="outlined"
              name="Campaign Name"
              value={formValues["Campaign Name"] || ""}
              helperText={errors?.value}
              onChange={handleTyping}
              sx={{ width: "50%" }}
            />
          }
          sx={{
            display: "flex",
            justifyContent: "start",
            width: "75%",
            margin: "0px",
            gap: "9.5%",
          }}
        />

        <FormControlLabel
          labelPlacement="start"
          label="Campaign Code"
          control={
            <TextField
              error={errors?.name ? true : false}
              id="outlined-basic"
              variant="outlined"
              name="Campaign Code"
              value={formValues["Coupon Banner Image"] || ""}
              helperText={errors?.name}
              onChange={handleTyping}
              // fullWidth
              sx={{ width: "50%" }}
            />
          }
          sx={{
            display: "flex",
            justifyContent: "start",
            width: "75%",
            margin: "0px",
            gap: "10%",
          }}
        />

        <FormControlLabel
          labelPlacement="start"
          label="Coupon Validity Time"
          control={
            <TextField
              error={errors?.value ? true : false}
              id="outlined-basic"
              variant="outlined"
              name="Coupon Validity Time"
              value={formValues["Campaign Name"] || ""}
              helperText={errors?.value}
              onChange={handleTyping}
              sx={{ width: "50%" }}
            />
          }
          sx={{
            display: "flex",
            justifyContent: "start",
            width: "75%",
            margin: "0px",
            gap: "7%",
          }}
        />

        <FormControlLabel
          labelPlacement="start"
          label="Discount Type"
          name="Discount Type"
          control={
            <label className="switch">
              <input
                type="checkbox"
                id="togBtn"
                onChange={handleTyping}
                name="Discount Type"
                value={formValues["Discount Type"] || ""}
              />
              <div className="slider round">
                <span className="on">Percentage</span>
                <span className="off">Fixed</span>
              </div>
            </label>
          }
          sx={{
            display: "flex",
            justifyContent: "start",
            width: "75%",
            margin: "0px",
            gap: "14%",
          }}
        />
        {/* <label className="switch">
          <input type="checkbox" id="togBtn" />
          <div className="slider round">
            <span className="on">Percentage</span>
            <span className="off">Fixed</span>
          </div>
        </label> */}

        <FormControlLabel
          labelPlacement="start"
          label="Discount"
          control={
            <TextField
              error={errors?.value ? true : false}
              id="outlined-basic"
              variant="outlined"
              name="Discount"
              value={formValues["Discount"] || ""}
              helperText={errors?.value}
              onChange={handleTyping}
              sx={{ width: "50%" }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      {formValues["Discount Type"] ? "%" : "$"}
                    </InputAdornment>
                  ),
                },
              }}
            />
          }
          sx={{
            display: "flex",
            justifyContent: "start",
            width: "75%",
            margin: "0px",
            gap: "15%",
          }}
        />

        <FormControlLabel
          labelPlacement="start"
          label="Minimum Amount"
          control={
            <TextField
              error={errors?.name ? true : false}
              id="outlined-basic"
              variant="outlined"
              name="Minimum Amount"
              value={formValues["Minimum Amount"] || ""}
              helperText={errors?.name}
              onChange={handleTyping}
              // fullWidth
              sx={{ width: "50%" }}
            />
          }
          sx={{
            display: "flex",
            justifyContent: "start",
            width: "75%",
            margin: "0px",
            gap: "10%",
          }}
        />

        <FormControlLabel
          labelPlacement="start"
          label="Published"
          control={
            <label className="switch">
              <input
                type="checkbox"
                id="togBtn"
                onChange={handleTyping}
                name="Published"
                value={formValues["Published"] || ""}
              />
              <div className="slider round">
                <span className="on">Yes</span>
                <span className="off">No</span>
              </div>
            </label>
          }
          sx={{
            display: "flex",
            justifyContent: "start",
            width: "75%",
            margin: "0px",
            gap: "14%",
          }}
        />
        <Stack
          spacing={2}
          direction="row"
          sx={{ justifyContent: "space-between" }}
        >
          <CancelButton />
          <SaveButton />
        </Stack>
        <button type="submit">Submit</button>
        <style jsx>{`
          .form {
            display: grid;
            gap: 10%;
          }
          .switch {
            position: relative;
            display: inline-block;
            width: 90px;
            height: 34px;
          }

          .switch input {
            display: none;
          }

          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ca2222;
            -webkit-transition: 0.4s;
            transition: 0.4s;
          }

          .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            -webkit-transition: 0.4s;
            transition: 0.4s;
          }

          input:checked + .slider {
            background-color: #2ab934;
          }

          input:focus + .slider {
            box-shadow: 0 0 1px #2196f3;
          }

          input:checked + .slider:before {
            -webkit-transform: translateX(55px);
            -ms-transform: translateX(55px);
            transform: translateX(55px);
          }

          /*------ ADDED CSS ---------*/
          .on {
            display: none;
          }

          .on,
          .off {
            color: white;
            position: absolute;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
            font-size: 10px;
            font-family: Verdana, sans-serif;
          }

          input:checked + .slider .on {
            display: block;
            padding-right: 30px;
          }

          input:checked + .slider .off {
            display: none;
          }

          /*--------- END --------*/

          /* Rounded sliders */
          .slider.round {
            border-radius: 34px;
          }

          .slider.round:before {
            border-radius: 50%;
          }
        `}</style>
      </Form>
      {errors && console.log(errors?.name, errors?.value)}
    </>
  );
};

export default AddCouponForm;
