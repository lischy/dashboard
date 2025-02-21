import AttributesValuesTableBody from "./attributesValuesTableBody";
import { fetchtAtributeValuesById } from "@/app/lib/data";
import Typography from "@mui/material/Typography";

export default async function AttributesTable({ parent }) {
  const attributesValues = await fetchtAtributeValuesById(parent);
  return attributesValues ? (
    <AttributesValuesTableBody
      attribValues={attributesValues}
      attributeId={parent}
    />
  ) : (
    <Typography>No products attributes values</Typography>
  );
}
