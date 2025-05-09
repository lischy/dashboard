"use client";
import React from "react";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Trash2 } from "lucide-react";
import { useDraftOrderContext } from "@/app/context/draftOrderProvider";
import Coupon from "@/app/components/backend/user/coupon";
import { confirmOrder } from "@/app/lib/actions";

import {
  ConfirmOrderButton,
  ContinueShoppingButton,
} from "@/app/components/backend/user/buttons";
import { redirect } from "next/navigation";
const OrderSummary = () => {
  let Subtotal = 0;
  const { draftOrder, canCheckout, deleteDraftOrder, updateCart } =
    useDraftOrderContext();
  const shipping_cost = !draftOrder?.delivery_option?.pickup_station
    ? 1000
    : JSON.parse(draftOrder?.delivery_option?.pickup_station)?.cost;

  function deepParseJSON(value) {
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        // If parsed is an object or array, recurse further
        return deepParseJSON(parsed);
      } catch {
        return value; // Not a JSON string — return as-is
      }
    } else if (Array.isArray(value)) {
      return value.map(deepParseJSON);
    } else if (value !== null && typeof value === "object") {
      return Object.fromEntries(
        Object.entries(value).map(([key, val]) => [key, deepParseJSON(val)])
      );
    }
    return value; // Primitive (number, boolean, null, etc.)
  }

  return (
    <>
      <Grid sx={{ pb: 3 }}>
        <Typography>Order Summary</Typography>
      </Grid>
      {draftOrder?.cart_items?.map((item) => {
        Subtotal += item.count * item.sale_price;
        return (
          <Grid container key={item.product_name} sx={{ pb: 3 }}>
            <Grid size={4}>
              <img src="/Calabaza-Squash.png" />
            </Grid>
            <Grid size={8}>
              <Typography>{item?.product_name}</Typography>
              <Typography>item sale_price ${item.sale_price}</Typography>
              <Grid
                container
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Grid>
                  <Typography>
                    {parseFloat(item.count * item.sale_price).toFixed(2)}
                  </Typography>
                </Grid>
                <Grid>
                  <Stack
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
                      onClick={() => updateCart(item, "decrement")}
                      variant="text"
                      size="small"
                      sx={{
                        minWidth: "unset",
                      }}
                    >
                      -
                    </Button>
                    <Typography>{item.count}</Typography>
                    <Button
                      onClick={() => updateCart(item, "increment")}
                      variant="text"
                      size="small"
                      sx={{
                        minWidth: "unset",
                      }}
                      disabled={item?.count === item?.stock}
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
        );
      })}
      <Coupon />
      <Grid container sx={{ pb: 3 }}>
        <Grid size={6}>
          <Typography>Subtotal</Typography>
        </Grid>
        <Grid size={6} textAlign={"end"}>
          <Typography>{Subtotal}</Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ pb: 3 }}>
        <Grid size={6}>
          <Typography>Shipping Cost</Typography>
        </Grid>
        <Grid size={6} textAlign={"end"}>
          <Typography>
            {/* {JSON.parse(draftOrder?.delivery_option?.pickup_station)?.cost} */}
            {shipping_cost}
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ pb: 3 }}>
        <Grid size={6}>
          <Typography>Discount</Typography>
        </Grid>
        <Grid size={6} textAlign={"end"}>
          <Typography>0</Typography>
        </Grid>
      </Grid>
      <hr />
      <Grid container sx={{ pb: 3, pt: 3 }}>
        <Grid size={6}>
          <Typography>TOTAL COST</Typography>
        </Grid>
        <Grid size={6} textAlign={"end"}>
          <Typography>
            {Math.round((shipping_cost + Subtotal) * 100) / 100}
          </Typography>
        </Grid>
      </Grid>
      <Grid>
        <ConfirmOrderButton
          onClick={async () => {
            console.log(deepParseJSON(draftOrder));
            const response = await confirmOrder({
              draftItem: deepParseJSON(draftOrder),
              total: Math.round((shipping_cost + Subtotal) * 100) / 100,
            });
            if (response.status !== 200) console.log(response.error);
            console.log(response?.data);
            deleteDraftOrder();
            redirect(`/dashboard/orders/${response?.data[0]?.invoice_id}`);
          }}
          disabled={!canCheckout}
        />
      </Grid>
    </>
  );
};

export default OrderSummary;
