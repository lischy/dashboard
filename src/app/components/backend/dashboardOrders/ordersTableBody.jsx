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
import { ViewButton } from "@/app/components/backend/dashboardOrders/buttons";
import BasicSelect from "@/app/components/reusable/Select";

const headCells = [
  {
    id: "INVOICE NO",
    numeric: false,
    disablePadding: true,
    label: "INVOICE NO",
  },
  {
    id: "ORDER TIME",
    numeric: false,
    disablePadding: true,
    label: "ORDER TIME",
  },
  {
    id: "Customer Name",
    numeric: false,
    disablePadding: true,
    label: "Customer Name",
  },
  {
    id: "METHOD",
    numeric: false,
    disablePadding: true,
    label: "METHOD",
  },
  {
    id: "AMOUNT",
    numeric: false,
    disablePadding: true,
    label: "AMOUNT",
  },
  {
    id: "STATUS",
    numeric: false,
    disablePadding: true,
    label: "STATUS",
  },
  {
    id: "ACTION",
    numeric: false,
    disablePadding: true,
    label: "ACTION",
  },
  {
    id: "INVOICE",
    numeric: false,
    disablePadding: true,
    label: "INVOICE",
  },
];

const OrdersTableBody = ({ data }) => {
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [orders, setOrders] = React.useState(data);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const searchParams = useSearchParams();
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

  const search = searchParams.get("query");
  const filteredOrders = useMemo(() => {
    if (search) {
      return orders.filter((order) => {
        if (!order?.invoice_id) return;
        return order?.invoice_id
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
                // console.log(
                //   new Date(row["Coupon Validity Time"]),
                //   new Date(),
                //   new Date(row["Coupon Validity Time"]) < new Date()
                // );
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
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
                    <TableCell>
                      {row["invoice_id"] ? row["invoice_id"] : row["order_id"]}
                    </TableCell>
                    <TableCell>{row["order_date"]}</TableCell>
                    <TableCell>{row["client_name"]}</TableCell>
                    <TableCell>
                      {/* <Switch
                        checked={row.PUBLISHED}
                        onChange={handlePublishedChange}
                        id={row.order_id}
                      /> */}
                      METHOD
                    </TableCell>
                    <TableCell>{row["total_amount"]}</TableCell>
                    <TableCell>
                      {action[row.order_id] || "Change status"}
                    </TableCell>
                    <BasicSelect
                      name={row.order_id}
                      menuItems={[
                        "Pending",
                        "Delivered",
                        "Processing",
                        "Cancel",
                      ]}
                      label="Orders"
                      labelId="Orddemo-simple-select-label"
                      inputLabel="Orders"
                      value={action[row.order_id] || ""}
                      handleChange={handleActionChange}
                      component="td"
                    />
                    <TableCell align="right">
                      <ViewButton invoiceId={row["invoice_id"]} />
                    </TableCell>
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

export default OrdersTableBody;
