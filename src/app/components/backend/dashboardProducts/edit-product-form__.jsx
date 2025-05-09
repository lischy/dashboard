"use client";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Form from "next/form";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid2";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

import { UploadButton } from "./buttons";
import { uploadFile, deleteFile } from "@/app/lib/actions";

import { z } from "zod";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";

import { createRoot } from "react-dom/client"; // Updated for React 18+
import IconButton from "@mui/material/IconButton";

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

const EditProductForm = ({ product }) => {
  const [errors, setErrors] = useState(null);

  // const [formValues, setFormValues] = React.useState({
  //   id: 2,
  //   "PRODUCT NAME": "cras",
  //   CATEGORY: "Fish & Meat",
  //   price: "$74.54",
  //   "Sale Price": "$386.51",
  //   STOCK: 54,
  //   STATUS: "sold out",
  //   View: "view",
  //   PUBLISHED: false,
  //   ACTIONS: "Edit",
  // });
  const [formValues, setFormValues] = React.useState(product);
  const imageButton = false;
  const [blobSrc, setBlobSrc] = React.useState([]);
  const handleCancelIconClick = (src, modifiedFileName) => {
    console.log(src, blobSrc);
    // Revoke the object URL to free resources
    URL.revokeObjectURL(src);
    // Remove the image from the DOM
    // const fileToDelete = blobSrc.find((item) => item.fileURL == src);
    // console.log(fileToDelete);
    // const modifiedFileName = fileToDelete.modifiedFileName;
    // console.log(modifiedFileName);

    const container = document.getElementById("container");
    const preview = Array.from(container.getElementsByTagName("div")).find(
      (div) => div.querySelector("img").src === src
    );
    if (preview) {
      container.removeChild(preview);
    }
    // deleteFile(file.name);
    deleteFile(modifiedFileName);
    setBlobSrc((prev) => prev.filter((item) => item.fileURL !== src));

    console.log(blobSrc);
  };
  const handleChange = async (event) => {
    console.log(typeof event.target.files);
    const container = document.getElementById("container");
    setBlobSrc([]); // Clear state
    container.innerHTML = ""; // clear container content

    // const fileNames = Array.from(event.target.files).map((file) => file.name);
    // Object.entries(event.target.files).forEach((file)
    Array.from(event.target.files).map((file, index) => {
      const originalFileName = file.name; // Save original filename
      const timestamp = Date.now(); // Get current timestamp to avoid overwriting
      const modifiedFileName = `${timestamp}_${originalFileName}`;

      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        const fileURL = URL.createObjectURL(file);
        const binaryStrfileURL = {
          originalFileName, // Keep the original filename
          modifiedFileName,
          binaryStr,
          fileURL, // Temporary file URL
          file, // The file itself
        };
        console.log(binaryStrfileURL);
        setBlobSrc((prev) => {
          console.log(prev);
          return [...prev, binaryStrfileURL];
        });
        // const preview = document.getElementById("file-preview");
        // preview.setAttribute("src", fileURL);
        // container.innerHTML += `
        // <Grid>
        // <img src="${fileURL}" width="180"/>
        // </Grid>
        // `;

        // Create the null element to hold the button, div is already used so we will encounter error when removin item on dom
        const iconButtonContainer = document.createElement("null");
        iconButtonContainer.style.position = "absolute";
        iconButtonContainer.style.right = "0";
        iconButtonContainer.style.top = "0";
        iconButtonContainer.style.cursor = "pointer";

        // Create an instance of the MUI IconButton component
        const muiIconButton = React.createElement(
          IconButton,
          {
            onClick: () => handleCancelIconClick(fileURL, modifiedFileName),
            style: {
              backgroundColor: "#00573f", // Blue background for the button
              color: "#fff", // White icon color
              padding: "10px", // Padding inside the button
              borderRadius: "50%", // Make the button circular
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", // Shadow for the button
              transition: "transform 0.2s", // Smooth transition effect
            },
          },
          React.createElement(CancelIcon)
        );

        // Use createRoot to render the component into the div element
        const root = createRoot(iconButtonContainer); // Create root for React 18+
        root.render(muiIconButton);

        // const button = document.createElement("button");
        // button.textContent = "X";
        // button.style.position = "absolute";
        // button.style.right = "0";
        // button.style.top = "0";
        // button.style.cursor = "pointer";

        // // Attach an event listener
        // button.addEventListener("click", () => handleCancelIconClick(fileURL));
        const img = document.createElement("img");
        img.src = fileURL;
        img.width = 180;

        const grid = document.createElement("div");
        grid.style.position = "relative";
        // grid.appendChild(button);
        grid.appendChild(img);
        grid.appendChild(iconButtonContainer);

        container.appendChild(grid);
        // container.innerHTML += `
        // <Grid style="position: relative" }}>
        //       <Button
        //         style="position: absolute; right: 0; top: 0; cursor: pointer"
        //         onClick=handleCancelIconClick('${fileURL}')
        //       >X</Button>
        //       <img src="${fileURL}" width="180"/>
        // </Grid>
        // `;

        console.log(binaryStr, fileURL);
      };
      reader.readAsArrayBuffer(file);
    });

    // Reset the file input field (important for allowing new file selection)
    event.target.value = null;

    console.log(event.target.files.length);
    // console.log(URL.createObjectURL(event.target.files[0]));
    // const response = await uploadFile({ file: event.target.files });
    // console.log(response);

    if (imageButton && event.target?.files[0]) {
      console.log(URL.createObjectURL(event.target.files[0]));
    }
  };
  const handleUpload = () => {
    console.log(blobSrc);
    blobSrc.map(async (item) => {
      const response = await uploadFile({
        file: item.file,
        modifiedFileName: item.modifiedFileName,
      });
      console.log(response.status == 200, response.status === 200);
      if (response.status == 200) {
        setBlobSrc((prev) =>
          prev.filter((prevItem) => prevItem.file.name !== item.file.name)
        );
      }
    });
  };
  const handleUploadCancel = () => {
    const container = document.getElementById("container");
    container.innerHTML = ""; // Clear DOM
    setBlobSrc([]); // Clear state
  };

  const handleTyping = (event) => {
    const { name, value, checked } = event.target;
    console.log(name, value, checked);
    setFormValues((prev) => {
      return {
        ...prev,
        [name]: name === "published" ? checked : value,
      };
    });
  };

  const clientAction = async (formdata) => {
    //client side validation

    const attribute = {
      name: formdata.get("product_name"),
      category: formdata.get("category"),
      price: formdata.get("price"),
      salePrice: formdata.get("sale_price"),
      stock: formdata.get("stock"),
      status: formdata.get("status"),
      published: Boolean(formdata.get("published")),
    };
    const validate = productSchema.safeParse(attribute);
    if (!validate.success) {
      setErrors(validate.error.flatten().fieldErrors);

      return;
    }
    setErrors(undefined);
    console.log(formValues);
  };
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = (value) => {
    console.info("You clicked the delete icon.", value);
    setFormValues((product) => {
      console.log(formValues?.category.length);
      return {
        ...product,
        category: product.category.filter((item) => item !== value),
      };
    });
  };
  return (
    <>
      <Form action={clientAction}>
        <TextField
          fullWidth
          error={errors?.name ? true : false}
          id="outlined-basic"
          label="Product name"
          variant="outlined"
          name="product_name"
          value={formValues?.product_name || ""}
          helperText={errors?.name}
          onChange={handleTyping}
          margin="normal"
        />
        <TextField
          fullWidth
          error={errors?.name ? true : false}
          id="outlined-basic"
          label="Product description"
          variant="outlined"
          name="product_description"
          value={formValues?.product_description || ""}
          helperText={errors?.name}
          onChange={handleTyping}
          margin="normal"
          multiline
          maxRows={4}
        />
        <Select
          fullWidth
          displayEmpty
          id="category"
          // label="Category"
          placeholder="Placeholder"
          name="category"
          multiple
          value={formValues?.category || ""}
          // input={<OutlinedInput label="Category" />}
          // renderValue={(selected) => selected.join(", ")}
          renderValue={(selected) => {
            console.log(selected.length);
            if (selected.length === 0) {
              return <em>Select category</em>;
            }
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    // onClick={handleTyping}
                    onDelete={() => handleDelete(value)}
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                  />
                ))}
              </Box>
            );
          }}
          onChange={handleTyping}
        >
          <MenuItem disabled value="">
            <em>Select category</em>
          </MenuItem>
          {[5, 6, 7, "test"].map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={formValues?.category.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>

        {/* <TextField
          fullWidth
          error={errors?.value ? true : false}
          id="outlined-basic"
          label="Category"
          variant="outlined"
          name="category"
          value={formValues?.category || ""}
          helperText={errors?.value}
          onChange={handleTyping}
          margin="normal"
        /> */}
        <TextField
          fullWidth
          error={errors?.value ? true : false}
          id="outlined-basic"
          label="Price"
          variant="outlined"
          name="price"
          value={formValues?.price || ""}
          helperText={errors?.value}
          onChange={handleTyping}
          margin="normal"
        />
        <TextField
          fullWidth
          error={errors?.value ? true : false}
          id="outlined-basic"
          label="Sale price"
          variant="outlined"
          name="sale_price"
          value={formValues?.sale_price || ""}
          helperText={errors?.value}
          onChange={handleTyping}
          margin="normal"
        />
        <TextField
          fullWidth
          error={errors?.value ? true : false}
          id="outlined-basic"
          label="Stock"
          variant="outlined"
          name="stock"
          value={formValues?.stock || ""}
          helperText={errors?.value}
          onChange={handleTyping}
          margin="normal"
        />
        <TextField
          fullWidth
          error={errors?.value ? true : false}
          id="outlined-basic"
          label="Status"
          variant="outlined"
          name="status"
          value={formValues?.status || ""}
          helperText={errors?.value}
          onChange={handleTyping}
          margin="normal"
        />
        <Grid container spacing={2}>
          <Grid size={12}>
            <label>Coupon Banner Image:</label>
          </Grid>
          <Grid size={12} container>
            <Grid
              size={8}
              sx={{ border: "white", borderStyle: "dashed", padding: "40px" }}
            >
              <UploadButton
                handleChange={handleChange}
                name="Coupon Banner Image"
              />
            </Grid>
            <Grid size={8} sx={{ display: "flex", justifyContent: "end" }}>
              <Button onClick={handleUpload} disabled={blobSrc.length === 0}>
                upload
              </Button>
              <Button
                onClick={handleUploadCancel}
                disabled={blobSrc.length === 0}
                label="Cancel"
                sx={{ ml: 4 }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
          <Grid size={8} container id="container">
            {/* <Grid sx={{ position: "relative" }}>
              <CancelIcon
                sx={{
                  position: "absolute",
                  right: "0",
                  top: "0",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleCancelIconClick("/51uXJpqms4L._AC_SX679_.jpg")
                }
              />
              <img src="/51uXJpqms4L._AC_SX679_.jpg" width="180" />
            </Grid> */}
          </Grid>
        </Grid>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={formValues?.published || false}
                onChange={handleTyping}
              />
            }
            label="Published"
            name="published"
          />
        </FormGroup>
        <button type="submit">Submit</button>
      </Form>
      {errors && console.log(errors)}
    </>
  );
};

export default EditProductForm;
