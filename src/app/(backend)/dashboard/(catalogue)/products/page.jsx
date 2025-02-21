import Typography from "@mui/material/Typography";
import React from "react";
import Box from "@mui/material/Box";
import Search from "@/app/components/reusable/search";
import { CreateButton } from "@/app/components/backend/buttons";
import ProductsTable from "@/app/components/backend/dashboardProducts/productsTable";

const Page = () => {
  return (
    <>
      <Typography> Products</Typography>
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
        <Search placeholder="Search products..." />
        <CreateButton label="Add product" href={`/dashboard/products/add`} />
      </Box>
      <ProductsTable />
    </>
  );
};

export default Page;
