import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid2";
import BasicSelect from "./basicSelect";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Link from "next/link";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProductModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Grid container size={12}>
          <Grid size={4}>
            <img src={`/8.jpg`} alt="image8" />
          </Grid>
          <Grid size={8}>
            <div>
              <Link href={`/product/5`}>Green Cauliflower</Link>
              <div>
                <span>stock: </span>
                <span>7</span>
              </div>
            </div>
            <Typography>
              Most fresh vegetables are low in calories and have a water content
              in excess of 70 percent, with only about 3.5 percent protein and
              less than 1 percent fat. ... The root vegetables include beets,
              carrots, radishes, sweet potatoes, and turnips. Stem vegetables
              include asparagus and kohlrabi.
            </Typography>
            <div>
              <span>$</span>
              <span>94.12</span>
            </div>
            <BasicSelect />
            <div>
              <Typography>color</Typography>
              <Typography>Color buttons</Typography>
            </div>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Stack
                  sx={{
                    justifyContent: "space-around",
                    alignItems: "center",
                    border: " 1px solid rgb(209 213 219)",
                    borderRadius: "4px",
                  }}
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={1}
                >
                  <Button variant="text">-</Button>
                  <Typography>5</Typography>
                  <Button variant="text">+</Button>
                </Stack>
              </Grid>
              <Grid size={6}>
                <Button variant="contained">Add to cart</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ProductModal;
