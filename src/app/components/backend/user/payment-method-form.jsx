"use client";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import FormHelperText from "@mui/material/FormHelperText";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Form from "next/form";
import { z } from "zod";
import { SaveButton } from "./buttons";
import { useDraftOrderContext } from "@/app/context/draftOrderProvider";

const paymentSchema = z.object({
  "Payment Method": z.string().trim().min(1, {
    message: "Payment Method must not be less than one char",
  }),
});

// const updatePaymentOption = (option) => {
//   const draft = JSON.parse(localStorage.getItem("draftOrder")) || {};
//   draft.payment_method = option;
//   localStorage.setItem("draftOrder", JSON.stringify(draft));
// };
const PaymentForm = () => {
  const [errors, setErrors] = useState(null);
  const [helperText, setHelperText] = React.useState(null);

  const { draftOrder, handleDraftOrderChange } = useDraftOrderContext();

  // const [formValues, setFormValues] = React.useState({
  //   "Payment Method": "",
  // });
  // useEffect(() => {
  //   draftOrder.payment_method = formValues?.["Payment Method"];
  //   localStorage.setItem("draftOrder", JSON.stringify(draftOrder));
  // }, [formValues]);
  // const handlePaymentChange = (event) => {
  //   const { name, value } = event.target;
  //   console.log(name, value);
  //   setFormValues((prev) => {
  //     return {
  //       ...prev,
  //       [name]: value,
  //     };
  //   });

  //   setHelperText(" ");
  //   setErrors(false);
  // };

  const clientAction = async (formdata) => {
    //client side validation

    const payment = {
      "Payment Method": formdata.get("payment_method"),
    };
    // console.log(payment);
    const validate = paymentSchema.safeParse(payment);
    if (!validate.success) {
      setHelperText("Please  select an option.");
      setErrors(validate.error.flatten().fieldErrors);
      return;
    }
    // updatePaymentOption(payment);
    setErrors(undefined);
  };
  return (
    <>
      <Form action={clientAction}>
        <FormLabel error={errors}>Payment options</FormLabel>
        <Grid container sx={{ mb: 4 }}>
          <Grid size={4}>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() =>
                handleDraftOrderChange({
                  target: {
                    name: "payment_method",
                    value: "COD",
                    // checked: true,
                    // type: "checkbox", // Optional, in case your handler checks input type
                  },
                })
              }
            >
              <span>
                Cash on delivery
                <Radio
                  name="payment_method"
                  onChange={handleDraftOrderChange}
                  checked={draftOrder?.payment_method == "COD"}
                  value={"COD"}
                />
              </span>
            </Button>
          </Grid>
          <Grid size={4}>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() =>
                handleDraftOrderChange({
                  target: {
                    name: "payment_method",
                    value: "Card",
                    // checked: true,
                    // type: "checkbox", // Optional, in case your handler checks input type
                  },
                })
              }
            >
              <span>
                Credit Card
                <Radio
                  name="payment_method"
                  onChange={handleDraftOrderChange}
                  checked={draftOrder?.payment_method == "Card"}
                  value={"Card"}
                />
              </span>
            </Button>
          </Grid>
          <Grid size={4}>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() =>
                handleDraftOrderChange({
                  target: {
                    name: "payment_method",
                    value: "M-Pesa",
                    // checked: true,
                    // type: "checkbox", // Optional, in case your handler checks input type
                  },
                })
              }
            >
              <span>
                M-Pesa
                <Radio
                  name="payment_method"
                  onChange={handleDraftOrderChange}
                  checked={draftOrder?.payment_method == "M-Pesa"}
                  value={"M-Pesa"}
                />
              </span>
            </Button>
          </Grid>
        </Grid>
        <FormHelperText
          error={errors}
          sx={{ visibility: errors ? "visible" : "hidden", minHeight: "3em" }}
        >
          {helperText || ""}
        </FormHelperText>
        <SaveButton label={"payment method"} />
      </Form>
      {errors && console.log(errors?.name, errors?.value)}
    </>
  );
};

export default PaymentForm;
