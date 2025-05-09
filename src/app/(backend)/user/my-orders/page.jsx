import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import OrdersTable from "@/app/components/backend/user/ordersTable";

const page = () => {
  return (
    <Paper sx={{ pl: 2 }}>
      <Typography>Dashboard</Typography>
      <OrdersTable />
    </Paper>
  );
};

export default page;
