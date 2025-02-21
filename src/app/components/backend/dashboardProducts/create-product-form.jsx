"use client";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Form from "next/form";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { z } from "zod";

const productSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name must not be less than one char",
  }),
  category: z.string().trim().min(1, {
    message: "Value can't be less than one char",
  }),
  price: z.number().int(),
  salePrice: z.number().int(),
  stock: z.number().int(),
  status: z.string(),
  published: z.boolean(),
});

const CreateProductForm = ({ product }) => {
  const [errors, setErrors] = useState(null);

  const [formValues, setFormValues] = React.useState({
    id: 2,
    "PRODUCT NAME": "cras",
    CATEGORY: "Fish & Meat",
    price: "$74.54",
    "Sale Price": "$386.51",
    STOCK: 54,
    STATUS: "sold out",
    View: "view",
    PUBLISHED: false,
    ACTIONS: "Edit",
  });

  const handleTyping = (event) => {
    const { name, value, checked } = event.target;

    setFormValues((prev) => {
      return {
        ...prev,
        [name]: name === "PUBLISHED" ? checked : value,
      };
    });
  };

  const clientAction = async (formdata) => {
    //client side validation

    const attribute = {
      name: formdata.get("PRODUCT NAME"),
      category: formdata.get("CATEGORY"),
      price: formdata.get("price"),
      salePrice: formdata.get("Sale Price"),
      stock: formdata.get("STOCK"),
      status: formdata.get("STATUS"),
      published: Boolean(formdata.get("PUBLISHED")),
    };
    const validate = productSchema.safeParse(attribute);
    if (!validate.success) {
      setErrors(validate.error.flatten().fieldErrors);

      return;
    }
    setErrors(undefined);
    console.log(formValues);
  };
  return (
    <>
      <Form action={clientAction}>
        <TextField
          fullWidth
          error={errors?.name ? true : false}
          id="outlined-basic"
          label="Product Title/Name"
          variant="outlined"
          name="PRODUCT NAME"
          value={formValues["PRODUCT NAME"] || ""}
          helperText={errors?.name}
          onChange={handleTyping}
          margin="normal"
        />
        <TextField
          fullWidth
          error={errors?.value ? true : false}
          id="outlined-basic"
          label="Attribute name"
          variant="outlined"
          name="CATEGORY"
          value={formValues["CATEGORY"] || ""}
          helperText={errors?.value}
          onChange={handleTyping}
          margin="normal"
        />
        <TextField
          fullWidth
          error={errors?.value ? true : false}
          id="outlined-basic"
          label="Attribute name"
          variant="outlined"
          name="price"
          value={formValues["price"] || ""}
          helperText={errors?.value}
          onChange={handleTyping}
          margin="normal"
        />
        <TextField
          fullWidth
          error={errors?.value ? true : false}
          id="outlined-basic"
          label="Attribute name"
          variant="outlined"
          name="Sale Price"
          value={formValues["Sale Price"] || ""}
          helperText={errors?.value}
          onChange={handleTyping}
          margin="normal"
        />
        <TextField
          fullWidth
          error={errors?.value ? true : false}
          id="outlined-basic"
          label="Attribute name"
          variant="outlined"
          name="STOCK"
          value={formValues["STOCK"] || ""}
          helperText={errors?.value}
          onChange={handleTyping}
          margin="normal"
        />
        <TextField
          fullWidth
          error={errors?.value ? true : false}
          id="outlined-basic"
          label="Attribute name"
          variant="outlined"
          name="STATUS"
          value={formValues["STATUS"] || ""}
          helperText={errors?.value}
          onChange={handleTyping}
          margin="normal"
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={formValues.PUBLISHED} onChange={handleTyping} />
            }
            label="Label"
            name="PUBLISHED"
          />
        </FormGroup>
        <button type="submit">Submit</button>
      </Form>
      {errors && console.log(errors)}
    </>
  );
};

export default CreateProductForm;
