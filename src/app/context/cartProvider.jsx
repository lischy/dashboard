"use client";
import { createContext, useContext, useMemo, useState } from "react";

const CartThemeContext = createContext(null);

const CartThemeProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [open, setOpen] = useState(false);
  const toggleDrawer = useMemo(
    () => (newOpen) => () => {
      // console.log(newOpen, "called");
      setOpen(newOpen);
    },
    [open]
  );
  const totalItemsInCart = useMemo(
    () =>
      cartItems.reduce((total, item) => {
        return (total = total + item?.count);
      }, 0),
    [cartItems]
  );

  const updateCart = useMemo(
    () => (item, action) => {
      //check item is in cart and update accordinly
      // console.log(
      //   cartItems.includes(item),
      //   cartItems.some((existingItem) => existingItem.ID === item.ID),
      //   totalItemsInCart
      // );

      if (
        cartItems.some(
          (existingItem) => existingItem.product_id === item.product_id
        )
      ) {
        return setCartItems(
          cartItems
            .map((existingItem) => {
              console.log(existingItem, item.product_id);
              return existingItem.product_id === item.product_id
                ? {
                    ...existingItem,
                    count: existingItem.hasOwnProperty("count")
                      ? action === "decrement"
                        ? existingItem.count > 0
                          ? existingItem.count - 1
                          : 0
                        : existingItem.count + 1
                      : 1,
                  }
                : existingItem;
            })
            .filter((item) => item.count > 0) // Remove items with count 0
        );
      } else if (action === "increment") {
        setCartItems((prev) => [
          ...prev,
          {
            ...item,
            count: 1,
          },
        ]);
      }
      // const cartItemsCopy = cartItems.filter((element)=> element !== item)
      // setCartItems(cartItemsCopy)
      //   console.log(item, action);
    },
    [cartItems]
  );

  // console.log(cartItems, totalItemsInCart);

  return (
    <CartThemeContext.Provider
      value={{ cartItems, updateCart, totalItemsInCart, open, toggleDrawer }}
    >
      {props.children}
    </CartThemeContext.Provider>
  );
};

export const useCartThemeContext = () => useContext(CartThemeContext);

export default CartThemeProvider;
