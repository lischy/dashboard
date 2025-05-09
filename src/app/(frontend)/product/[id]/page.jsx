import React from "react";
import Product from "../../../components/frontend/product";
import Typography from "@mui/material/Typography";
import { fetchProductById } from "@/app/lib/data";

const page = async ({ params }) => {
  const { id } = await params;
  const response = await fetchProductById({ product_id: id });
  //lo error i there is no products
  if (response.status === 500) {
    return (
      <Typography>Unable to fetch products, check db connection</Typography>
    );
  }
  const product = response?.data[0];
  return (
    <>
      <Product product={product} />
    </>
  );
};

export default page;
