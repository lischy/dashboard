"use client";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { Upload } from "lucide-react";

const ExportCsvButton = ({ data }) => {
  // Dynamically generate headers from the keys of the first object in the data array
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  const exportToCSV = () => {
    const csvRows = [];

    // Create the header row
    csvRows.push(headers.join(","));

    // Add the data rows
    data.forEach((row) => {
      const values = headers.map((header) => row[header] || ""); // Add empty string if value is undefined
      csvRows.push(values.join(","));
    });

    // Create CSV blob
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.csv";
    link.click();
  };
  return <button onClick={exportToCSV}>Export to CSV</button>;
  //   return (
  //     <Tooltip title="Export to CSV">
  //       <IconButton onClick={exportToCSV}>
  //         <Upload />
  //       </IconButton>
  //     </Tooltip>
  //   );
};

export default ExportCsvButton;
