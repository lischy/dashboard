import React from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import IconLabelButtons from "../reusable/IconButtonLable";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import Button from "@mui/material/Button";

export const ImportButton = () => {
  return (
    <IconLabelButtons
      Icon={FileUploadOutlinedIcon}
      variant="outlined"
      Label="Export"
      start="true"
    />
  );
};

export const ExportButton = () => {
  return (
    <IconLabelButtons
      Icon={FileDownloadOutlinedIcon}
      variant="outlined"
      Label="Import"
      start="true"
    />
  );
};

export const DeleteButton = () => {
  return (
    <IconLabelButtons
      Icon={DeleteIcon}
      variant="outlined"
      Label="delete"
      start="true"
    />
  );
};

export const CreateButton = ({ label, href }) => {
  return (
    <Tooltip title={label}>
      <Link href={href}>
        <IconLabelButtons
          Icon={AddIcon}
          variant="contained"
          Label={label || "Add product"}
          start="false"
        />
      </Link>
    </Tooltip>
  );
};

export const ViewButton = ({ parent }) => {
  return (
    <Tooltip title="view values">
      <Link href={`/dashboard/attributes/${parent}`}>
        <IconButton aria-label="view">
          <RemoveRedEyeOutlinedIcon />
        </IconButton>
      </Link>
    </Tooltip>
  );
};

export const EditButton = ({ parent, id }) => {
  return (
    <Tooltip title="edit value">
      <Link href={`/dashboard/attributes/${parent}/edit/${id}`}>
        <IconButton aria-label="view">
          <EditNoteOutlinedIcon />
        </IconButton>
      </Link>
    </Tooltip>
  );
};

export const GenerateVariants = ({ handleclick }) => (
  <Tooltip title="Generate variants">
    <Button aria-label="Generate variants" onClick={handleclick}>
      Generate variants
    </Button>
  </Tooltip>
);
