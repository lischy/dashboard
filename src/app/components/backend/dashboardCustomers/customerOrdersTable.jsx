import * as React from "react";
import CustomerOrdersTableBody from "@/app/components/backend/dashboardCustomers/customerOrdersTableBody";
import { fetchClientOrders } from "@/app/lib/data";
import Typography from "@mui/material/Typography";

export default async function CustomerOrdersTable({ client_id }) {
  //   console.log(client_id);
  const response = await fetchClientOrders({ client_id: client_id });
  if (response.status !== 200) {
    return;
  }
  console.log(response.data);

  return response?.data?.length > 0 ? (
    <CustomerOrdersTableBody customerOrders={response.data} />
  ) : (
    <Typography>No customer orders</Typography>
  );
}
