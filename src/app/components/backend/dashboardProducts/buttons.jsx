import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Stack from "@mui/material/Stack";
import { Trash2 } from "lucide-react";
import { ZoomIn } from "lucide-react";
import { SquarePen } from "lucide-react";

export const AddButton = ({ handleProductAdd }) => {
  return (
    <Tooltip title="Add product">
      <Button
        variant="contained"
        sx={{ width: "45%" }}
        component="button"
        type="submit"
        onClick={handleProductAdd}
        // component="button"
        // type="submit"
      >
        Add product
      </Button>
    </Tooltip>
  );
};
export const ViewButton = ({ id }) => {
  return (
    <Tooltip title="view product">
      <Link href={`/dashboard/products/${id}`}>
        <IconButton aria-label="view">
          <ZoomIn />
        </IconButton>
      </Link>
    </Tooltip>
  );
};

export const EditButton = ({ id }) => {
  return (
    <Tooltip title="edit value">
      <Link href={`/dashboard/products/${id}/edit`}>
        <Button variant="contained" endIcon={<EditNoteOutlinedIcon />}>
          Edit product
        </Button>
        {/* <IconButton aria-label="Edit" label={"Edit product"}>
          <EditNoteOutlinedIcon />
        </IconButton> */}
      </Link>
    </Tooltip>
  );
};
export const EditIconButton = ({ id }) => {
  return (
    <Tooltip title="edit value">
      <Link href={`/dashboard/products/${id}/edit`}>
        <IconButton aria-label="Edit" label={"Edit product"}>
          <SquarePen />
        </IconButton>
      </Link>
    </Tooltip>
  );
};

export const CancelButton = ({ handleCancel }) => {
  return (
    <Tooltip title="Cancel">
      <Button variant="contained" sx={{ width: "45%" }} onClick={handleCancel}>
        Cancel
      </Button>
    </Tooltip>
  );
};

export const UpdateButton = ({ handleProductUpdate }) => {
  return (
    <Tooltip title="Update product">
      <Button
        variant="contained"
        sx={{ width: "45%" }}
        onClick={handleProductUpdate}
        component="button"
        type="submit"
        // formAction={formAction}
      >
        Update product
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
        multiple
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
          <Typography>Drag your images here</Typography>
          <em>(Only *.jpeg, *.webp and *.png images will be accepted)</em>
        </Stack>
      </label>
      {/* <style jsx>{`
        hidden: {
          display: none;
        }
      `}</style> */}
    </>
  );
};

export const DeleteButton = ({ onClick }) => {
  return (
    <Tooltip title="Delete product Variant">
      <IconButton aria-label="Delete Variant" onClick={onClick}>
        <Trash2 />
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
