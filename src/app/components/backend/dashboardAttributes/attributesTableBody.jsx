"use client";
import React, { useMemo, useEffect } from "react";
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
} from "@/app/components/backend/dashboardAttributes/buttons";
import AttributeDrawerButton from "@/app/components/backend/dashboardAttributes/attributeDrawerButton";
import { useRouterRefreshContext } from "@/app/context/routerRefresh";
import { fetchtAtributes } from "@/app/lib/data";
import { deleteProductAttribute } from "@/app/lib/actions";

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

const AttributesTableBody = () => {
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [productsAttributes, setProductsAttributes] = React.useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const searchParams = useSearchParams();
  const search = searchParams.get("query");
  const { refresh, setRefresh } = useRouterRefreshContext();

  const response = async () => {
    const response = await fetchtAtributes();
    if (response.status !== 200) return;
    setProductsAttributes(response.data);
  };

  useEffect(() => {
    response();
  }, [refresh]);
  const filteredProductsAttributes = useMemo(() => {
    if (search && productsAttributes.length > 0) {
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
        if (prodAttrib.attribute_id == id) {
          return {
            ...prodAttrib,
            published: !prodAttrib.published,
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
      const newSelected = filteredProductsAttributes.map((n) => n.attribute_id);
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
    console.log(newSelected);
    setSelected(newSelected);
  };

  const handleDelete = (attribute_id) => {
    console.log("Clicked handle delete attribute", attribute_id);
    const response = async () => {
      const deleteResponse = await deleteProductAttribute({
        attribute_id_array: [attribute_id],
      });
      if (deleteResponse.status !== 200) return;
      setRefresh(!refresh);
    };
    response();
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
      productsAttributes?.length > 0 &&
      [...filteredProductsAttributes]
        // .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [order, orderBy, page, rowsPerPage, filteredProductsAttributes]);
  return (
    productsAttributes?.length > 0 && (
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            heading="Attributes"
            selected={selected?.length > 0 ? selected : []}
            setSelected={setSelected}
            action="deleteAttribute"
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
                  const isItemSelected = selected.includes(row.attribute_id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.attribute_id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onClick={(event) =>
                            handleClick(event, row.attribute_id)
                          }
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
                        {row["attribute_id"]}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row["display_name"]}</TableCell>
                      <TableCell align="right">
                        <Switch
                          checked={row.published}
                          onChange={handlePublishedChange}
                          id={row.attribute_id}
                          disabled
                        />
                      </TableCell>
                      {/* <TableCell align="right">{row["VALUES"]}</TableCell> */}
                      <TableCell align="right">
                        <ViewButton parent={row.attribute_id} />
                      </TableCell>

                      <TableCell align="right">
                        <AttributeDrawerButton
                          action="Edit"
                          attributeId={row?.attribute_id}
                        />
                        <DeleteIconButton
                          handleDelete={() => handleDelete(row?.attribute_id)}
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
            count={filteredProductsAttributes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    )
  );
};

export default AttributesTableBody;
