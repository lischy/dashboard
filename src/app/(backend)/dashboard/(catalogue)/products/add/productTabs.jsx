"use client";
import React, { useState, useRef } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Form from "next/form";
import EditProductForm from "@/app/components/backend/dashboardProducts/edit-product-form";
import BasicSelect from "@/app/components/backend/dashboardProducts/select";
import {
  CancelButton,
  AddButton,
} from "@/app/components/backend/dashboardProducts/buttons";
import { addProduct, updateProductVariants } from "@/app/lib/actions";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name must not be less than one char",
  }),
  category: z.string().trim().min(1, {
    message: "Value can't be less than one char",
  }),
  // price: z.number().float(),
  price: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number({
      invalid_type_error: "Price must be Number",
    })
  ),
  // salePrice: z.number().float(),
  salePrice: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number({
      invalid_type_error: "Price must be Number",
    })
  ),
  stock: z.number().int(),
  published: z.boolean(),
});

const ProductTabs = () => {
  const [errors, setErrors] = useState(null);
  const [value, setValue] = React.useState(1);
  const [checked, setChecked] = React.useState(true);
  const [variantRows, setVariantRows] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [product, setProduct] = useState(null);
  const params = useParams();
  const router = useRouter();

  const product_id = params.id;
  const formRef = React.useRef(null);
  const childRef = useRef();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSwitchChange = (event) => {
    // console.log(event.target.checked);
    if (value === 2) {
      setValue(1);
    }
    setChecked(event.target.checked);
  };

  const handleClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
      setIsSubmitting(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent actual page reload
    if (isSubmitting) return; // prevent duplicate submits
    try {
      if (value === 2) {
        await updateProductVariants({
          variants: variantRows,
          product_id: product_id,
        });
      } else if (value === 1) {
        console.log("called");

        const productImages = childRef.current.getImageData();
        const formdata = new FormData(event.target); // grab the form that was submitted
        const attribute = {
          name: formdata.get("product_name"),
          product_description: formdata.get("product_description"),
          category: formdata.get("category"),
          price: formdata.get("price"),
          salePrice: formdata.get("sale_price"),
          stock: Number(formdata.get("stock")),
          published: Boolean(formdata.get("published")),
          product_images: [...productImages],
        };

        // Get all fields
        // const entries = Object.fromEntries(formdata.entries());

        const validate = productSchema.safeParse(attribute);
        if (!validate.success) {
          setErrors(validate.error.flatten().fieldErrors);
          setIsSubmitting(false);
          return;
        }
        setErrors(undefined);
        // console.log(attribute, productImages);
        const result = await addProduct({ product: attribute });
        const product = result.data;
        // console.log(product);
        // setProduct(product);

        // console.log("FormData entries:", result.data, attribute);
      }
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setIsSubmitting(false); // reset lock
    }
  };
  const handleCancel = () => {
    router.back();
  };
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Typography>Does this product have variants?</Typography>
        <Switch
          checked={checked}
          onChange={handleSwitchChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Stack>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Basic info" value={1} />
            {checked && <Tab label="Combination" value={2} hidden={checked} />}
          </Tabs>
        </Box>
      </Box>
      <div
        style={{
          minHeight: "50vh",
          overflowY: "scroll",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            minHeight: "70vh",
          }}
        >
          <Form ref={formRef} onSubmit={handleSubmit}>
            <div>
              {value === 1 && <EditProductForm ref={childRef} />}
              {value === 2 && <BasicSelect setVariantRows={setVariantRows} />}
            </div>
            <Stack
              spacing={2}
              direction="row"
              sx={{
                justifyContent: "space-between",
                position: "fixed",
                bottom: "0px",
                width: "100%",
              }}
            >
              <CancelButton handleCancel={handleCancel} />
              <AddButton
                handleProductAdd={handleClick}
                // formAction={clientAction}
              />
            </Stack>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ProductTabs;
