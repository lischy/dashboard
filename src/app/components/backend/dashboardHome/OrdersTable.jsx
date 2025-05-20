"use client";
import React, { useEffect, useState, use } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Typography from "@mui/material/Typography";
import { fetchOrders } from "@/app/lib/data";
import { ViewButton } from "@/app/components/backend/dashboardHome/buttons";
import BasicSelect from "@/app/components/reusable/Select";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function OrdersTable({ label }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [action, setAction] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const response = async () => {
      const fetchOrdersResponse = await fetchOrders();
      if (fetchOrdersResponse.status != 200) {
        return;
      }
      // console.log(fetchOrdersResponse.data);
      setOrders(fetchOrdersResponse.data);
    };
    response();
  }, []);

  const handleActionChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, value, event.target);
    setAction((prevaction) => {
      // console.log(prevaction);
      return { ...prevaction, [name]: value };
    });

    console.log(action);
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
      <Typography variant="h3"> {label} </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow>
              <TableCell>INVOICE NO</TableCell>
              <TableCell align="right">ORDER TIME</TableCell>
              <TableCell align="right">Customer Name</TableCell>
              <TableCell align="right">METHOD</TableCell>
              <TableCell align="right">AMOUNT</TableCell>
              <TableCell align="right">STATUS</TableCell>
              <TableCell align="right">ACTION</TableCell>
              <TableCell align="right">INVOICE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? orders?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : orders
            ).map((row) => (
              <TableRow key={row.order_id}>
                <TableCell style={{ width: 160 }} align="left">
                  {row["invoice_id"] ? row["invoice_id"] : row["order_id"]}
                </TableCell>
                <TableCell align="right">{row["order_date"]}</TableCell>
                <TableCell align="right">{row["client_name"]}</TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row["payment_method"]}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row["total_amount"]}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {action[row.order_id] ||
                    row?.status.toUpperCase() ||
                    "Change status"}
                </TableCell>
                {/* <TableCell style={{ width: 160 }} align="right">
                  {row["Action"]}
                </TableCell> */}
                <BasicSelect
                  name={row.order_id}
                  menuItems={[
                    "Pending".toUpperCase(),
                    "Delivered".toUpperCase(),
                    "Processing".toUpperCase(),
                    "Cancelled".toUpperCase(),
                  ]}
                  label="Orders"
                  labelId="Orddemo-simple-select-label"
                  inputLabel="Orders"
                  value={
                    action[row.order_id] || row?.status.toUpperCase() || ""
                  }
                  handleChange={handleActionChange}
                  component="td"
                  // renderValue={(selected) => {
                  //   console.log(selected.length, selected);
                  //   if (selected.length === 0) {
                  //     return <em>Placeholder</em>;
                  //   }

                  //   return selected;
                  // }}
                />
                <TableCell align="right">
                  <ViewButton invoiceId={row["invoice_id"]} />
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={orders?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
