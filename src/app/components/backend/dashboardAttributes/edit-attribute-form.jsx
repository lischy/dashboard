"use client";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Form from "next/form";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { editProductAttributeValue } from "@/app/lib/actions";
import { useRouterRefreshContext } from "@/app/context/routerRefresh";

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

const EditAttributeForm = ({ attributeValue, attributeId }) => {
  // const [checked, setChecked] = useState(true);

  const [errors, setErrors] = useState(null);
  const { refresh, setRefresh } = useRouterRefreshContext();

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
        [name]: name === "published" ? checked : value,
      };
      // return { ...prev, [name]: value };
    });

    // console.log(formValues);
  };

  const clientAction = async (formdata) => {
    //client side validation

    const attribute = {
      name: formdata.get("display_name"),
      value: formdata.get("value"),
      published: Boolean(formdata.get("published")),
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
    const response = async () => {
      const response = await editProductAttributeValue({
        attribute_id: attributeId,
        attribute_value: formValues,
      });
      if (response.status === 200) {
        setRefresh(!refresh);
        setErrors(undefined);
      }
    };

    response();
  };
  return (
    <>
      <Form action={clientAction}>
        <TextField
          error={errors?.value ? true : false}
          id="outlined-basic"
          label="Attribute name"
          variant="outlined"
          name="value"
          value={formValues["value"] || ""}
          helperText={errors?.value}
          onChange={handleTyping}
          sx={{ mb: 2, mt: 2 }}
        />
        <TextField
          error={errors?.name ? true : false}
          id="outlined-basic"
          label="Attribute value"
          variant="outlined"
          name="display_name"
          value={formValues["display_name"] || ""}
          helperText={errors?.name}
          onChange={handleTyping}
          sx={{ mb: 2, mt: 2 }}
        />
        <FormGroup sx={{ mb: 2, mt: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={formValues.published}
                onChange={handleTyping}
                // value={formValues.PUBLISHED}
              />
            }
            label="Published"
            name="published"
          />
        </FormGroup>
        <button type="submit" sx={{ mb: 2, mt: 2 }}>
          Submit
        </button>
      </Form>
      {errors && console.log(errors?.name, errors?.value)}
    </>
  );
};

export default EditAttributeForm;
