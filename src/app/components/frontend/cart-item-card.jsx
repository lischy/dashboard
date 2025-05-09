import React from "react";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Trash2 } from "lucide-react";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import { useDraftOrderContext } from "@/app/context/draftOrderProvider";

const CartItemCard = ({ cartItems }) => {
  const { draftOrder, handleDraftOrderChange, updateCart } =
    useDraftOrderContext();

  return (
    <Grid size={12}>
      {cartItems.map((cartItem) => (
        <Grid
          container
          key={cartItem.product_id}
          sx={{ pb: 3 }}
          spacing={3}
          size={12}
        >
          <Grid size={4}>
            <img
              src="/Calabaza-Squash.png"
              style={{ width: "40px", height: "40px" }}
            />
          </Grid>
          <Grid size={8}>
            <Typography>{cartItem?.product_name}</Typography>
            <Typography>{`item price ${cartItem?.sale_price}`}</Typography>
            <Grid
              container
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
              spacing={1}
            >
              <Grid>
                <Typography>{`$ ${(
                  parseFloat(cartItem?.sale_price) * cartItem?.count
                ).toFixed(2)} `}</Typography>
              </Grid>
              <Grid>
                <Stack
                  spacing={0.3}
                  sx={{
                    justifyContent: "space-around",
                    alignItems: "center",
                    border: " 1px solid rgb(209 213 219)",
                    borderRadius: "4px",
                  }}
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  <Button
                    onClick={() => updateCart(cartItem, "decrement")}
                    variant="text"
                    size="small"
                    sx={{
                      minWidth: "unset",
                    }}
                  >
                    -
                  </Button>
                  <Typography>{cartItem.count}</Typography>
                  <Button
                    onClick={() => updateCart(cartItem, "increment")}
                    variant="text"
                    size="small"
                    sx={{
                      minWidth: "unset",
                    }}
                    disabled={cartItem.count === cartItem.stock}
                  >
                    +
                  </Button>
                </Stack>
              </Grid>
              <Grid>
                <Trash2 color="red" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default CartItemCard;
