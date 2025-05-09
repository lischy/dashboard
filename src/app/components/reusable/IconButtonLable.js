import * as React from "react";
import Button from "@mui/material/Button";

export default function IconLabelButtons({
  Icon,
  variant,
  Label,
  start,
  handleClick,
}) {
  return (
    <Button
      variant={variant}
      startIcon={start === "true" && <Icon />}
      endIcon={start === "false" && <Icon />}
      onClick={handleClick}
    >
      {Label}
    </Button>
  );
}
