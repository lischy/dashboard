import React from "react";
import Grid from "@mui/material/Grid2";
import CustomerOrdersTable from "@/app/components/backend/dashboardCustomers/customerOrdersTable";

const page = async ({ params }) => {
  const { client_id } = await params;
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid size={6}>
        <div>Customer Orders</div>
      </Grid>
      <Grid size={12}>
        <CustomerOrdersTable client_id={client_id} />
      </Grid>
    </Grid>
  );
};

export default page;
