import React from "react";
import Typography from "@mui/material/Typography";
import { CreateButton, DeleteButton } from "@/app/components/backend/buttons";
import AttributesValuesTableBody from "@/app/components/backend/dashboardAttributes/attributesValuesTableBody";
import AttributeDrawerButton from "@/app/components/backend/dashboardAttributes/attributeDrawerButton";
import Grid from "@mui/material/Grid2";

// export const dynamic = "force-dynamic";

const page = async ({ params }) => {
  const { parent } = await params;
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid size={6}>
        <Typography> Attributes values</Typography>
      </Grid>
      <Grid size={6} sx={{ justifyContent: "space-evenly" }} container>
        <Grid>
          <AttributeDrawerButton action="Add" parent={parent} />
        </Grid>
        {/* <Grid>
          <DeleteButton />
        </Grid> */}
      </Grid>
      <Grid size={12}>
        <AttributesValuesTableBody parent={parent} />
      </Grid>
    </Grid>
  );
};

export default page;
