import React from "react";
import Grid from "@mui/system/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/system/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { TableFooter } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Avatar from "@mui/material/Avatar";
import { EditButton } from "@/app/components/backend/dashboardProducts/buttons";
import { fetchProductById } from "@/app/lib/data";
import ThumbsSwiper from "@/app/components/frontend/thumbsSwiper";
import VariantsList from "./variantsList";

const page = async ({ params }) => {
  const { id } = await params;
  const response = await fetchProductById({ product_id: id });
  //lo error i there is no products
  if (response.status === 500) {
    return (
      <Typography>Unable to fetch products, check db connection</Typography>
    );
  }
  const product = response?.data[0];
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <div>Product details</div>
      </Grid>

      <Grid size={4}>
        {product?.product_images?.length > 0 ? (
          <ThumbsSwiper product_images={product?.product_images} />
        ) : (
          // product?.product_images.map((product_image) => {
          //   return <img src={`/${product_image}`} key={product_image} />;
          // })
          <div>Product image </div>
        )}
      </Grid>
      <Grid size={8}>
        <Typography variant="h3">{product?.product_name}</Typography>
        <Typography>$450.00</Typography>
        <Stack direction="row" spacing={2}>
          <Typography>in stock</Typography>
          <Typography>{`QUANTITY: ${product?.stock}`}</Typography>
        </Stack>
        <Typography>
          A T-shirt (also spelled tee-shirt or tee shirt), or tee for short, is
          a style of fabric shirt named after the T shape of its body and
          sleeves. Traditionally, it has short sleeves and a round neckline,
          known as a crew neck, which lacks a collar.
        </Typography>
        <Typography>Category: ${product?.category}</Typography>
        <Stack direction="row" spacing={2}>
          <Typography>premium-shirt</Typography>
          <Typography>t-shirt</Typography>
          <Typography>new-t-shirt</Typography>
        </Stack>
        <EditButton id={product?.product_id} />
      </Grid>
      {product?.variants?.length > 0 ? (
        <Grid size={12}>
          <Typography>Product Variant List</Typography>
          <VariantsList product={product} />
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default page;
