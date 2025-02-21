import React from "react";
import Grid from "@mui/system/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/system/Stack";
import { EditButton } from "../../../../../components/backend/dashboardProducts/buttons";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <div>Product details</div>
      </Grid>

      <Grid size={4}>
        <div>Product image </div>
      </Grid>
      <Grid size={8}>
        <Typography variant="h3">Premium T-Shirt</Typography>
        <Typography>$450.00</Typography>
        <Stack direction="row" spacing={2}>
          <Typography>in stock</Typography>
          <Typography>QUANTITY: 4972</Typography>
        </Stack>
        <Typography>
          A T-shirt (also spelled tee-shirt or tee shirt), or tee for short, is
          a style of fabric shirt named after the T shape of its body and
          sleeves. Traditionally, it has short sleeves and a round neckline,
          known as a crew neck, which lacks a collar.
        </Typography>
        <Typography>Category: Men</Typography>
        <Stack direction="row" spacing={2}>
          <Typography>premium-shirt</Typography>
          <Typography>t-shirt</Typography>
          <Typography>new-t-shirt</Typography>
        </Stack>
        <EditButton id={id} />
      </Grid>
    </Grid>
  );
};

export default page;
