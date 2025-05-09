"use client";
import React, { useEffect, useMemo } from "react";
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

import {
  ViewButton,
  DeleteIconButton,
} from "@/app/components/backend/dashboardCustomers/buttons";
import CustomerDrawerButton from "@/app/components/backend/dashboardCustomers/customerDrawerButton";

import AlertDialog from "@/app/components/backend/dashboardCategories/deleteAlert";

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "registration_date",
    numeric: true,
    disablePadding: false,
    label: "Joining Date	",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "NAME",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "EMAIL",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "PHONE",
  },
  {
    id: "Actiton",
    numeric: true,
    disablePadding: false,
    label: "ACTION",
  },
];

const CustomersTableBody = ({ customers }) => {
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [clients, setClients] = React.useState(customers);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    //data changed
    setClients(customers);
  }, [customers]);
  const search = searchParams.get("query");
  const filteredClients = useMemo(() => {
    if (search) {
      return clients.filter((client) => {
        return client["email"]
          .toLowerCase()
          .includes(search?.toLocaleLowerCase());
      });
    } else return clients;
  }, [search, clients]);
  const handleChangePage = (event, newPage) => {
    console.log("called handleChangePage");
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("called handleChangeRowsPerPage");

    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    console.log("called handleRequestSort");

    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    console.log("called handleSelectAllClick");

    if (event.target.checked) {
      const newSelected = filteredClients.map((n) => n.client_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    console.log("called handleClick");

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

  //open alert dialo
  const [openRemoveClientAlert, setOpenRemoveClientAlert] =
    React.useState(false);
  const [removeRowId, setRemoveRowId] = React.useState(null);
  const handleRemoveClientAlertClickOpen = (row_id) => {
    setRemoveRowId(row_id);
    setOpenRemoveClientAlert(true);
  };

  const handleRemoveClientAlertClose = (event, row_id) => {
    setOpenRemoveClientAlert(false);
  };
  const handleClientDelete = (remove_row_id) => {
    console.log(remove_row_id);
    const filtered = filteredClients.filter((client) => {
      return client.client_id !== remove_row_id;
    });
    console.log(filtered);
    // setRows(filtered);
    setClients(filtered);
    setOpenRemoveClientAlert(false);
    // updateProductProducts({ variants: filtered, product_id: product_id });
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredClients.length)
      : 0;

  const visibleRows = React.useMemo(() => {
    return (
      [...filteredClients]
        // .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [order, orderBy, page, rowsPerPage, filteredClients]);
  return (
    <Box sx={{ width: "100%" }}>
      <AlertDialog
        open={openRemoveClientAlert}
        handleClose={handleRemoveClientAlertClose}
        handleDelete={handleClientDelete}
        row={removeRowId}
      />
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          heading="Customers"
          action="deleteClient"
          selected={selected}
          setSelected={setSelected}
        />
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
              rowCount={filteredClients.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.client_id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.client_id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onClick={(event) => handleClick(event, row.client_id)}
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row["client_id"]}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(row?.joining_date).toDateString()}
                    </TableCell>
                    <TableCell align="right">{row?.name}</TableCell>
                    <TableCell align="right">{row["email"]}</TableCell>
                    <TableCell align="right">
                      {/* <Switch
                        checked={row.published}
                        onChange={handlePublishedChange}
                        id={row?.client_id}
                      /> */}
                      {row?.phone}
                    </TableCell>
                    <TableCell align="right">
                      <ViewButton client_id={row?.client_id} />
                      <CustomerDrawerButton
                        action="Edit"
                        clientId={row?.client_id}
                      />
                      <DeleteIconButton
                        handleDelete={() =>
                          handleRemoveClientAlertClickOpen(row?.client_id)
                        }
                      />
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
          count={filteredClients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default CustomersTableBody;
