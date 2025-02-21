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
import { ViewButton } from "../buttons";

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "Name",
    numeric: true,
    disablePadding: false,
    label: "NAME",
  },
  {
    id: "Display name",
    numeric: true,
    disablePadding: false,
    label: "DISPLAY NAME",
  },
  {
    id: "Published",
    numeric: true,
    disablePadding: false,
    label: "PUBLISHED",
  },
  {
    id: "values",
    numeric: true,
    disablePadding: false,
    label: "VALUES",
  },
  {
    id: "Action",
    numeric: true,
    disablePadding: false,
    label: "ACTION",
  },
];

const AttributesTableBody = ({ attributes }) => {
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [productsAttributes, setProductsAttributes] =
    React.useState(attributes);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const searchParams = useSearchParams();

  const search = searchParams.get("query");
  const filteredProductsAttributes = useMemo(() => {
    if (search) {
      return productsAttributes.filter((prodAttrib) => {
        return prodAttrib["Name"]
          .toLowerCase()
          .includes(search?.toLocaleLowerCase());
      });
    } else return productsAttributes;
  }, [search, productsAttributes]);
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
    setProductsAttributes((currentproductsAttributes) => {
      return currentproductsAttributes.map((prodAttrib) => {
        if (prodAttrib.ID == id) {
          return {
            ...prodAttrib,
            PUBLISHED: !prodAttrib.PUBLISHED,
          };
        } else {
          return prodAttrib;
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
      const newSelected = filteredProductsAttributes.map((n) => n.ID);
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
      ? Math.max(
          0,
          (1 + page) * rowsPerPage - filteredProductsAttributes.length
        )
      : 0;

  const visibleRows = React.useMemo(() => {
    return (
      [...filteredProductsAttributes]
        // .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [order, orderBy, page, rowsPerPage, filteredProductsAttributes]);
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          heading="Attributes"
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
              rowCount={filteredProductsAttributes.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.ID);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.ID}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onClick={(event) => handleClick(event, row.ID)}
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
                      {row["ID"]}
                    </TableCell>
                    <TableCell align="right">{row.NAME}</TableCell>
                    <TableCell align="right">{row["DISPLAY NAME"]}</TableCell>
                    <TableCell align="right">
                      <Switch
                        checked={row.PUBLISHED}
                        onChange={handlePublishedChange}
                        id={row.ID}
                      />
                    </TableCell>
                    {/* <TableCell align="right">{row["VALUES"]}</TableCell> */}
                    <TableCell align="right">
                      <ViewButton parent={row.ID} />
                    </TableCell>

                    <TableCell align="right">{row.ACTION}</TableCell>
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
          count={filteredProductsAttributes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default AttributesTableBody;
