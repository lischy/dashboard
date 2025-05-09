import React from "react";
import Grid from "@mui/material/Grid2";
import Search from "@/app/components/reusable/search";

import CustomersTable from "@/app/components/backend/dashboardCustomers/customersTable";

export default function Customers() {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid size={3}>
        <div>Customers</div>
      </Grid>
      <Grid size={8}>
        <Search placeholder="Search customer by email" />
      </Grid>
      <Grid size={12}>
        <CustomersTable />
      </Grid>
    </Grid>
  );
}
