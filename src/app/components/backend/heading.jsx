import React from 'react'
import Typography from '@mui/material/Typography';


export default function Heading({title}) {
  return (
    <Typography variant="h4" gutterBottom>
    {title}
  </Typography>
  )
}
