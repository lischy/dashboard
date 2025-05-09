"use client";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import IconLabelButtons from "../../reusable/IconButtonLable";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { SquarePen } from "lucide-react";
import { Trash2 } from "lucide-react";

export const CreateCouponButton = ({ label, href }) => {
  return (
    <Tooltip title={label}>
      <Link href={href}>
        <IconLabelButtons
          Icon={AddIcon}
          variant="contained"
          Label={label || "Add Coupon"}
          start="false"
        />
      </Link>
    </Tooltip>
  );
};
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
export const AddButton = ({ action }) => {
  return (
    <Tooltip title={`${action} coupon`}>
      <Button variant="contained" type="submit">
        {`${action} coupon`}
      </Button>
    </Tooltip>
  );
};
export const UploadButton = ({ handleChange }) => {
  return (
    <>
      <input
        onChange={handleChange}
        accept="image/*,.jpeg,.jpg,.png,.webp"
        sx={{ display: "none" }}
        id="file-upload"
        type="file"
        className="hidden"
      />
      <label htmlFor="file-upload">
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CloudUploadIcon fontSize="large" />
          <Typography>Drag your images here</Typography>
          <em>(Only *.jpeg, *.webp and *.png images will be accepted)</em>
        </Stack>
      </label>
      <style jsx>{`
        hidden: {
          display: none;
        }
      `}</style>
    </>
  );
};

// export const CancelButton = () => {
//   return (
//     <Tooltip title="Cancel">
//       <Button variant="contained" sx={{ width: "45%" }}>
//         Cancel
//       </Button>
//     </Tooltip>
//   );
// };
export const CancelButton = ({ handleCancel }) => {
  return (
    <Tooltip title="Cancel">
      <Button variant="contained" onClick={handleCancel}>
        Cancel
      </Button>
    </Tooltip>
  );
};

export const SaveButton = ({ id }) => {
  return (
    <Tooltip title="Update product">
      <Button variant="contained" sx={{ width: "45%" }} type="submit">
        Save Coupon
      </Button>
    </Tooltip>
  );
};

export const UpdateButton = ({ id }) => {
  return (
    <Tooltip title="Update product">
      <Button variant="contained" sx={{ width: "45%" }}>
        Update product
      </Button>
    </Tooltip>
  );
};

export const EditButton = ({ id }) => {
  return (
    <Tooltip title="Edit coupon">
      <Link href={`/dashboard/coupons/${id}/edit`}>
        <IconButton aria-label="view">
          <EditNoteIcon />
        </IconButton>
      </Link>
    </Tooltip>
  );
};
export const EditCouponIconButton = ({ label, toggleDrawer }) => {
  return (
    <Tooltip title="Edit attribute">
      <IconButton aria-label={label} onClick={toggleDrawer}>
        <SquarePen />
      </IconButton>
    </Tooltip>
  );
};

export const DeleteButton = ({ id }) => {
  return (
    <Tooltip title="view values">
      <Link href={`/dashboard/attributes/${id}`}>
        <IconButton aria-label="view">
          <DeleteIcon />
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
