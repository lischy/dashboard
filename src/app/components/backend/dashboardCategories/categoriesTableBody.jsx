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
import {
  ViewButton,
  DeleteIconButton,
} from "@/app/components/backend/dashboardCategories/buttons";
import CategoryDrawerButton from "@/app/components/backend/dashboardCategories/categoryDrawerButton";

import AlertDialog from "@/app/components/backend/dashboardCategories/deleteAlert";

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "icon",
    numeric: true,
    disablePadding: false,
    label: "ICON",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "NAME",
  },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "DESCRIPTION",
  },
  {
    id: "pulished",
    numeric: true,
    disablePadding: false,
    label: "PULISHED",
  },
  {
    id: "Actiton",
    numeric: true,
    disablePadding: false,
    label: "ACTION",
  },
];

const CategoriesTableBody = ({ categories }) => {
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [productsCategories, setProductsCategories] =
    React.useState(categories);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const searchParams = useSearchParams();

  const search = searchParams.get("query");
  const filteredProductsCategories = useMemo(() => {
    if (search) {
      return productsCategories.filter((prodCat) => {
        return prodCat["name"]
          .toLowerCase()
          .includes(search?.toLocaleLowerCase());
      });
    } else return productsCategories;
  }, [search, productsCategories]);
  const handleChangePage = (event, newPage) => {
    console.log("called handleChangePage");
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("called handleChangeRowsPerPage");

    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePublishedChange = (event) => {
    console.log("called handlePublishedChange");

    const { id } = event.target;
    console.log(id);
    setProductsCategories((currentproductsCategories) => {
      return currentproductsCategories.map((prodCat) => {
        if (prodCat.category_id == id) {
          return {
            ...prodCat,
            published: !prodCat.published,
          };
        } else {
          return prodCat;
        }
      });
    });
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
      const newSelected = filteredProductsCategories.map((n) => n.category_id);
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
  const [openRemoveCategoryAlert, setOpenRemoveCategoryAlert] =
    React.useState(false);
  const [removeRowId, setRemoveRowId] = React.useState(null);
  const handleRemoveCategoryAlertClickOpen = (row_id) => {
    console.log("called handleRemoveCategoryAlertClickOpen");

    setRemoveRowId(row_id);
    setOpenRemoveCategoryAlert(true);
  };

  const handleRemoveCategoryAlertClose = (event, row_id) => {
    console.log("called handleRemoveCategoryAlertClose");

    setOpenRemoveCategoryAlert(false);
  };
  const handleCategoryDelete = (remove_row_id) => {
    console.log("called handleCategoryDelete");

    console.log(remove_row_id);
    const filtered = productsCategories.filter((row) => {
      return row.category_id !== remove_row_id;
    });
    console.log(filtered);
    // setRows(filtered);
    setProductsCategories(filtered);
    setOpenRemoveCategoryAlert(false);
    // updateProductProducts({ variants: filtered, product_id: product_id });
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage - filteredProductsCategories.length
        )
      : 0;

  const visibleRows = React.useMemo(() => {
    return (
      [...filteredProductsCategories]
        // .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [order, orderBy, page, rowsPerPage, filteredProductsCategories]);
  return (
    <Box sx={{ width: "100%" }}>
      <AlertDialog
        open={openRemoveCategoryAlert}
        handleClose={handleRemoveCategoryAlertClose}
        handleDelete={handleCategoryDelete}
        row={removeRowId}
      />
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          heading="Categories"
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
              rowCount={filteredProductsCategories.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.category_id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.category_id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onClick={(event) => handleClick(event, row.category_id)}
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
                      {row["category_id"]}
                    </TableCell>
                    <TableCell align="right">{row?.Icon}</TableCell>
                    <TableCell align="right">{row?.name}</TableCell>
                    <TableCell align="right">{row["description"]}</TableCell>
                    <TableCell align="right">
                      <Switch
                        checked={row.published}
                        onChange={handlePublishedChange}
                        id={row?.category_id}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <CategoryDrawerButton
                        action="Edit"
                        categoryId={row?.category_id}
                      />
                      <DeleteIconButton
                        handleDelete={() =>
                          handleRemoveCategoryAlertClickOpen(row?.category_id)
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
          count={filteredProductsCategories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default CategoriesTableBody;
