"use client";
import React from "react";
import { CreateButton } from "@/app/components/backend/dashboardCategories/buttons";
import AddcategoryDrawer from "@/app/components/backend/dashboardCategories/addCategory";

export default function AddcategoryDrawerButton() {
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
      <CreateButton label="Add category" toggleDrawer={toggleDrawer} />
      <AddcategoryDrawer open={open} toggleDrawer={toggleDrawer} />
    </>
  );
}
