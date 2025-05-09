import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CheckoutAddressForm from "@/app/components/backend/user/checkout-address-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const AddressModal = ({ open, toggleModal, clientId, action, address }) => {
  return (
    <Modal open={open} onClose={toggleModal}>
      <Box sx={style}>
        <CheckoutAddressForm action={action} address={address} />
      </Box>
    </Modal>
  );
};

export default AddressModal;
