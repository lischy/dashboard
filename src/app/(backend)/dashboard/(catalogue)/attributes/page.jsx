import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Search from "@/app/components/reusable/search";
// import { CreateButton } from "@/app/components/backend/buttons";
import AttributesTableBody from "@/app/components/backend/dashboardAttributes/attributesTableBody";
import AttributeDrawerButton from "@/app/components/backend/dashboardAttributes/attributeDrawerButton";

export default function attributes() {
  return (
    <>
      <Typography> Attributes</Typography>
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
        <Search placeholder="Search attributes..." />

        {/* <CreateButton
          label="Add attribute"
          href={`/dashboard/attributes/add`}
        /> */}
        <AttributeDrawerButton action="Add" />
      </Box>
      <AttributesTableBody />
    </>
  );
}
