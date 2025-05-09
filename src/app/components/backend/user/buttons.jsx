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
import { ChevronRight } from "lucide-react";
import Avatar from "@mui/material/Avatar";
import { Check } from "lucide-react";
import { green } from "@mui/material/colors";
import { SquarePen } from "lucide-react";
import { Plus } from "lucide-react";
import { ZoomIn } from "lucide-react";

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

export const CancelButton = ({ handleCancel }) => {
  return (
    <Tooltip title="Cancel">
      <Button variant="contained" sx={{ width: "45%" }} onClick={handleCancel}>
        Cancel
      </Button>
    </Tooltip>
  );
};
export const SaveButton = ({ label }) => {
  return (
    <Tooltip title="Update product">
      <Button
        variant="contained"
        // sx={{ position: "absolute", right: "2% " }}
        type="submit"
      >
        Save {label}
      </Button>
    </Tooltip>
  );
};

export const EditButton = ({ href }) => {
  return (
    <Tooltip title="Update Profile">
      <Link href={{ pathname: href }}>
        <Button variant="contained">Edit</Button>
      </Link>
    </Tooltip>
  );
};

// export const EditButton = ({ id }) => {
//   return (
//     <Tooltip title="Edit coupon">
//       <Link href={`/dashboard/coupons/${id}/edit`}>
//         <IconButton aria-label="view">
//           <EditNoteIcon />
//         </IconButton>
//       </Link>
//     </Tooltip>
//   );
// };

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

export const ContinueShoppingButton = ({ href }) => {
  return (
    <Tooltip title="Continue Shopping">
      <Link href={href}>
        <Button variant="contained" sx={{ width: "90%" }}>
          Continue Shopping
        </Button>
      </Link>
    </Tooltip>
  );
};

export const ConfirmOrderButton = ({ onClick, disabled }) => {
  return (
    <Tooltip title="Confirm Order">
      <span>
        {/* <Link href={href}> */}
        <Button
          onClick={onClick}
          variant="contained"
          disabled={disabled}
          // sx={{ width: "90%" }}
        >
          Confirm Order
        </Button>
        {/* </Link> */}
      </span>
    </Tooltip>
  );
};

export const ApplyCouponButton = () => {
  return (
    <Tooltip title="Apply Coupon">
      <Button variant="contained">Apply Coupon</Button>
    </Tooltip>
  );
};

export const ChangeButton = ({ href, onClick }) => {
  return (
    <Tooltip title="Change address">
      <Link href={href ? href : ""}>
        <Button
          variant={href ? "text" : "contained"}
          endIcon={href ? <ChevronRight /> : ""}
          onClick={onClick}
        >
          Change address
        </Button>
      </Link>
    </Tooltip>
  );
};

export const DoneChecked = ({ done }) => {
  const color = done ? green[500] : "";
  return (
    <Avatar sx={{ bgcolor: color, width: 24, height: 24 }}>
      <Check />
    </Avatar>
  );
};

export const CreateButton = ({ label, toggleModal }) => {
  return (
    <Tooltip title={label}>
      <IconButton onClick={toggleModal}>
        <Plus />
      </IconButton>
    </Tooltip>
  );
};

export const EditIconButton = ({ label, toggleModal }) => {
  return (
    <Tooltip title={label}>
      <IconButton aria-label={label} onClick={toggleModal}>
        <SquarePen />
      </IconButton>
    </Tooltip>
  );
};

export const ViewButton = ({ invoiceId, href }) => {
  return (
    <Tooltip title="view details">
      <Link href={href ? href : `/dashboard/orders/${invoiceId}`}>
        <IconButton aria-label="view">
          <ZoomIn />
        </IconButton>
      </Link>
    </Tooltip>
  );
};
