import React from "react";
// import { useRouter, useParams } from "next/navigation";
import EditProductForm from "@/app/components/backend/dashboardProducts/edit-product-form";
import Typography from "@mui/material/Typography";
import { fetchProductById } from "@/app/lib/data";
import Header from "./header";

const page = () => {
  return (
    <>
      <Typography variant="h4">Update Product.</Typography>
      <Typography>Update products info, combinations and extras.</Typography>
      <Header />
      {/* <EditProductForm  /> */}
    </>
  );
};

export default page;
