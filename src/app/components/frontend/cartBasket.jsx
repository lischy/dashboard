"use client";
import React from "react";
import { useCartThemeContext } from "@/app/context/cartProvider";
import { useDraftOrderContext } from "@/app/context/draftOrderProvider";
import { ToggleCartDrawer } from "@/app/components/frontend/buttons";

const CartBasket = () => {
  const { toggleDrawer } = useCartThemeContext();
  const { totalItemsInCart } = useDraftOrderContext();

  return (
    <ToggleCartDrawer
      toggleDrawer={toggleDrawer}
      totalItemsInCart={totalItemsInCart}
    />
  );
};

export default CartBasket;
