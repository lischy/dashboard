import * as React from "react";
import CouponsTableBody from "./couponsTableBody";
import { fetchtCoupons } from "@/app/lib/data";
import Typography from "@mui/material/Typography";

export default async function CouponsTable() {
  const response = await fetchtCoupons();
  if (response?.status !== 200) return;
  const coupons = response?.data;

  return coupons ? (
    <CouponsTableBody data={coupons} />
  ) : (
    <Typography>No products attributes</Typography>
  );
}
