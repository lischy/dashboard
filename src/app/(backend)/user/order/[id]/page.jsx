import React from "react";
import Invoice from "@/app/components/backend/user/invoice";
import Typography from "@mui/material/Typography";
import { fetchInvoiceItems } from "@/app/lib/data";

// import dynamic from "next/dynamic";

// const DynamicInvoice = dynamic(
//   () => import("@/app/components/backend/user/invoice"),
//   {
//     ssr: false,
//   }
// );

const page = async ({ params }) => {
  const { id } = await params;
  console.log(id);

  const response = await fetchInvoiceItems({
    invoice_id: id,
  });

  const invoice = response?.data;
  if (response.status != 200) {
    return <Typography>Provide valid invoice number</Typography>;
  }
  return <Invoice invoiceData={invoice} />;
};

export default page;
