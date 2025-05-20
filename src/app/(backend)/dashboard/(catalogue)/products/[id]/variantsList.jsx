"use client";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { TableFooter, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Image from "next/image";

const VariantsList = ({ product }) => {
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"small"}
          >
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Combination</TableCell>
                <TableCell>Sku</TableCell>
                <TableCell>Barcode</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Sale Price</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product?.variants.map((row) => {
                return (
                  <TableRow
                    key={row.Id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">
                      <Avatar>
                        <img
                          src={row?.Image ? `/${row.Image}` : null}
                          alt="Picture of the author"
                        />
                      </Avatar>
                    </TableCell>
                    <TableCell>{row.Combination}</TableCell>
                    <TableCell>
                      <Typography>{row?.Sku}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row?.Barcode}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row?.Price}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row?.SalePrice}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row?.Quantity}</Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow></TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={product?.variants?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default VariantsList;
