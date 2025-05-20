import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Grid from "@mui/system/Grid";

const ImageDialog = ({
  onClose,
  open,
  productImages,
  handleCloseProductImageClick,
}) => {
  const handleProductImageClick = (value) => {
    console.log(value);
    handleCloseProductImageClick(value);
  };
  if (productImages?.length === 0) {
    return (
      <Dialog onClose={onClose} open={open}>
        <DialogContent>
          <DialogContentText
            sx={{
              textAlign: "center",
            }}
          >
            Update your product images first to choose from.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle
        sx={{
          textAlign: "center",
        }}
      >
        Set product image
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} justifyContent="center">
          {productImages.map((productImage) => (
            <Grid size={2} key={productImage}>
              <img
                src={`/${productImage}`}
                onClick={() => handleProductImageClick(productImage)}
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
