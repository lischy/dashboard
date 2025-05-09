"use client";
import React from "react";
import {
  CreateButton,
  EditIconButton,
} from "@/app/components/backend/dashboardCustomers/buttons";
import CustomerDrawer from "@/app/components/backend/dashboardCustomers/customerDrawer";

export default function CustomerDrawerButton({ action, clientId }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (event) => {
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
      {action === "add" ? (
        <CreateButton label="Add client" toggleDrawer={toggleDrawer} />
      ) : (
        <EditIconButton label="Edit client" toggleDrawer={toggleDrawer} />
      )}
      {open && (
        <CustomerDrawer
          open={open}
          toggleDrawer={toggleDrawer}
          clientId={clientId}
          action={action}
        />
      )}
    </>
  );
}
