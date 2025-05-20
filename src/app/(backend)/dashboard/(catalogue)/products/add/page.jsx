"use client";
import React, { useState } from "react";
// import { useRouter, useParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import ProductTabs from "./productTabs";

const Page = () => {
  // const params = useParams();
  // const router = useRouter();
  // console.log(params.id);

  const [value, setValue] = useState(1);
  const [checked, setChecked] = useState(true);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  const handleSwitchChange = (event) => {
    console.log(event.target.checked);
    if (value === 2) {
      setValue(1);
    }
    setChecked(event.target.checked);
  };
  return (
    <>
      <Typography variant="h4">Add Product.</Typography>
      <Typography>Add product info, combinations and extras.</Typography>
      <ProductTabs />
    </>
  );
};

export default Page;
