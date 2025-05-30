"use client";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import BasicModal from "@/app/components/backend/dashboardAttributes/modal";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    router.back();

    setOpen(false);
  };
  return (
    <BasicModal
      open={open}
      handleClose={handleClose}
      attributeId={params.parent}
      valueId={params.id}
    />
  );
};

export default Page;
