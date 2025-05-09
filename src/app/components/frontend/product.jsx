import React from "react";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import BasicSelect from "./basicSelect";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import ProductCard from "./productCard";
import {
  House,
  DollarSign,
  Repeat,
  ShieldOff,
  Sun,
  MapPin,
} from "lucide-react";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ThumbsSwiper from "@/app/components/frontend/thumbsSwiper";

const Product = async ({ product }) => {
  return (
    <>
      <Grid
        size={12}
        spacing={4}
        // sx={{
        //   // gridTemplateColumns: "auto auto auto",
        //   // display: "grid",
        // }}
        container
      >
        <Grid size={5}>
          <ThumbsSwiper product_images={product?.product_images} />
        </Grid>
        <Grid size={4}>
          <div>
            <Typography>Green Cauliflower</Typography>
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
        <Grid size={3}>
          <Paper sx={{ p: 3 }} square={false}>
            {[
              {
                Icon: LocalShippingIcon,
                Text: "Free shipping applies to all orders over shipping €100",
              },
              {
                Icon: House,
                Text: "Home Delivery within 1 Hour",
              },
              {
                Icon: DollarSign,
                Text: "Cash on Delivery Available",
              },
              {
                Icon: Repeat,
                Text: "7 Days returns money back guarantee",
              },
              {
                Icon: ShieldOff,
                Text: "Warranty not available for this item",
              },
              {
                Icon: Sun,
                Text: "Guaranteed 100% organic from natural products.",
              },
              {
                Icon: MapPin,
                Text: "Delivery from our pick point Boho One, Bridge Street West, Middlesbrough, North Yorkshire, TS2 1AE.",
              },
            ].map((item) => (
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{
                  justifyContent: "start",
                  alignItems: "center",
                  pb: 1,
                  // flexWrap: "wrap",
                }}
                key={item.Text}
              >
                <span>
                  <item.Icon />
                </span>

                {/* <Box sx={{ flex: "0 0 60%" }}> */}
                <Typography>{item.Text}</Typography>
                {/* </Box> */}
              </Stack>
            ))}
          </Paper>
        </Grid>
      </Grid>
      <Typography>Related products</Typography>
      <Grid size={12} container spacing={4}>
        <Grid
          sx={{
            gridTemplateColumns: "auto auto auto auto auto auto",
            display: "grid",
          }}
          container
        >
          {[3, 4, 5, 6, 7, 8, 9].map((item) => (
            <ProductCard key={item} src={`mint.jpg`} product={product} />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Product;
