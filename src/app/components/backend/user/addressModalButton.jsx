"use client";
import React, { useState } from "react";
import {
  CreateButton,
  EditIconButton,
} from "@/app/components/backend/user/buttons";
import AddressModal from "@/app/components/backend/user/addressModal";

export default function AddressModalButton({ action, clientId, address }) {
  const [open, setOpen] = useState(false);
  const toggleModal = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(!open);
  };
  return (
    <>
      {action === "Add" ? (
        <CreateButton label="Add address" toggleModal={toggleModal} />
      ) : (
        <EditIconButton label="Edit address" toggleModal={toggleModal} />
      )}
      {open && (
        <AddressModal
          open={open}
          toggleModal={toggleModal}
          clientId={clientId}
          action={action}
          address={address}
        />
      )}
    </>
  );
}
