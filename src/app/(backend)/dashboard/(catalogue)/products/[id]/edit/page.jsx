"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import EditProductForm from "@/app/components/backend/dashboardProducts/edit-product-form";
import Typography from "@mui/material/Typography";

const page = () => {
  const params = useParams();
  const router = useRouter();
  console.log(params.id);
  return (
    <>
      <Typography variant="h4">Update Product.</Typography>
      <Typography>Update products info, combinations and extras.</Typography>
      <EditProductForm />
    </>
  );
};

export default page;
