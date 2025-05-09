"use client";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useParams } from "next/navigation";
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
import { uploadFile, deleteFile, updateProduct } from "@/app/lib/actions";
import { z } from "zod";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import Stack from "@mui/material/Stack";
import { createRoot } from "react-dom/client"; // Updated for React 18+
import IconButton from "@mui/material/IconButton";
import { CancelButton, UploadButton, UpdateButton } from "./buttons";
import { fetchProductById } from "@/app/lib/data";

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
  status: z.string(),
  published: z.boolean(),
});

const EditProductForm = forwardRef((props, ref) => {
  const [errors, setErrors] = useState(null);
  // const product = props.product;
  // const [product, setProduct] = useState(null);
  const params = useParams();
  const product_id = params.id;

  // console.log(product);

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
  const [formValues, setFormValues] = React.useState(null);
  const imageButton = false;
  const [blobSrc, setBlobSrc] = React.useState([]);
  const [productImages, setProductImages] = React.useState([]);
  const [defaultImage, setDefaultImage] = useState("");

  useImperativeHandle(ref, () => ({
    getImageData: () => {
      return productImages;
    },
  }));
  // console.log("Product", formValues);

  const updateDefaultImage = () => {
    const container = document.querySelector(".draggable_container");
    const children = Array.from(container.children);
    // console.log(children, blobSrc);
    if (children.length > 0) {
      children?.map((div, index) => {
        const default_image = div.querySelector("p");
        // console.log(default_image);
        if (default_image) {
          div.removeChild(default_image);
        }
        if (index === 0) {
          const imgElement = div.querySelector("img");
          const imgSrc = imgElement ? imgElement.src : null;
          // console.log(imgSrc, imgElement, blobSrc);
          const default_image_name = blobSrc?.find((item) => {
            return item.fileURL === imgSrc;
          })?.modifiedFileName;
          // console.log(default_image_name, blobSrc);
          setDefaultImage(default_image_name);
          const label = document.createElement("p");
          label.innerText = "Default Image";
          div.appendChild(label);
        }
      });
    } else {
      setDefaultImage("");
    }
  };
  React.useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetchProductById({ product_id: product_id });
      if (response.status === 500) {
        return (
          <Typography>Unable to fetch products,check db connection</Typography>
        );
      }
      const product = response?.data[0];
      setFormValues(product);
      console.log("CALLEDEDDEEEE - header ", response.data);
    };
    fetchProduct();
  }, []);
  useEffect(() => {
    let dragStartIndex;
    const clearEvent = new AbortController();
    // const signal = AbortSignal.any([
    //   clearEvent.signal,
    //   AbortSignal.timeout(4000),
    // ]);
    const signal = clearEvent.signal;

    const dragStart = (event) => {
      dragStartIndex = +event.target.getAttribute("data-index");
      // console.log(dragStartIndex, "dragStart");
    };
    const dragOver = (event) => {
      // const container = document.querySelector(".draggable_container");

      // function getHoveredItem(mouseX) {
      //   const items = Array.from(container.children); // Convert NodeList to Array
      //   let closestItem = null;

      //   // Loop through each list item and compare the mouse position
      //   for (let item of items) {
      //     const rect = item.getBoundingClientRect();
      //     // Check if the mouse is over this item, i.e., within the item's bounds along the X-axis
      //     if (mouseX >= rect.left && mouseX <= rect.right) {
      //       closestItem = item;
      //     }
      //   }

      //   return closestItem; // Return the item under the mouse (or null if none)
      // }
      // console.log("draOver");
      event.preventDefault();

      // Get the mouse's X position relative to the list container
      // const mouseX = event.clientX;

      // // Find the index of the list item that the mouse is currently hovering over
      // const hoveredItem = getHoveredItem(mouseX);

      // If a valid hovered item exists, set the droppedIndex (in case of visual feedback or logic)
      // if (hoveredItem) {
      //   const droppedIndex = Array.prototype.indexOf.call(
      //     container.children,
      //     hoveredItem
      //   );
      //   console.log("Hovered Item Index: ", droppedIndex); // You can use this for further logic
      // }
    };
    // const dragEnter = () => {
    //   console.log("draEnter");
    // };
    // const dragLeave = () => {
    //   console.log("draLeave");
    // };
    const dragDrop = (event) => {
      const container = document.querySelector(".draggable_container");
      let droppedIndex;
      // console.log(container.children);
      const draggedElement = event.target;
      const dragStartIndex = Array.prototype.indexOf.call(
        container.children,
        event.target
      );
      const children = Array.from(container.children);
      const mouseX = event.clientX;
      function getHoveredItem(mouseX) {
        const items = Array.from(container.children); // Convert NodeList to Array
        let closestItem = null;

        // Loop through each list item and compare the mouse position
        for (let item of items) {
          const rect = item.getBoundingClientRect();
          // Check if the mouse is over this item, i.e., within the item's bounds along the X-axis
          if (mouseX >= rect.left && mouseX <= rect.right) {
            closestItem = item;
          }
        }

        return closestItem; // Return the item under the mouse (or null if none)
      }
      // Find the index of the element where the dragged element was dropped
      let hoveredItem = getHoveredItem(mouseX);
      if (hoveredItem) {
        droppedIndex = Array.prototype.indexOf.call(
          container.children,
          hoveredItem
        );
        //  return droppedIndex; // You can use this for further logic
      }

      // children.findIndex((child) => {
      //   // Compare the position of each child with the drop position
      //   const rect = child.getBoundingClientRect();
      //   return mouseX < rect.top + rect.height / 2;
      // });
      // console.log(mouseX, newIndex);

      // If newIndex is -1, it means the item was dropped at the very bottom
      // if (newIndex === -1) {
      //   newIndex = children.length - 1;
      // }
      if (droppedIndex !== dragStartIndex) {
        // console.log("called");
        container.insertBefore(draggedElement, children[droppedIndex]);
        // container.insertBefore(draggedElement, children[droppedIndex]?.nextSibling);
      }
      // const imgElement = children[0].querySelector("img");

      // Get the `src` attribute of the <img> element
      // const imgSrc = imgElement ? imgElement.src : null; // Checks if the imgElement exists

      // if (droppedIndex === dragStartIndex) {
      //   console.log(imgSrc);
      // }
      // console.log(
      //   droppedIndex,
      //   children[0],
      //   dragStartIndex,
      //   droppedIndex !== dragStartIndex,
      //   "dragDrop"
      // );
      // console.log("New position for dragged element:", newIndex);
    };

    const dragEnd = (event) => {
      console.log("dragEnd");
      updateDefaultImage();
    };
    const throttle = (func, intervalDelay) => {
      let lastTime = 0;
      // console.log("called immediately");
      return (...args) => {
        const now = new Date().getTime();
        if (now - lastTime < intervalDelay) {
          return;
        }
        lastTime = now;
        func(...args);
      };
    };

    const addDragEventListeners = () => {
      const draggables = document.querySelectorAll(".draggable");
      const container = document.querySelector(".draggable_container");

      container?.addEventListener("dragover", throttle(dragOver, 800), {
        signal,
      });
      container?.addEventListener("drag", throttle(dragDrop, 800), {
        signal,
      });

      draggables.forEach((draggable) => {
        // console.log(draggable);
        draggable.addEventListener("dragstart", throttle(dragStart, 800), {
          signal,
        });
        draggable.addEventListener("dragend", throttle(dragEnd, 800));
        // draggable.addEventListener("dragover", dragOver);
        // draggable.addEventListener("dragEnter", dragEnter);
        // draggable.addEventListener("dragLeave", dragLeave);
      });
    };
    addDragEventListeners();
    updateDefaultImage();
    return () => {
      clearEvent.abort();
    };
  }, [blobSrc]);

  const handleCancelIconClick = (src, modifiedFileName) => {
    console.log(encodeURIComponent(src), modifiedFileName);
    // Revoke the object URL to free resources
    URL.revokeObjectURL(src);
    // Remove the image from the DOM
    // const fileToDelete = blobSrc.find((item) => item.fileURL == src);
    // console.log(fileToDelete);
    // const modifiedFileName = fileToDelete.modifiedFileName;
    // console.log(modifiedFileName);

    const container = document.getElementById("container");
    const preview = Array.from(container.getElementsByTagName("div")).find(
      (div) =>
        div.querySelector("img").src === src ||
        div
          .querySelector("img")
          .src.includes(encodeURIComponent(modifiedFileName))
    );
    // console.log(
    //   Array.from(container.getElementsByTagName("div")).find((div) => {
    //     // console.log(decodeURIComponent(div.querySelector("img").src));
    //     // console.log(
    //     //   div
    //     //     .querySelector("img")
    //     //     .src.includes("1744396191106_51uXJpqms4L._AC_SX679_.jpg")
    //     // );
    //     return (
    //       // decodeURIComponent(div.querySelector("img").src) ==
    //       // "1744396191108_WhatsApp Image 2025-03-02 at 8.37.31 PM.jpeg"
    //       div
    //         .querySelector("img")
    //         .src.includes(
    //           encodeURIComponent(
    //             "1744396191108_WhatsApp Image 2025-03-02 at 8.37.31 PM.jpeg"
    //           )
    //         )
    //     );
    //   })
    // );

    // console.log(
    //   Array.from(container.getElementsByTagName("div")).find((div) =>
    //     div
    //       .querySelector("img")
    //       .src.includes(encodeURIComponent(modifiedFileName))
    //   )
    // );
    if (preview) {
      container.removeChild(preview);
    }
    // deleteFile(file.name);
    deleteFile(modifiedFileName, formValues?.product_id);
    // this will update blobsrc causin useEffect to be called and updateDefaultImage
    setBlobSrc((prev) => prev.filter((item) => item.fileURL !== src));
    setProductImages((existingProductImages) => {
      // console.log(
      //   modifiedFileName,
      //   existingProductImages,
      //   existingProductImages.filter((item) => {
      //     console.log(item);
      //     return item !== modifiedFileName;
      //   })
      // );

      return existingProductImages.filter((item) => item !== modifiedFileName);
    });
    // if (blobSrc.length > 0) {
    //   updateDefaultImage();
    // } else {
    //   console.log("Empty");
    // }

    // console.log(blobSrc);
  };
  const handleChange = async (event) => {
    console.log(typeof event.target.files);
    const container = document.getElementById("container");
    // setBlobSrc([]); // Clear state
    if (!formValues?.product_images?.length > 0) {
      container.innerHTML = ""; // clear container content
    }

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
        // console.log(binaryStrfileURL);
        setBlobSrc((prev) => {
          console.log(prev);
          return [...prev, binaryStrfileURL];
        });
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

        // img.setAttribute("data-index", index);
        // img.draggable = true;
        // img.className = "draggable";
        const div = document.createElement("div");
        div.style.position = "relative";
        div.setAttribute("data-index", index);
        div.draggable = true;
        div.className = "draggable";
        // div.style.margin = "50px";
        // div.appendChild(button);
        // div.className = "draggable_container";
        div.appendChild(img);
        div.appendChild(iconButtonContainer);
        if (index === 0) {
          const label = document.createElement("p");
          label.innerText = "Default Image";
          label.classList = "default_image";
          div.appendChild(label);
          setDefaultImage(modifiedFileName);
        }

        container.appendChild(div);

        // console.log(binaryStr, fileURL);
      };

      reader.readAsArrayBuffer(file);
    });

    // Reset the file input field (important for allowing new file selection)
    event.target.value = null;

    // console.log(event.target.files.length);
    // console.log(URL.createObjectURL(event.target.files[0]));
    // const response = await uploadFile({ file: event.target.files });
    // console.log(response);

    if (imageButton && event.target?.files[0]) {
      console.log(URL.createObjectURL(event.target.files[0]));
    }
  };
  const handleUpload = () => {
    // console.log(blobSrc);
    blobSrc.map(async (item) => {
      const response = await uploadFile({
        file: item.file,
        modifiedFileName: item.modifiedFileName,
      });
      // console.log(response.status == 200, response.status === 200);
      if (response.status == 200) {
        //remoe items to aoid mulltiple clickin o upload utton
        setBlobSrc((prev) =>
          prev.filter((prevItem) => prevItem.file.name !== item.file.name)
        );

        // store the imae names for upade to serer on product sae.
        setProductImages((existingProductImages) => [
          ...existingProductImages,
          item.modifiedFileName,
        ]);
      }
    });
  };
  const handleUploadCancel = () => {
    // console.log("Callin....callliin.....");
    const container = document.getElementById("container");
    container.innerHTML = ""; // Clear DOM
    setBlobSrc([]); // Clear state
    setProductImages([]);
  };

  const handleTyping = (event) => {
    const { name, value, checked } = event.target;
    // console.log(name, value, checked);
    setFormValues((prev) => {
      return {
        ...prev,
        [name]: name === "published" ? checked : value,
      };
    });
  };

  const clientAction = async (formdata) => {
    //client side validation parseFloat

    const attribute = {
      name: formdata.get("product_name"),
      category: formdata.get("category"),
      price: formdata.get("price"),
      salePrice: formdata.get("sale_price"),
      stock: Number(formdata.get("stock")),
      status: formdata.get("status"),
      published: Boolean(formdata.get("published")),
      product_images: [...productImages],
      // product_images: blobSrc.map((item, index) => {
      //   console.log(item.modifiedFileName);
      //   return item.modifiedFileName;
      // }),
    };
    const validate = productSchema.safeParse(attribute);
    if (!validate.success) {
      setErrors(validate.error.flatten().fieldErrors);

      return;
    }
    setErrors(undefined);
    console.log(attribute, productImages);
    const result = await updateProduct(attribute, formValues?.product_id);
    const product = result.data;
    console.log(product);
  };
  const handleClick = () => {
    console.info("You clicked the Chip.", productImages, defaultImage, blobSrc);
  };

  const handleDelete = (value) => {
    // console.info("You clicked the delete icon.", value);
    setFormValues((product) => {
      // console.log(formValues?.category.length);
      return {
        ...product,
        category: product.category.filter((item) => item !== value),
      };
    });
  };
  return (
    <>
      {/* <Form action={clientAction}> */}
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
        value={formValues?.category || []}
        // input={<OutlinedInput label="Category" />}
        // renderValue={(selected) => selected.join(", ")}
        renderValue={(selected) => {
          // console.log(selected.length);
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
            <Checkbox checked={formValues?.category?.includes(name)} />
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
        <Grid size={8} container id="container" className="draggable_container">
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
          {formValues?.product_images?.map((product_image) => {
            return (
              <Grid
                size={2}
                key={product_image}
                className="draggable"
                width="180"
                draggable="true"
                sx={{ position: "relative" }}
              >
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
                  <CancelIcon
                    onClick={() =>
                      handleCancelIconClick(`/${product_image}`, product_image)
                    }
                  />
                </IconButton>
                <img
                  src={`/${product_image}`}
                  style={{ pointerEvents: "none" }}
                />
              </Grid>
            );
          })}
        </Grid>
        {/* <Grid container size={12}>
            {product?.product_images?.map((product_image) => {
              return (
                <Grid size={2} key={product_image}>
                  <img src={`/${product_image}`} />
                </Grid>
              );
            })}
          </Grid> */}
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
      {/* <Button onClick={handleClick}>Test</Button> */}
      {/* <Stack
        spacing={2}
        direction="row"
        sx={{ justifyContent: "space-between" }}
      >
        <CancelButton />
        <UpdateButton />
      </Stack> */}
      {/* <button type="submit">Submit</button> */}
      {/* </Form> */}
      {errors && console.log(errors)}
    </>
  );
});

export default EditProductForm;
