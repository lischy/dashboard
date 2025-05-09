import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { EditButton } from "./buttons";
import { Typography } from "@mui/material";
import AddressModalButton from "@/app/components/backend/user/addressModalButton";

export default function ProfileCard({ letter, address, profileDetails }) {
  return (
    <>
      {address ? (
        <Card sx={{ width: "100%" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="address">
                {letter}
              </Avatar>
            }
            // action={<EditButton href={"/user/update-profile"} />}
            action={<AddressModalButton action="Edit" address={address} />}
            title={`${address?.first_name} ${address?.last_name}`}
            subheader={
              <>
                <Typography>{address?.email}</Typography>
                <Typography>
                  {`${address?.country} ${address?.city} ${address?.region}`}
                </Typography>
              </>
            }
          />
        </Card>
      ) : (
        <Card sx={{ width: "100%" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="profile">
                {profileDetails?.name?.charAt(0)}
              </Avatar>
            }
            action={<EditButton href={"/user/update-profile"} />}
            title={`${profileDetails?.name}`}
            subheader={`${profileDetails?.phone} ${profileDetails?.email}`}
          />
        </Card>
      )}
    </>
  );
}
