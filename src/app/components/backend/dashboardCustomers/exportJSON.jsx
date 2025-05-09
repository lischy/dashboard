"use client";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { Upload } from "lucide-react";

const ExportJsonButton = ({ data }) => {
  const exportToJson = () => {
    // Pretty-print the JSON with an indentation of 2 spaces
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.json";
    link.click();
  };
  return <button onClick={exportToJson}>Export to JSON</button>;

  //   return (
  //     <Tooltip title="Export to JSON">
  //       <IconButton onClick={exportToJson}>
  //         <Upload />
  //       </IconButton>
  //     </Tooltip>
  //   );
};

export default ExportJsonButton;
