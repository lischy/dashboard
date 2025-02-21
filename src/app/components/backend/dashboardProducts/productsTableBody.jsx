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
import { ViewButton } from "./buttons";

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

const ProductsTableBody = ({ prods }) => {
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [products, setProducts] = React.useState(prods);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const searchParams = useSearchParams();

  const search = searchParams.get("query");
  const filteredProducts = useMemo(() => {
    if (search) {
      // setProducts((currentProducts) => {
      // console.log(currentProducts);
      return products.filter((prod) => {
        return prod["PRODUCT NAME"]
          .toLowerCase()
          .includes(search?.toLocaleLowerCase());
      });
      // });
      console.log(search);
    } else return products;
  }, [search, products]);
  console.log(products);
  console.log(filteredProducts);
  // const handleSearch = () =>
  //   useMemo(() => {
  //     setProducts((currentProducts) => {
  //       console.log(currentProducts);
  //       return currentProducts.filter((prod) => {
  //         console.log(currentProducts, prod);
  //         return prod["PRODUCT NAME"].includes(search);
  //       });
  //     });
  //     console.log(search);
  //   }, [search]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePublishedChange = (event) => {
    const { id } = event.target;
    setProducts((currentProducts) => {
      return currentProducts.map((prod) => {
        if (prod.id == id) {
          return {
            ...prod,
            PUBLISHED: !prod.PUBLISHED,
          };
        } else {
          return prod;
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
      const newSelected = filteredProducts.map((n) => n.id);
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
      ? Math.max(0, (1 + page) * rowsPerPage - filteredProducts.length)
      : 0;

  const visibleRows = React.useMemo(() => {
    console.log("called");
    return (
      [...filteredProducts]
        // .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [order, orderBy, page, rowsPerPage, filteredProducts]);
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          heading="Products"
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
              rowCount={filteredProducts.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onClick={(event) => handleClick(event, row.id)}
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
                      {row["PRODUCT NAME"]}
                    </TableCell>
                    <TableCell align="right">{row.CATEGORY}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row["Sale Price"]}</TableCell>
                    <TableCell align="right">{row.STOCK}</TableCell>
                    <TableCell align="right">{row.STATUS}</TableCell>
                    {/* <TableCell align="right">{row.View}</TableCell> */}
                    <TableCell align="right">
                      <ViewButton id={row.id} />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={row.PUBLISHED}
                        onChange={handlePublishedChange}
                        id={row.id}
                      />
                    </TableCell>
                    <TableCell align="right">{row.ACTIONS}</TableCell>
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
          count={filteredProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default ProductsTableBody;
