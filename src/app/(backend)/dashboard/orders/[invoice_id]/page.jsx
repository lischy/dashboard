import React from "react";
import Invoice from "@/app/components/backend/dashboardOrders/invoice";
import { Typography } from "@mui/material";
import { fetchInvoiceItems } from "@/app/lib/data";

const page = async ({ params }) => {
  const { invoice_id } = await params;

  const response = await fetchInvoiceItems({
    invoice_id: invoice_id,
  });

  const invoice = response?.data;
  if (response.status != 200) {
    return <Typography>Provide valid invoice number</Typography>;
  }
  // console.log(invoice, "called data data ");
  return (
    <>
      <Typography>Invoice</Typography>
      <Invoice data={invoice} />
    </>
  );
};

export default page;
