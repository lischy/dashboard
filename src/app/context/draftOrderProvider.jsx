"use client";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";

const DraftOrderContext = createContext(null);

const fieldDependencies = {
  "delivery_option.delivery_method": [
    "delivery_option.Country",
    "delivery_option.City",
    "delivery_option.Region",
    "delivery_option.pickup_station",
  ],
  "delivery_option.Country": [
    "delivery_option.City",
    "delivery_option.Region",
    "delivery_option.pickup_station",
  ],
  "delivery_option.City": [
    "delivery_option.Region",
    "delivery_option.pickup_station",
  ],
  "delivery_option.Region": ["delivery_option.pickup_station"],
};

const DraftOrderProvider = (props) => {
  const [draftOrder, setDraftOrder] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("draftOrder");
      return stored
        ? JSON.parse(stored)
        : {
            cart_items: [],
            delivery_address: {},
            delivery_option: {},
            payment_method: {},
            created_at: new Date().toISOString(),
          };
    }
    return {};
  });

  // Sync to localStorage whenever draftOrder changes
  useEffect(() => {
    // const clearEvent = new AbortController();
    // const handleStorageChange = (e) => {
    //   if (e.key === "draftOrder") {
    //     const newValue = e.newValue ? JSON.parse(e.newValue) : null;
    //     if (newValue) {
    //       setDraftOrder(newValue);
    //     }
    //   }
    // };

    if (typeof window !== "undefined") {
      // console.log("Called due to draftOrder changes", draftOrder);
      localStorage.setItem("draftOrder", JSON.stringify(draftOrder));
    }

    // window.addEventListener("storage", handleStorageChange, {
    //   signal: clearEvent.signal,
    // });
  }, [draftOrder]);

  const totalItemsInCart = useMemo(
    () =>
      draftOrder?.cart_items?.reduce((total, item) => {
        return (total = total + item?.count);
      }, 0),
    [draftOrder.cart_items]
  );

  const updateCart = useCallback((item, action) => {
    setDraftOrder((prev) => {
      const cart_items = prev.cart_items || [];
      const exists = cart_items.some((i) => i.product_id === item.product_id);

      let updatedItems;

      if (exists) {
        updatedItems = cart_items
          .map((existingItem) => {
            if (existingItem.product_id !== item.product_id)
              return existingItem;

            const currentCount = existingItem.count ?? 1;
            const newCount =
              action === "decrement"
                ? Math.max(0, currentCount - 1)
                : currentCount + 1;

            return newCount > 0 ? { ...existingItem, count: newCount } : null; // Mark for removal
          })
          .filter(Boolean); // Remove null cart_items (count = 0)
      } else if (action === "increment") {
        updatedItems = [...cart_items, { ...item, count: 1 }];
      } else {
        updatedItems = cart_items; // No change if trying to decrement a non-existing item
      }

      return {
        ...prev,
        cart_items: updatedItems,
      };
    });
  }, []);

  //   const updateCart = useMemo(
  //     () => (item, action) => {
  //       //check item is in cart and update accordinly
  //       console.log(
  //         draftOrder.cart_items.includes(item),
  //         draftOrder.cart_items.some(
  //           (existingItem) => existingItem.product_id === item.product_id
  //         ),
  //         totalItemsInCart,
  //         draftOrder.cart_items,
  //         item,
  //         action
  //       );

  //       if (
  //         draftOrder.cart_items.some(
  //           (existingItem) => existingItem.product_id === item.product_id
  //         )
  //       ) {
  //         return setDraftOrder(
  //           draftOrder.cart_items
  //             .map((existingItem) => {
  //               console.log(existingItem, item.product_id);
  //               return existingItem.product_id === item.product_id
  //                 ? {
  //                     ...existingItem,
  //                     count: existingItem.hasOwnProperty("count")
  //                       ? action === "decrement"
  //                         ? existingItem.count > 0
  //                           ? existingItem.count - 1
  //                           : 0
  //                         : existingItem.count + 1
  //                       : 1,
  //                   }
  //                 : existingItem;
  //             })
  //             .filter((item) => item.count > 0) // Remove cart_items with count 0
  //         );
  //       } else if (action === "increment") {
  //         setDraftOrder((prev) => [
  //           {...prev},
  //           {
  //             ...item,
  //             count: 1,
  //           },
  //         ]);
  //       }
  //       // const cartItemsCopy = cartItems.filter((element)=> element !== item)
  //       // setCartItems(cartItemsCopy)
  //       //   console.log(item, action);
  //     },
  //     [draftOrder.cart_items]
  //   );

  const addKeyValue = useCallback((key, value) => {
    setDraftOrder((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const updateKeyValue = (key, value) => {
    setDraftOrder((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  //   const handleDraftOrderChange = useCallback((event) => {
  //     const { name, value, checked, type } = event.target;
  //     const finalValue = type === "checkbox" ? checked : value;

  //     setDraftOrder((prev) => ({
  //       ...prev,
  //       [name]: finalValue,
  //     }));
  //   }, []);

  //   const handleDraftOrderChange = useCallback((event) => {
  //     const { name, value, checked, type } = event.target;
  //     const finalValue = type === "checkbox" ? checked : value;

  //     setDraftOrder((prev) => {
  //       const keys = name.split(".");
  //       const updated = { ...prev };

  //       let current = updated;
  //       for (let i = 0; i < keys.length - 1; i++) {
  //         current[keys[i]] = { ...current[keys[i]] };
  //         current = current[keys[i]];
  //       }

  //       current[keys[keys.length - 1]] = finalValue;

  //       return updated;
  //     });
  //   }, []);

  const handleDraftOrderChange = useCallback((event) => {
    const { name, value, checked, type } = event.target;
    const finalValue = type === "checkbox" ? checked : value;
    // console.log(name, checked, type, value.name);
    setDraftOrder((prev) => {
      const keys = name.split(".");
      const updated = { ...prev };

      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]] || typeof current[keys[i]] !== "object") {
          current[keys[i]] = {}; // Create if missing
        } else {
          current[keys[i]] = { ...current[keys[i]] }; // Clone if exists
        }
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = finalValue;
      // If changing country, clear related fields
      //   if (name === "Country" || name === "delivery_option.Country") {
      //     const base = name.startsWith("delivery_option")
      //       ? updated.delivery_option
      //       : updated;

      //     if (base) {
      //       base.City = "";
      //       base.Region = "";
      //       base.pickup_station = "";
      //     }
      //   }

      // Clear dependent fields
      const fieldsToClear = fieldDependencies[name] || [];
      // console.log(fieldsToClear);
      for (const field of fieldsToClear) {
        const path = field.split(".");
        // console.log(path);
        let target = updated;
        // console.log(target);
        for (let i = 0; i < path.length - 1; i++) {
          if (!target[path[i]]) break;
          target = target[path[i]];
          // console.log(target);
        }
        if (target && target.hasOwnProperty(path[path.length - 1])) {
          target[path[path.length - 1]] = "";
        }
      }
      return updated;
    });
  }, []);

  const isCheckoutReady = (order) => {
    return (
      Array.isArray(order.cart_items) &&
      order.cart_items.length > 0 &&
      order.delivery_address &&
      Object.keys(order.delivery_address).length > 0 &&
      order.delivery_option &&
      Object.keys(order.delivery_option).length > 0 &&
      order.payment_method &&
      Object.keys(order.payment_method).length > 0
    );
  };
  const canCheckout = isCheckoutReady(draftOrder);

  const deleteDraftOrder = () => {
    const freshOrder = {
      cart_items: [],
      delivery_address: {},
      delivery_option: {},
      payment_method: {},
      created_at: new Date().toISOString(),
    };
    setDraftOrder(freshOrder);
    localStorage.removeItem("draftOrder");
  };

  // const isCheckoutReady = (order) => {
  //   return (
  //     Array.isArray(order.cart_items) && order.cart_items.length > 0 &&
  //     order.delivery_address?.city &&
  //     order.delivery_option?.delivery_method &&
  //     order.payment_method?.method
  //   );
  // };

  return (
    <DraftOrderContext.Provider
      value={{
        draftOrder,
        totalItemsInCart,
        updateCart,
        handleDraftOrderChange,
        updateKeyValue,
        canCheckout,
        deleteDraftOrder,
      }}
    >
      {props.children}
    </DraftOrderContext.Provider>
  );
};

// export const useDraftOrderContext = () => useContext(DraftOrderContext);
export const useDraftOrderContext = () => {
  const context = useContext(DraftOrderContext);
  if (context === null) {
    throw new Error(
      "useDraftOrderContext must be used inside a <DraftOrderProvider>. Check your _app.js or layout."
    );
  }
  return context;
};

export default DraftOrderProvider;
