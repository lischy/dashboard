import * as React from "react";
import CategoriesTableBody from "./categoriesTableBody";
import { fetchCategories } from "@/app/lib/data";
import Typography from "@mui/material/Typography";

export default async function CategoriesTable() {
  const categories = await fetchCategories();

  return categories?.data?.length > 0 ? (
    <CategoriesTableBody categories={categories.data} />
  ) : (
    <Typography>No products categories</Typography>
  );
}
