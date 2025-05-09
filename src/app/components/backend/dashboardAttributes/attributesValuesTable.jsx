import AttributesValuesTableBody from "./attributesValuesTableBody";
import { fetchtAtributeValuesById } from "@/app/lib/data";
import Typography from "@mui/material/Typography";

export default async function AttributesTable({ parent }) {
  const response = await fetchtAtributeValuesById(parent);

  if (response.status !== 200) {
    return;
  }
  const attributesValues = response?.data;

  return attributesValues.length > 0 ? (
    <AttributesValuesTableBody
      attribValues={attributesValues}
      attributeId={parent}
    />
  ) : (
    <Typography>No products attributes values</Typography>
  );
}
