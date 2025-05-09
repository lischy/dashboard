import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import { ApplyCouponButton } from "./buttons";

const Coupon = () => {
  return (
    <Grid container sx={{ pb: 3 }}>
      <Grid size={6}>
        <TextField
          id="outlined-basic"
          placeholder="Input your coupon code"
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid size={6} textAlign={"end"}>
        <ApplyCouponButton />
      </Grid>
    </Grid>
  );
};

export default Coupon;
