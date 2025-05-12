import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Stack from "@mui/material/Stack";

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support.`;

export default function SmallCard({ item }) {
  console.log(item);
  return (
    <React.Fragment>
      <Card
        sx={{
          maxWidth: 345,
        }}
        variant="outlined"
      >
        <CardContent>
          <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
            <Stack>
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            </Stack>
            <Stack sx={{ minWidth: 0 }} direction="column">
              <Typography noWrap>
                {`${item?.normalized_status} orders`}
              </Typography>
              {/* <Typography component="div" variant="h5">
                {`${item?.normalized_status} orders`}
              </Typography> */}
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ color: "text.secondary" }}
              >
                {item.total_orders}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
