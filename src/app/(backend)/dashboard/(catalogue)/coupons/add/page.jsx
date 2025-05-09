"use client";
import React from "react";
import Typography from "@mui/material/Typography";
import AddCouponForm from "@/app/components/backend/dashboardCoupons/add-coupon-form";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";

const page = () => {
  return (
    <Grid
      container
      spacing={2}
      rowSpacing={3}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Add Coupon.</Typography>
        <Typography>Add coupon info and extras here.</Typography>
      </Stack>
      <AddCouponForm />
    </Grid>
  );
};

export default page;
