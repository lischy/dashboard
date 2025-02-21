import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import Button from "@mui/material/Button";

export const ViewButton = ({ id }) => {
  return (
    <Tooltip title="view product">
      <Link href={`/dashboard/products/${id}`}>
        <IconButton aria-label="view">
          <RemoveRedEyeOutlinedIcon />
        </IconButton>
      </Link>
    </Tooltip>
  );
};

export const EditButton = ({ id }) => {
  return (
    <Tooltip title="edit value">
      <Link href={`/dashboard/products/${id}/edit`}>
        <IconButton aria-label="view">
          <EditNoteOutlinedIcon />
        </IconButton>
      </Link>
    </Tooltip>
  );
};

export const CancelButton = () => {
  return (
    <Tooltip title="Cancel">
      <Button variant="contained" sx={{ width: "45%" }}>
        Cancel
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
