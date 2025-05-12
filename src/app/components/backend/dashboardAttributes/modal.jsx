import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditAttributeForm from "./edit-attribute-form";
import { useState, useEffect } from "react";

import { fetchtAtributeValueById } from "@/app/lib/data";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  open,
  handleClose,
  attributeId,
  valueId,
}) {
  const [attributeValue, setAttributeValue] = useState({});
  const attribute = async () => {
    const response = await fetchtAtributeValueById({ valueId: valueId });
    if (response.status !== 200) return;
    setAttributeValue(response?.data);
  };

  useEffect(() => {
    attribute(attributeId, valueId);
  }, [valueId]);

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Attribute Value
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Edit your attribute value and necessary information from here
        </Typography>
        {attributeValue?.attribute_value_id && (
          <EditAttributeForm
            attributeValue={attributeValue}
            attributeId={attributeId}
          />
        )}
      </Box>
    </Modal>
  );
}
