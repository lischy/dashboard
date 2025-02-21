"use client";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { CancelButton, UpdateButton } from "./buttons";
import { TableFooter } from "@mui/material";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "PRODUCT NAME",
  },
  {
    id: "category",
    numeric: true,
    disablePadding: false,
    label: "CATEGORY",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "PRICE",
  },
  {
    id: "sale price",
    numeric: true,
    disablePadding: false,
    label: "Sale Price",
  },
  {
    id: "stock",
    numeric: true,
    disablePadding: false,
    label: "STOCK",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "STATUS",
  },
  {
    id: "view",
    numeric: true,
    disablePadding: false,
    label: "VIEW",
  },
  {
    id: "published",
    numeric: false,
    disablePadding: false,
    label: "PUBLISHED",
  },
  {
    id: "Actiton",
    numeric: true,
    disablePadding: false,
    label: "ACTION",
  },
];

function createData(
  Id,
  Image,
  Combination,
  Sku,
  Barcode,
  Price,
  SalePrice,
  Quantity
) {
  return { Id, Image, Combination, Sku, Barcode, Price, SalePrice, Quantity };
}

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

const VariantsTable = ({ cartesianCombination }) => {
  const [rows, setRows] = React.useState([]);
  React.useMemo(() => {
    setRows(
      cartesianCombination.map((item, id) =>
        createData(id, "", item.join(", "), "", "", "", "", "")
      )
    );
  }, [cartesianCombination]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  console.log(rows, cartesianCombination);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleInpuChange = debounce((event, Id) => {
    const {
      target: { value, name },
    } = event;
    // console.log(name);
    if (value !== null) {
      const updatedRows = rows.map((row) => {
        // console.log(row, Id == row.Id);
        if (row.Id == Id) {
          return { ...row, [name]: value };
        } else {
          return row;
        }
      });
      setRows(updatedRows);
    }
    console.log(rows);
  }, 4000);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(() => {
    console.log("called");
    return (
      [...rows]
        // .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [page, rowsPerPage, rows]);
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="right">Combination</TableCell>
                <TableCell align="right">Sku</TableCell>
                <TableCell align="right">Barcode</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Sale Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => {
                console.log(row.Combination, row.Id);
                return (
                  <TableRow
                    key={row.Id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>Image</TableCell>
                    <TableCell>{row.Combination}</TableCell>
                    <TableCell align="right">
                      <TextField
                        placeholder="Sku"
                        size="small"
                        sx={{ width: "50%" }}
                        onChange={(event) => handleInpuChange(event, row.Id)}
                        name="Sku"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        placeholder="Barcode"
                        size="small"
                        sx={{ width: "50%" }}
                        onChange={(event) => handleInpuChange(event, row.Id)}
                        name="Barcode"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        placeholder="Price"
                        size="small"
                        sx={{ width: "50%" }}
                        onChange={(event) => handleInpuChange(event, row.Id)}
                        name="Price"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        placeholder="Sale Price"
                        size="small"
                        sx={{ width: "50%" }}
                        onChange={(event) => handleInpuChange(event, row.Id)}
                        name="SalePrice"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        placeholder="Quantity"
                        size="small"
                        sx={{ width: "50%" }}
                        onChange={(event) => handleInpuChange(event, row.Id)}
                        name="Quantity"
                      />
                    </TableCell>
                    <TableCell align="right"> Action</TableCell>
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
          count={cartesianCombination.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Stack
        spacing={2}
        direction="row"
        sx={{ justifyContent: "space-between" }}
      >
        <CancelButton />
        <UpdateButton />
      </Stack>
    </Box>
  );
};

export default VariantsTable;
