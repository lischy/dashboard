import * as React from "react";
import OrdersTableBody from "@/app/components/backend/user/ordersTableBody";
import { fetchOrdersByClientId } from "@/app/lib/data";
import Typography from "@mui/material/Typography";

export default async function OrdersTable() {
  const response = await fetchOrdersByClientId({ client_id: 1 });
  if (response.status != 200) {
    return;
  }
  const orders = response.data;
  return orders ? (
    <OrdersTableBody data={orders} />
  ) : (
    <Typography>No orders</Typography>
  );
}
