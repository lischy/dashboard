import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Form from "next/form";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { createRoot } from "react-dom/client";
import { fetchCategoryById } from "@/app/lib/data";
import {
  CancelButton,
  AddButton,
  UploadButton,
} from "@/app/components/backend/dashboardCategories/buttons";
import {
  deleteCategoryFile,
  addProductCategory,
  updateProductCategory,
  uploadFile,
} from "@/app/lib/actions";
import { z } from "zod";

const categorySchema = [
  {
    label: "name",
    placeholder: "category title",
  },
  {
    label: "description",
    placeholder: "category description",
  },
];

const ZodCategorySchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name must not be less than one char",
  }),
  description: z.string().trim().min(1, {
    message: "Value can't be less than one char",
  }),
  published: z.boolean(),
});

const CategoryDrawer = ({ open, toggleDrawer, categoryId, action }) => {
  const [formValues, setFormValues] = useState(null);
  const [blobSrc, setBlobSrc] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState(null);

  console.log(categoryId);

  // useMemo(fetchCategoryById, [categoryId]);
  useEffect(() => {
    if (categoryId === undefined) return;

    console.log("called useEffect");
    if (isSubmitting) return;
    try {
      const resposnse = async () => {
        setIsSubmitting(true);
        const response = await fetchCategoryById({ category_Id: categoryId });
        if (response.status !== 200) {
          setIsSubmitting(false);
          throw new Error("Can not fetch category.");
        }
        console.log(response.data);
        setFormValues(response.data);
      };

      resposnse();
    } catch (error) {
      console.error("Database connection error:", error.stack || error.message);
      return error.stack || error.message;
    } finally {
      setIsSubmitting(false);
    }
  }, [categoryId]);

  const handleTyping = (event) => {
    console.log("called handleTyping");

    const { name, value, checked } = event.target;
    console.log(name, value, checked);
    setFormValues((prev) => {
      return {
        ...prev,
        [name]: name === "published" ? checked : value,
      };
    });
  };
  const handleCancelIconClick = (src, modifiedFileName) => {
    console.log("called handleCancelIconClick");

    console.log(encodeURIComponent(src), modifiedFileName);
    // Revoke the object URL to free resources
    URL.revokeObjectURL(src);
    const container = document.getElementById("container");
    const preview = Array.from(container.getElementsByTagName("div")).find(
      (div) =>
        div.querySelector("img").src === src ||
        div
          .querySelector("img")
          .src.includes(encodeURIComponent(modifiedFileName))
    );

    if (preview) {
      container.removeChild(preview);
    }
    // deleteFile(file.name);
    deleteCategoryFile(modifiedFileName, formValues?.category_id);
    setBlobSrc(null);
  };
  const handleChange = async (event) => {
    console.log("called handleChange");

    const container = document.getElementById("container");
    if (!formValues?.category_image !== undefined) {
      container.innerHTML = ""; // clear container content
    }
    Array.from(event.target.files).map((file, index) => {
      console.log(file);
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
        setBlobSrc(binaryStrfileURL);

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

        const img = document.createElement("img");
        img.src = fileURL;
        img.width = 180;
        img.style.pointerEvents = "none";

        const div = document.createElement("div");
        div.style.position = "relative";
        div.className = "draggable";

        div.appendChild(img);
        div.appendChild(iconButtonContainer);

        container.appendChild(div);
      };

      reader.readAsArrayBuffer(file);
    });

    // Reset the file input field (important for allowing new file selection)
    event.target.value = null;
  };
  const handleSubmit = (formData) => {
    try {
      const category = {
        name: formData.get("name"),
        description: formData.get("description"),
        published: Boolean(formData.get("published")),
      };

      const validate = ZodCategorySchema.safeParse(category);
      if (!validate.success) {
        setErrors(validate.error.flatten().fieldErrors);
        setIsSubmitting(false);
        return;
      }
      setErrors(undefined);
      const category_image = blobSrc?.modifiedFileName
        ? blobSrc?.modifiedFileName
        : "default.jpg";
      console.log(category_image, action);
      switch (action) {
        case "Add": {
          // save to db
          const response = async () => {
            const addProductCategoryResponse = await addProductCategory({
              category: category,
              category_image: category_image,
            });
            console.log(parent, addProductCategoryResponse);
            console.log(
              addProductCategoryResponse.data,
              addProductCategoryResponse.status
            );
            if (response.status === 200) {
              const uploadFileResponse = async () => {
                await uploadFile({
                  file: blobSrc?.file,
                  modifiedFileName: blobSrc?.modifiedFileName,
                });
              };
              if (!blobSrc) {
                return;
              } else {
                uploadFileResponse();
              }
            }
          };
          response();
          break;
        }
        case "Edit": {
          console.log("called");
          const response = async () => {
            const updateProductCategoryResponse = await updateProductCategory({
              category: category,
              category_image: category_image,
              category_id: categoryId,
            });
            if (updateProductCategoryResponse.status === 200) {
              const uploadFileResponse = async () => {
                await uploadFile({
                  file: blobSrc?.file,
                  modifiedFileName: blobSrc?.modifiedFileName,
                });
              };
              if (!blobSrc) {
                return;
              } else {
                uploadFileResponse();
              }
            }
          };
          response();
          break;
        }
        default: {
          console.log("Empty action received.");
        }
      }
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false); // reset lock
    }
  };
  const form = () => (
    <Box role="presentation" sx={{ width: "auto", p: 2 }}>
      <Grid container spacing={2}>
        <Grid
          container
          size={{ sm: 12 }}
          sx={{ justifyContent: "space-between" }}
        >
          <Grid size={{ sm: 8 }}>
            <Typography>Add Category</Typography>
            <p>Add your Product category and necessary information from here</p>
          </Grid>
          <Grid size={{ sm: 4 }}>
            <IconButton
              sx={{
                position: "absolute",
                right: "0",
                top: "0",
                cursor: "pointer",
                backgroundColor: "#00573f", // Blue background for the button
                color: "#fff", // White icon color
                padding: "10px", // Padding inside the button
                borderRadius: "50%", // Make the button circular
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", // Shadow for the button
                transition: "transform 0.2s",
              }}
            >
              <CancelIcon onClick={toggleDrawer} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid size={{ sm: 12 }} sx={{ mt: 2 }}>
          {/* form container */}
          <div
            style={{
              minHeight: "60vh",
              overflowY: "scroll",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                minHeight: "70vh",
                width: "100%",
              }}
            >
              <Form action={handleSubmit}>
                {categorySchema.map((item, index) => (
                  <Grid container key={index} sx={{ mb: 2 }}>
                    <Grid size={4}>
                      <label>{item.label.toUpperCase()}</label>
                    </Grid>
                    <Grid size={8}>
                      <TextField
                        placeholder={item.placeholder}
                        variant="outlined"
                        fullWidth
                        onChange={handleTyping}
                        name={item.label}
                        value={formValues?.[item.label] || ""}
                        multiline={item.label === "description"}
                        rows={4}
                      />
                    </Grid>
                  </Grid>
                ))}
                <Grid container sx={{ mb: 2 }}>
                  <Grid size={4}>
                    <label>{"Category Image".toUpperCase()}</label>
                  </Grid>
                  <Grid size={8}>
                    <Grid
                      sx={{
                        border: "white",
                        borderStyle: "dashed",
                        padding: "40px",
                      }}
                    >
                      <UploadButton
                        handleChange={handleChange}
                        name="Coupon Banner Image"
                      />
                    </Grid>
                    <Grid
                      size={3}
                      id="container"
                      className="draggable_container"
                      sx={{ mt: 2 }}
                    >
                      {!formValues?.category_image ? (
                        <></>
                      ) : (
                        <Grid
                          className="draggable"
                          sx={{ position: "relative" }}
                        >
                          <IconButton
                            sx={{
                              position: "absolute",
                              right: "0",
                              top: "0",
                              cursor: "pointer",
                              backgroundColor: "#00573f",
                              color: "#fff",
                              padding: "10px",
                              borderRadius: "50%",
                              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                              transition: "transform 0.2s",
                            }}
                          >
                            <CancelIcon
                              onClick={() =>
                                handleCancelIconClick(
                                  `/${formValues?.category_image}`,
                                  formValues?.category_image
                                )
                              }
                            />
                          </IconButton>
                          <img
                            src={
                              !formValues?.category_image
                                ? null
                                : `/${formValues?.category_image}`
                            }
                            style={{ pointerEvents: "none" }}
                          />
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container sx={{ mb: 2 }}>
                  <Grid size={4}>
                    <label>{"Published".toUpperCase()}</label>
                  </Grid>
                  <Grid size={8}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formValues?.published || false}
                            onChange={handleTyping}
                          />
                        }
                        name="published"
                      />
                    </FormGroup>
                  </Grid>
                </Grid>

                <Stack
                  spacing={2}
                  direction="row"
                  sx={{
                    justifyContent: "space-evenly",
                    position: "fixed",
                    bottom: "0px",
                    width: "fill-available",
                    mb: 2,
                  }}
                >
                  <CancelButton handleCancel={toggleDrawer} />
                  <AddButton action={action} />
                </Stack>
              </Form>
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer}
      PaperProps={{
        sx: { width: "65%" },
      }}
    >
      {form()}
    </Drawer>
  );
};

export default CategoryDrawer;
