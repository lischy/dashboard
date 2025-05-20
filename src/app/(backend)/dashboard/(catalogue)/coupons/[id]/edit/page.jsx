"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import EditCouponForm from "@/app/components/backend/dashboardCoupons/edit-coupon-form";
import Typography from "@mui/material/Typography";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  console.log(params.id);
  return (
    <>
      <Typography variant="h4">Update Coupon.</Typography>
      <Typography>Update coupon info, combinations and extras.</Typography>
      <EditCouponForm />
    </>
  );
};

export default Page;
