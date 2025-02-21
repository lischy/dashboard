"use client";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Form from "next/form";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { z } from "zod";

const attributeSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name must not be less than one char",
  }),
  value: z.string().trim().min(1, {
    message: "Value can't be less than one char",
  }),
  published: z.boolean(),
});

const EditAttributeForm = ({ attributeValue }) => {
  // const [checked, setChecked] = useState(true);

  const [errors, setErrors] = useState(null);

  const [formValues, setFormValues] = React.useState(attributeValue);

  // const handleChange = (event) => {
  //   console.log(
  //     event.target.checked,
  //     !event.target.checked,
  //     event.target.value
  //   );
  //   setChecked(!event.target.value);
  //   setFormValues;
  // };

  const handleTyping = (event) => {
    const { name, value, checked } = event.target;
    // console.log(name, value, typeof value, checked);
    // setErrors(undefined);
    setFormValues((prev) => {
      // console.log(prev);
      return {
        ...prev,
        [name]: name === "PUBLISHED" ? checked : value,
      };
      // return { ...prev, [name]: value };
    });

    // console.log(formValues);
  };

  const clientAction = async (formdata) => {
    //client side validation

    const attribute = {
      name: formdata.get("DISPLAY NAME"),
      value: formdata.get("VALUE"),
      published: Boolean(formdata.get("PUBLISHED")),
    };
    const validate = attributeSchema.safeParse(attribute);
    if (!validate.success) {
      // handle error
      // console.log(attribute);
      // console.log(validate.error.issues);
      // const errors = validate.error.flatten().fieldErrors;
      // console.log(validate.error.flatten().fieldErrors);
      // console.log(errors);
      setErrors(validate.error.flatten().fieldErrors);
      // setErrors((prev) => {
      //   console.log(prev, "prev");
      //   return {
      //     ...prev,
      //     errors,
      //   };
      // });
      return;
    }
    setErrors(undefined);
    console.log(formValues);
  };
  return (
    <>
      <Form action={clientAction}>
        <TextField
          error={errors?.name ? true : false}
          id="outlined-basic"
          label="Attribute value"
          variant="outlined"
          name="DISPLAY NAME"
          value={formValues["DISPLAY NAME"] || ""}
          helperText={errors?.name}
          onChange={handleTyping}
        />
        <TextField
          error={errors?.value ? true : false}
          id="outlined-basic"
          label="Attribute name"
          variant="outlined"
          name="VALUE"
          value={formValues["VALUE"] || ""}
          helperText={errors?.value}
          onChange={handleTyping}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={formValues.PUBLISHED}
                onChange={handleTyping}
                // value={formValues.PUBLISHED}
              />
            }
            label="Label"
            name="PUBLISHED"
          />
        </FormGroup>
        <button type="submit">Submit</button>
      </Form>
      {errors && console.log(errors?.name, errors?.value)}
    </>
  );
};

export default EditAttributeForm;
