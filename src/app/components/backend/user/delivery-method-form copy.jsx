"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import { z } from "zod";
import { SaveButton } from "./buttons";
import Typography from "@mui/material/Typography";
import PickupModal from "@/app/components/backend/user/pickupModal";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import { useDraftOrderContext } from "@/app/context/draftOrderProvider";

const deliverySchema = z.object({
  method: z.string().trim().min(1, {
    message: "Method must not be less than one char",
  }),
});

const DeliveryForm = () => {
  const [errors, setErrors] = useState(null);
  const [helperText, setHelperText] = React.useState(null);
  const [formValues, setFormValues] = React.useState({
    "Delivery Method": null,
    "Pickup Station": null,
  });
  const { draftOrder, handleDraftOrderChange } = useDraftOrderContext();
  const pickup = JSON.parse(draftOrder?.delivery_option?.pickup_station)?.name;

  console.log(pickup);

  const handleDeliveryChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    if (value === "Door Delivery") {
      setPickup(null);
      setFormValues((prev) => ({
        ...prev,
        "Pickup Station": null,
      }));
    }
    setFormValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    setHelperText(" ");
    setErrors(false);
  };

  const handleTyping = (event) => {
    const { name, value, checked } = event.target;
    console.log(name, value, checked);

    setFormValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const clientAction = async (formdata) => {
    //client side validation

    const delivery = {
      method: formdata.get("delivery_option.delivery_method"),
    };

    console.log(delivery);
    const validate = deliverySchema.safeParse(delivery);
    if (!validate.success) {
      setHelperText("Please  select an option.");

      setErrors(validate.error.flatten().fieldErrors);
      return;
    }
    if (formdata.get("delivery_option.delivery_method") === "Pickup Station") {
      //check if pickup station is set
      if (!pickup) {
        setHelperText("Please  select a pickup station.");
        setErrors((prev) => ({ ...prev, "Pickup Station": "Error" }));
        return;
      }
    }

    setErrors(undefined);
    console.log(formValues);
  };

  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const setPickupStation = (formdata) => {
  //   console.log(formdata);
  //   setFormValues((prev) => ({
  //     ...prev,
  //     "Pickup Station": formdata,
  //   }));
  //   setPickup(formdata);
  //   handleClose();
  // };
  return (
    <>
      <form action={clientAction}>
        <FormLabel error={errors}>Delivery options</FormLabel>
        <Grid
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateRows: "1fr  1fr",
            pl: 0,
            pt: 4,
            pb: 4,
          }}
        >
          <Stack spacing={2} direction="column">
            <FormControlLabel
              value="bottom"
              control={
                <Radio
                  name="delivery_option.delivery_method"
                  onChange={handleDraftOrderChange}
                  checked={
                    draftOrder?.delivery_option?.delivery_method?.name ==
                    "Pickup Station"
                  }
                  value={"Pickup Station"}
                />
              }
              label="Pickup Station (from KSH 340)"
            />
            {!pickup ? (
              <Button
                onClick={handleOpen}
                disabled={
                  draftOrder?.delivery_option?.delivery_method?.name !==
                  "Pickup Station"
                }
              >
                Select pickup station
              </Button>
            ) : (
              <>
                <Typography>{pickup}</Typography>
                <Button onClick={handleOpen}> Change pickup station</Button>
              </>
            )}
            <PickupModal
              open={open}
              handleClose={handleClose}
              // setPickupStation={setPickupStation}
            />
          </Stack>
          <FormControlLabel
            value="bottom"
            control={
              <Radio
                name="delivery_option.delivery_method"
                onChange={handleDraftOrderChange}
                checked={
                  draftOrder?.delivery_option?.delivery_method?.name ==
                  "Door Delivery"
                }
                value={"Door Delivery"}
              />
            }
            label="Door Delivery (from KSH 580)"
          />
        </Grid>
        <FormHelperText
          error={errors}
          sx={{ visibility: errors ? "visible" : "hidden", minHeight: "3em" }}
        >
          {helperText || ""}
        </FormHelperText>
        <SaveButton label={" delivery details"} />
      </form>
      {errors && console.log(errors?.name, errors?.value)}
    </>
  );
};

export default DeliveryForm;
