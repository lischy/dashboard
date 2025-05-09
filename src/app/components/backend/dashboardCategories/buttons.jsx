import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { Trash2 } from "lucide-react";
import { ZoomIn } from "lucide-react";
import { SquarePen } from "lucide-react";
export const CreateButton = ({ label, toggleDrawer }) => {
  return (
    <Tooltip title={label}>
      <Button onClick={toggleDrawer}>{label}</Button>
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

export const AddButton = () => {
  return (
    <Tooltip title="Add category">
      <Button
        variant="contained"
        // component="button"
        // type="submit"
      >
        Add category
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
        name="file"
        style={{ display: "none" }}
      />
      <label htmlFor="file-upload">
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CloudUploadIcon fontSize="large" />
          <Typography>Drag your image here</Typography>
          <em>(Only *.jpeg, *.webp and *.png images will be accepted)</em>
        </Stack>
      </label>
    </>
  );
};

export const EditIconButton = ({ label, toggleDrawer }) => {
  return (
    <Tooltip title="edit value">
      <IconButton aria-label={label} onClick={toggleDrawer}>
        <SquarePen />
      </IconButton>
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
