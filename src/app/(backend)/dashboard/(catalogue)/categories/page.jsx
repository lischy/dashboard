import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Search from "@/app/components/reusable/search";
import CategoriesTable from "@/app/components/backend/dashboardCategories/categoriesTable";
import CategoryDrawerButton from "@/app/components/backend/dashboardCategories/categoryDrawerButton";
export default function Categories() {
  return (
    <>
      <Typography> Categories</Typography>
      <Box
        sx={{
          width: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          pt: 2,
          pb: 2,
        }}
      >
        <Search placeholder="Search categories..." />
        <CategoryDrawerButton action="add" />
      </Box>
      <CategoriesTable />
    </>
  );
}
