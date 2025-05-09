import * as React from "react";
import ProductsTableBody from "./productsTableBody";
import { fetchProducts } from "@/app/lib/data";
import Typography from "@mui/material/Typography";

export default async function ProductsTable() {
  const response = await fetchProducts();
  const prods = response?.data;

  return prods ? (
    <ProductsTableBody prods={prods} />
  ) : (
    <Typography>No products</Typography>
  );
}
