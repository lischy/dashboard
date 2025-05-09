import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Trash2 } from "lucide-react";
import { SquarePen } from "lucide-react";
import IconLabelButtons from "@/app/components/reusable/IconButtonLable";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";

// export const CreateButton = ({ label, toggleDrawer }) => {
//   return (
//     <Tooltip title={label}>
//       <Button onClick={toggleDrawer}>{label}</Button>
//     </Tooltip>
//   );
// };

export const CreateButton = ({ label, toggleDrawer }) => {
  return (
    <Tooltip title={label}>
      <IconLabelButtons
        Icon={AddIcon}
        variant="contained"
        Label={label || "Add product"}
        start="false"
        handleClick={toggleDrawer}
      />
    </Tooltip>
  );
};

export const CancelButton = ({ handleCancel }) => {
  return (
    <Tooltip title="Cancel">
      <Button variant="contained" onClick={handleCancel}>
        Cancel
      </Button>
    </Tooltip>
  );
};

export const AddButton = ({ action }) => {
  return (
    <Tooltip title={`${action} attribute`}>
      <Button variant="contained" type="submit">
        {`${action} attribute`}
      </Button>
    </Tooltip>
  );
};

export const EditAttributeIconButton = ({ label, toggleDrawer }) => {
  return (
    <Tooltip title="Edit attribute">
      <IconButton aria-label={label} onClick={toggleDrawer}>
        <SquarePen />
      </IconButton>
    </Tooltip>
  );
};
export const ViewButton = ({ parent }) => {
  return (
    <Tooltip title="View  values">
      <Link href={`/dashboard/attributes/${parent}`}>
        <IconButton aria-label="view">
          <RemoveRedEyeOutlinedIcon />
        </IconButton>
      </Link>
    </Tooltip>
  );
};

export const EditIconButton = ({ parent }) => {
  return (
    <Tooltip title="Edit attribute value">
      <Link href={`/dashboard/attributes/${parent}`}>
        <IconButton aria-label="view">
          <SquarePen />
        </IconButton>
      </Link>
    </Tooltip>
  );
};

export const DeleteIconButton = ({ handleDelete }) => {
  return (
    <Tooltip title="Delete value">
      <IconButton
        aria-label="Edit"
        label={"Delete product"}
        onClick={handleDelete}
      >
        <Trash2 />
      </IconButton>
    </Tooltip>
  );
};

export const DeleteButton = () => {
  return (
    <IconLabelButtons Icon={Trash2} variant="outlined" Label="" start="true" />
  );
};

export const EditButton = ({ parent, id }) => {
  return (
    <Tooltip title="edit value">
      <Link href={`/dashboard/attributes/${parent}/edit/${id}`}>
        <IconButton aria-label="view">
          <SquarePen />
        </IconButton>
      </Link>
    </Tooltip>
  );
};
