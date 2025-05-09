import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";

const headCells = [
  {
    id: "SR",
    numeric: false,
    disablePadding: true,
    label: "SR",
  },
  {
    id: "Product Name",
    numeric: true,
    disablePadding: false,
    label: "Product Name",
  },
  {
    id: "Quantity",
    numeric: true,
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "Item Price",
    numeric: true,
    disablePadding: false,
    label: "Item Price",
  },
  {
    id: "Amount",
    numeric: true,
    disablePadding: false,
    label: "Amount",
  },
];

const InvoiceTable = ({ invoice_items }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headCells?.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? "right" : "left"}
                padding={headCell.disablePadding ? "none" : "normal"}
              >
                {headCell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {invoice_items.map((row, index) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.unit_price}</TableCell>
              <TableCell align="right">{row.total_price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceTable;
