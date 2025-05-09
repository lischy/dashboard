import * as React from "react";
import AttributesTableBody from "./attributesTableBody";
import { fetchtAtributes } from "@/app/lib/data";
import Typography from "@mui/material/Typography";

export default async function AttributesTable() {
  const response = await fetchtAtributes();
  if (response.status !== 200) {
    return;
  }

  const attributes = response?.data;

  return attributes.length > 0 ? (
    <AttributesTableBody attributes={attributes} />
  ) : (
    <Typography>No products attributes</Typography>
  );
}
