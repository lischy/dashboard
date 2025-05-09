"use client";
import React, { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import Grid from "@mui/material/Grid2";
import ProfileCard from "@/app/components/backend/user/card";
import Stack from "@mui/material/Stack";
import { useRouter, useParams } from "next/navigation";
import {
  CancelButton,
  ChangeButton,
} from "@/app/components/backend/user/buttons";
import { useDraftOrderContext } from "@/app/context/draftOrderProvider";

const AddressChangeRadio = ({ address, selectedAddressId, onChange }) => {
  const handleChange = () => {
    onChange(address.address_id);
  };
  // console.log(selectedAddressId, selectedAddressId == address?.address_id);
  return (
    <Radio
      checked={selectedAddressId === address?.address_id}
      onChange={handleChange}
      value={address?.address_id}
      name="address"
    />
  );
};

const AddressesListCard = ({ addresses }) => {
  const { draftOrder, handleDraftOrderChange } = useDraftOrderContext();

  const router = useRouter();
  const defaultAddress = addresses.find((addr) => addr.default_address);
  const defaultAddressId =
    Object.keys(draftOrder?.delivery_address).length !== 0
      ? JSON.parse(draftOrder?.delivery_address)?.address_id
      : defaultAddress?.address_id;
  const [selectedAddressId, setSelectedAddressId] = useState(defaultAddressId);
  const selectedAddress = addresses.find(
    (addr) => addr.address_id === selectedAddressId
  );
  // console.log(selectedAddressId);
  useEffect(() => {
    setSelectedAddressId(defaultAddressId); // Re-init if address list changes
  }, [defaultAddressId]);

  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      {addresses.map((address) => (
        <Grid key={address?.address_id} size={12} container>
          <Grid size={2}>
            <AddressChangeRadio
              key={address.address_id}
              address={address}
              selectedAddressId={selectedAddressId}
              onChange={setSelectedAddressId}
            />
          </Grid>
          <Grid size={10}>
            <ProfileCard letter={"R"} address={address} />
          </Grid>
        </Grid>
      ))}

      <Stack
        spacing={2}
        direction="row"
        sx={{
          justifyContent: "space-evenly",
          width: "fill-available",
          mb: 2,
        }}
      >
        <CancelButton handleCancel={handleCancel} />
        <ChangeButton
          onClick={() => {
            handleDraftOrderChange({
              target: {
                name: "delivery_address",
                value: JSON.stringify(selectedAddress),
                // checked: true,
                // type: "checkbox", // Optional, in case your handler checks input type
              },
            });
            router.back();
          }}
        />
      </Stack>
    </>
  );
};

export default AddressesListCard;

// export default AddressChangeRadio;
