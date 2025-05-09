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
  code: z.string().trim().min(1, {
    message: "Value can't be less than one char",
  }),
  published: z.boolean(),
});

const EditCouponForm = () => {
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
    console.log(formdata.get("Campaign Name"));
    //client side validation

    const coupon = {
      name: formdata.get("Campaign Name"),
      code: formdata.get("Campaign Code"),
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
      <form className="form" action={clientAction}>
        <Grid container spacing={2}>
          <Grid size={4}>
            <label>Coupon Banner Image:</label>
          </Grid>
          <Grid
            size={8}
            sx={{ border: "white", borderStyle: "dashed", padding: "40px" }}
          >
            <UploadButton
              handleChange={handleChange}
              name="Coupon Banner Image"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={4}>
            <label>Campaign Name:</label>
          </Grid>
          <Grid size={8}>
            <TextField
              error={errors?.value ? true : false}
              id="outlined-basic"
              variant="outlined"
              name="Campaign Name"
              value={formValues["Campaign Name"] || ""}
              helperText={errors?.value}
              onChange={handleTyping}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={4}>
            <label>Campaign Code:</label>
          </Grid>
          <Grid size={8}>
            <TextField
              error={errors?.name ? true : false}
              id="outlined-basic"
              variant="outlined"
              name="Campaign Code"
              value={formValues["Campaign Code"] || ""}
              helperText={errors?.name}
              onChange={handleTyping}
              fullWidth
              // sx={{ width: "50%" }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={4}>
            <label>Coupon Validity Time:</label>
          </Grid>
          <Grid size={8}>
            <TextField
              error={errors?.value ? true : false}
              id="outlined-basic"
              variant="outlined"
              name="Coupon Validity Time"
              value={formValues["Coupon Validity Time"] || ""}
              helperText={errors?.value}
              onChange={handleTyping}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={4}>
            <label>Discount Type:</label>
          </Grid>
          <Grid size={8}>
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
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={4}>
            <label>Discount:</label>
          </Grid>
          <Grid size={8}>
            <TextField
              error={errors?.value ? true : false}
              id="outlined-basic"
              variant="outlined"
              name="Discount"
              value={formValues["Discount"] || ""}
              helperText={errors?.value}
              onChange={handleTyping}
              fullWidth
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
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={4}>
            <label>Minimum Amount:</label>
          </Grid>
          <Grid size={8}>
            <TextField
              error={errors?.name ? true : false}
              id="outlined-basic"
              variant="outlined"
              name="Minimum Amount"
              value={formValues["Minimum Amount"] || ""}
              helperText={errors?.name}
              onChange={handleTyping}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={4}>
            <label>Published:</label>
          </Grid>
          <Grid size={8}>
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
          </Grid>
        </Grid>

        <Stack
          spacing={2}
          direction="row"
          sx={{ justifyContent: "space-between" }}
        >
          <CancelButton />
          <SaveButton />
        </Stack>
        {/* <button type="submit">Submit</button> */}
        <style jsx>{`
          .form {
            display: grid;
            gap: 10%;
            alignitems: "center";
            width: 90%;
            paddin
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
      </form>
      {errors && console.log(errors?.name, errors?.value, errors)}
    </>
  );
};

export default EditCouponForm;
