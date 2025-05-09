import React from "react";
import Grid from "@mui/material/Grid2";
import Search from "@/app/components/reusable/search";
import OrdersTable from "@/app/components/backend/dashboardOrders/ordersTable";

export default function Orders() {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid size={3}>
        <div>Orders</div>
      </Grid>
      <Grid size={8}>
        <Search placeholder="Search orders by email" />
      </Grid>
      <Grid size={12}>
        <OrdersTable label="Orders" />
      </Grid>
    </Grid>
  );
}
