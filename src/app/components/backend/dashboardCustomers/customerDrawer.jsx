import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Form from "next/form";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { fetchClientById } from "@/app/lib/data";
import { editClient } from "@/app/lib/actions";
import { useRouter, usePathname } from "next/navigation";

import {
  CancelButton,
  AddButton,
} from "@/app/components/backend/dashboardCustomers/buttons";
import { z } from "zod";

const zodClientSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name must not be less than one char",
  }),
  email: z.string().trim().min(1, {
    message: "Value can't be less than one char",
  }),
  phone: z.string().trim().min(1, {
    message: "Value can't be less than one char",
  }),
});

const clientSchema = [
  {
    label: "name",
    placeholder: "Client name",
  },
  {
    label: "email",
    placeholder: "email address",
  },
  {
    label: "phone",
    placeholder: "phone number",
  },
  {
    label: "address",
    placeholder: "delivery address",
  },
];

const CustomerDrawer = ({ open, toggleDrawer, clientId, action }) => {
  const [formValues, setFormValues] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState(null);

  const pathname = usePathname();

  console.log(clientId);

  useEffect(() => {
    if (clientId === undefined) return;

    console.log("called useEffect");
    if (isSubmitting) return;
    try {
      const resposnse = async () => {
        setIsSubmitting(true);
        const response = await fetchClientById({ client_id: clientId });
        if (response.status !== 200) {
          setIsSubmitting(false);
          throw new Error("Can not fetch category.");
        }
        console.log(response.data);
        setFormValues(response.data);
      };

      resposnse();
    } catch (error) {
      console.error("Database connection error:", error.stack || error.message);
      return error.stack || error.message;
    } finally {
      setIsSubmitting(false);
    }
  }, [clientId]);

  const handleTyping = (event) => {
    console.log("called handleTyping");

    const { name, value, checked } = event.target;
    console.log(name, value, checked);
    setFormValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = (formData) => {
    try {
      const client = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
      };
      const validate = zodClientSchema.safeParse(client);
      if (!validate.success) {
        setErrors(validate.error.flatten().fieldErrors);
        setIsSubmitting(false);
        return;
      }
      setErrors(undefined);
      switch (action) {
        case "Add": {
          // save to db

          // const response = async () => {
          //   const response = await addProductAttribute({
          //     attribute: attribute,
          //   });
          //   console.log(response.data, response.status, attribute);
          //   if (response.status === 200) {
          //     setRefresh(!refresh);
          //   }
          // };
          // response();

          break;
        }
        case "Edit": {
          console.log("called");
          const response = async () => {
            const editClientResponse = await editClient({
              client: client,
              client_id: clientId,
              pathname: pathname,
            });
            const data = editClientResponse?.data;
            console.log(data);
            // setFormValues(data);
          };
          response();
          break;
        }
        default: {
          console.log("Empty action received.");
        }
      }
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false); // reset lock
    }
  };
  const form = () => (
    <Box role="presentation" sx={{ width: "auto" }}>
      <Grid container spacing={2}>
        <Grid
          container
          size={{ sm: 12 }}
          sx={{ justifyContent: "space-between" }}
        >
          <Grid size={{ sm: 8 }}>
            <Typography>{action} client details</Typography>
            <p>{action} client details and necessary information from here</p>
          </Grid>
          <Grid size={{ sm: 4 }}>
            <IconButton
              sx={{
                position: "absolute",
                right: "0",
                top: "0",
                cursor: "pointer",
                backgroundColor: "#00573f", // Blue background for the button
                color: "#fff", // White icon color
                padding: "10px", // Padding inside the button
                borderRadius: "50%", // Make the button circular
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", // Shadow for the button
                transition: "transform 0.2s",
              }}
            >
              <CancelIcon onClick={toggleDrawer} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid size={{ sm: 12 }} sx={{ mt: 2 }}>
          {/* form container */}
          <div
            style={{
              minHeight: "60vh",
              overflowY: "scroll",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                minHeight: "70vh",
                width: "100%",
              }}
            >
              <Form action={handleSubmit}>
                {clientSchema.map((item, index) => (
                  <Grid container key={index} sx={{ mb: 2 }}>
                    <Grid size={4}>
                      <label>{item.label.toUpperCase()}</label>
                    </Grid>
                    <Grid size={8}>
                      <TextField
                        placeholder={item.placeholder}
                        variant="outlined"
                        fullWidth
                        onChange={handleTyping}
                        name={item.label}
                        value={formValues?.[item.label] || ""}
                      />
                    </Grid>
                  </Grid>
                ))}
                <Stack
                  spacing={2}
                  direction="row"
                  sx={{
                    justifyContent: "space-evenly",
                    position: "fixed",
                    bottom: "0px",
                    width: "fill-available",
                    mb: 2,
                  }}
                >
                  <CancelButton handleCancel={toggleDrawer} />
                  <AddButton action={action} />
                </Stack>
              </Form>
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer}
      PaperProps={{
        sx: { width: "65%" },
      }}
    >
      {form()}
    </Drawer>
  );
};

export default CustomerDrawer;
