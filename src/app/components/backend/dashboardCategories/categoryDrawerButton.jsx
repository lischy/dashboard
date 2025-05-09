"use client";
import React from "react";
import {
  CreateButton,
  EditIconButton,
} from "@/app/components/backend/dashboardCategories/buttons";
import CategoryDrawer from "@/app/components/backend/dashboardCategories/categoryDrawer";

export default function CategoryDrawerButton({ action, categoryId }) {
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
        <CreateButton label="Add category" toggleDrawer={toggleDrawer} />
      ) : (
        <EditIconButton label="Edit category" toggleDrawer={toggleDrawer} />
      )}
      {open && (
        <CategoryDrawer
          open={open}
          toggleDrawer={toggleDrawer}
          categoryId={categoryId}
        />
      )}
    </>
  );
}
