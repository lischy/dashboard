import React from "react";
import Grid from "@mui/material/Grid2";
import CheckoutAddressForm from "@/app/components/backend/user/checkout-address-form";
import DeliveryForm from "@/app/components/backend/user/delivery-method-form";
import PaymentForm from "@/app/components/backend/user/payment-method-form";
import { ContinueShoppingButton } from "@/app/components/backend/user/buttons";
import OrderSummary from "@/app/components/backend/user/order-summary";

// const draftOrder = {
//   items: [{ productId: "sku_001", name: "T-shirt", quantity: 2, price: 19.99 }],
//   delivery_address: {
//     full_name: "Jane Doe",
//     street: "123 Elm St",
//     city: "Nairobi",
//     zip: "00100",
//     country: "Kenya",
//     phone: "+254700000000",
//   },
//   delivery_option: {
//     type: "Standard",
//     cost: 3.99,
//     eta_days: 3,
//   },
//   payment_method: {
//     type: "M-Pesa",
//     status: "unpaid",
//   },
//   created_at: new Date().toISOString(),
// };

// function getValidDraftOrder() {
//   const raw = localStorage.getItem("draftOrder");
//   if (!raw) return null;

//   const draft = JSON.parse(raw);
//   const createdAt = new Date(draft.created_at);
//   const now = new Date();

//   const hoursSinceCreation = (now - createdAt) / (1000 * 60 * 60);

//   if (hoursSinceCreation > 24) {
//     // Expired — clean up
//     localStorage.removeItem("draftOrder");
//     return null;
//   }

//   return draft;
// }

// function updateDraftActivity() {
//   const raw = localStorage.getItem("draftOrder");
//   if (!raw) return;

//   const draft = JSON.parse(raw);
//   draft.created_at = new Date().toISOString(); // reset timestamp
//   localStorage.setItem("draftOrder", JSON.stringify(draft));
// }

const page = () => {
  // useEffect(() => {
  //   if (typeof window !== "undefined" && window.localStorage) {
  //     // saving to localStorage
  //     localStorage.setItem("draftOrder", JSON.stringify(draftOrder));

  //     // reading from LocalStorage
  //     const savedDraft = localStorage.getItem("draftOrder");
  //     if (savedDraft) {
  //       const draft = JSON.parse(savedDraft);
  //       console.log("Recovered draft order:", draft);
  //     }
  //   }
  // });

  // remove
  // localStorage.removeItem("draftOrder");

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={8} spacing={4}>
          Show only when there is no default address set and when there is
          default address allow to add/edit
          {/* <CheckoutProfileForm /> */}
          <CheckoutAddressForm />
          <DeliveryForm />
          <PaymentForm />
          <Grid container sx={{ mt: 2 }}>
            <Grid size={6}>
              <ContinueShoppingButton href="/" />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={4}>
          <OrderSummary />
          {/* <Grid size={6}>
            <ConfirmOrderButton href="/" />
          </Grid> */}
        </Grid>
      </Grid>
    </>
  );
};

export default page;
