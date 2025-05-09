"use client";
import React from "react";
import {
  EditCouponIconButton,
  CreateButton,
} from "@/app/components/backend/dashboardCoupons/buttons";
import { useRouter } from "next/navigation";

import CouponDrawer from "@/app/components/backend/dashboardCoupons/couponDrawer";

export default function CouponDrawerButton({ action, couponId, parent }) {
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
    // router.refresh();
  };
  return (
    <>
      {action === "Add" ? (
        <CreateButton
          label={parent ? "Add attribute values" : "Add attribute"}
          toggleDrawer={toggleDrawer}
        />
      ) : (
        <EditCouponIconButton
          label="Edit attribute"
          toggleDrawer={toggleDrawer}
        />
      )}
      {open && (
        <CouponDrawer
          action={action}
          open={open}
          toggleDrawer={toggleDrawer}
          couponId={couponId}
          parent={parent}
        />
      )}
    </>
  );
}
