import * as React from "react";
import CustomersTableBody from "@/app/components/backend/dashboardCustomers/customersTableBody";
import { fetchClients } from "@/app/lib/data";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import ExportJsonButton from "@/app/components/backend/dashboardCustomers/exportJSON";
import ExportCsvButton from "@/app/components/backend/dashboardCustomers/exportCSV";
import Export from "@/app/components/backend/dashboardCustomers/export";
export default async function CustomersTable() {
  const response = await fetchClients();
  if (response.status !== 200) {
    return;
  }
  // console.log(response.data);

  return response?.data?.length > 0 ? (
    <>
      <Export data={response.data} />
      {/* <ExportJsonButton data={response.data} />
          <span>Export to JSON</span> */}
      {/* <Grid>
          <ExportCsvButton data={response.data} />
          <span>Export to CSV</span>
        </Grid> */}
      <CustomersTableBody customers={response.data} />
    </>
  ) : (
    <Typography>No customers</Typography>
  );
}
