import React from "react";
import Typography from "@mui/material/Typography";
import { CreateButton, DeleteButton } from "@/app/components/backend/buttons";
import AttributesValuesTable from "@/app/components/backend/dashboardAttributes/attributesValuesTable";

const page = async ({ params }) => {
  const { parent } = await params;
  return (
    <>
      <Typography> Attributes values</Typography>
      <CreateButton
        label="Add attribute value"
        href={`/dashboard/attributes/add`}
      />
      <DeleteButton />
      <AttributesValuesTable parent={parent} />
    </>
  );
};

export default page;
