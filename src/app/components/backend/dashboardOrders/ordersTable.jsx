import * as React from "react";
import OrdersTableBody from "./ordersTableBody";
import { fetchOrders } from "@/app/lib/data";
import Typography from "@mui/material/Typography";

export default async function OrdersTable() {
  const response = await fetchOrders();
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
