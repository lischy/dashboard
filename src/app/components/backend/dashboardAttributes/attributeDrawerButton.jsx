"use client";
import React from "react";
import {
  EditAttributeIconButton,
  CreateButton,
} from "@/app/components/backend/dashboardAttributes/buttons";
import { useRouter } from "next/navigation";

import AttributeDrawer from "@/app/components/backend/dashboardAttributes/attributeDrawer";

export default function AttributeDrawerButton({ action, attributeId, parent }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(!open);
    router.refresh();
  };
  return (
    <>
      {action === "Add" ? (
        <CreateButton
          label={parent ? "Add attribute values" : "Add attribute"}
          toggleDrawer={toggleDrawer}
        />
      ) : (
        <EditAttributeIconButton
          label="Edit attribute"
          toggleDrawer={toggleDrawer}
        />
      )}
      {open && (
        <AttributeDrawer
          action={action}
          open={open}
          toggleDrawer={toggleDrawer}
          attributeId={attributeId}
          parent={parent}
        />
      )}
    </>
  );
}
