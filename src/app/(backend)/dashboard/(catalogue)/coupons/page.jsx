import React from "react";
import CouponsTable from "@/app/components/backend/dashboardCoupons/couponsTable";
import { CreateCouponButton } from "@/app/components/backend/dashboardCoupons/buttons";
import Grid from "@mui/material/Grid2";

export default function coupons() {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid size={6}>
        <div>coupons</div>
      </Grid>
      <Grid size={6} sx={{ justifyContent: "center" }} container>
        <Grid>
          <CreateCouponButton
            label="Add Coupon"
            href={`/dashboard/coupons/add`}
          />
        </Grid>
      </Grid>
      <Grid size={12}>
        <CouponsTable />
      </Grid>
    </Grid>
  );
}
