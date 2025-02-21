import * as React from "react";
import AttributesTableBody from "./attributesTableBody";
import { fetchtAtributes } from "@/app/lib/data";
import Typography from "@mui/material/Typography";

export default async function AttributesTable() {
  const attributes = await fetchtAtributes();

  return attributes ? (
    <AttributesTableBody attributes={attributes} />
  ) : (
    <Typography>No products attributes</Typography>
  );
}
