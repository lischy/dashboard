"use client";
import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import EnhancedTableToolbar from "../enhancedTableToolbar";
import EnhancedTableHead from "../enhancedTableHead";
import TablePagination from "@mui/material/TablePagination";
import BasicSelect from "@/app/components/reusable/Select";

// import { EditButton, DeleteButton } from "./buttons";
const headCells = [
  {
    id: "order_id",
    numeric: false,
    disablePadding: true,
    label: "Order ID",
  },
  {
    id: "time",
    numeric: true,
    disablePadding: false,
    label: "Time",
  },
  {
    id: "shipping_address",
    numeric: true,
    disablePadding: false,
    label: "Shipping Address",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "PHONE",
  },
  {
    id: "method",
    numeric: true,
    disablePadding: false,
    label: "METHOD",
  },
  {
    id: "amount",
    numeric: true,
    disablePadding: false,
    label: "AMOUNT",
  },
  {
    id: "STATUS",
    numeric: true,
    disablePadding: false,
    label: "STATUS",
  },
  {
    id: "ACTIONS",
    numeric: true,
    disablePadding: false,
    label: "ACTIONS",
  },
];

const CustomerOrdersTableBody = ({ customerOrders }) => {
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [orders, setOrders] = React.useState(customerOrders);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const searchParams = useSearchParams();

  const search = searchParams.get("query");
  const filteredOrders = useMemo(() => {
    if (search) {
      return orders.filter((coupon) => {
        return coupon["Campaign Name"]
          .toLowerCase()
          .includes(search?.toLocaleLowerCase());
      });
    } else return orders;
  }, [search, orders]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePublishedChange = (event) => {
    const { id } = event.target;
    console.log(id);
    setOrders((currentOrders) => {
      return currentOrders.map((coupon) => {
        if (coupon.id == id) {
          return {
            ...coupon,
            PUBLISHED: !coupon.PUBLISHED,
          };
        } else {
          return coupon;
        }
      });
    });
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredOrders.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  //handle orders status change
  const [action, setAction] = React.useState({});

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
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredOrders.length)
      : 0;

  const visibleRows = React.useMemo(() => {
    return (
      [...filteredOrders]
        // .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [order, orderBy, page, rowsPerPage, filteredOrders]);
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} heading="Orders" />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredOrders.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.order_id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.order_id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onClick={(event) => handleClick(event, row.order_id)}
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    {/* <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row["id"]}
                    </TableCell> */}
                    <TableCell>{row["order_id"]}</TableCell>
                    <TableCell align="right">
                      {new Date(row["created_at"]).toDateString()}
                    </TableCell>
                    <TableCell align="right">
                      {row["shipping_address"]}
                    </TableCell>
                    <TableCell align="right">
                      {/* <Switch
                        checked={row.PUBLISHED}
                        onChange={handlePublishedChange}
                        id={row.order_id}
                      /> */}
                      {row?.phone}
                    </TableCell>
                    <TableCell align="right">{row["payment_method"]}</TableCell>
                    <TableCell align="right">{row["total_amount"]}</TableCell>
                    <TableCell align="right">
                      {action[row.order_id] || row?.status}
                    </TableCell>
                    <BasicSelect
                      name={row.order_id}
                      menuItems={[
                        "Fulfilled",
                        "Refunded",
                        "Cancelled",
                        "Exchanged",
                      ]}
                      label="Orders"
                      labelId="Orddemo-simple-select-label"
                      inputLabel="Orders"
                      value={action[row.order_id] || ""}
                      handleChange={handleActionChange}
                      component="td"
                    />
                    {/* <TableCell align="right">{row["VALUES"]}</TableCell> */}
                    {/* <TableCell align="right">
                      <EditButton id={row.id} />
                      <DeleteButton id={row.id} />
                    </TableCell> */}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default CustomerOrdersTableBody;
