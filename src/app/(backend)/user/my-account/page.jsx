import React from "react";
import Grid from "@mui/material/Grid2";
import ProfileCard from "@/app/components/backend/user/card";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { fetchClientAddresses, fetchClientById } from "@/app/lib/data";
import AddressesListCard from "@/app/components/backend/user/addressesListCard";
import AddressModalButton from "@/app/components/backend/user/addressModalButton";

// TODO:add ID to the selelcted address

const page = async () => {
  const fetchClientAddressesResponse = await fetchClientAddresses({
    client_id: 1,
  });
  const fetchClientByIdResponse = await fetchClientById({
    client_id: 1,
  });

  if (fetchClientAddressesResponse.status !== 200) {
    console.log(
      fetchClientAddressesResponse.error,
      fetchClientByIdResponse.error
    );
    return;
  }
  const clientAddresses = fetchClientAddressesResponse.data;
  const profileDetails = fetchClientByIdResponse?.data;

  // console.log(clientAddresses);

  // useEffect(() => {
  //   const response = async () => {
  //     const fetchClientAddressesResponse = await fetchClientAddresses({
  //       client_id: 1,
  //     });

  //     if (fetchClientAddressesResponse.status !== 200) {
  //       console.log(fetchClientAddressesResponse.error);
  //       return;
  //     }
  //     // console.log(fetchClientAddressesResponse.data);
  //     setClientAddresses(fetchClientAddressesResponse.data);
  //   };
  //   response();
  // }, []);
  return (
    <Paper>
      <Grid
        container
        size={12}
        spacing={2}
        sx={{ justifyContent: "space-around" }}
      >
        <Grid size={6}>
          <ProfileCard letter={"R"} profileDetails={profileDetails} />
        </Grid>
        <Grid container size={6}>
          <Typography>Address Book</Typography>
          <AddressesListCard addresses={clientAddresses} />
          {/* {clientAddresses?.map((address) => ( */}
          {/* <Grid key={address?.address_id} size={12} container>
              <Grid size={2}>
                {/* <AddressChangeRadio address={address} /> */}
          {/* </Grid> */}
          {/* <Grid size={10}> */}
          {/* <ProfileCard letter={"R"} address={address} /> */}
          {/* </Grid> */}
          {/* </Grid> */}
          {/* ))} */}
          <AddressModalButton action="Add" clientId={1} />
          {/* <Typography>Add address</Typography> */}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default page;
