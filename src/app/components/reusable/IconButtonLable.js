import * as React from 'react';
import Button from '@mui/material/Button';


export default function IconLabelButtons({Icon,variant,Label, start}) {
  return (
      <Button 
      variant={variant} startIcon={start==="true" && <Icon />} endIcon={start==="false" && <Icon />} >
        {Label}
      </Button>
      
  );
}
