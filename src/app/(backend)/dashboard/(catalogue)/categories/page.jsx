import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Search from "@/app/components/reusable/search";
import { CreateButton } from "@/app/components/backend/buttons";
import CategoriesTable from "@/app/components/backend/dashboardCategories/categoriesTable";

export default function categories() {
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
        <CreateButton label="Add category" href={`/dashboard/categories/add`} />
      </Box>
      <CategoriesTable />
    </>
  );
}
