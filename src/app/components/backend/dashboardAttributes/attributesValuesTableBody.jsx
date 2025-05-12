"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
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
  DeleteButton,
  EditButton,
} from "@/app/components/backend/dashboardAttributes/buttons";
import { fetchtAtributeValuesById } from "@/app/lib/data";
import { useRouterRefreshContext } from "@/app/context/routerRefresh";

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
    id: "Value",
    numeric: true,
    disablePadding: false,
    label: "Value",
  },
  {
    id: "Published",
    numeric: true,
    disablePadding: false,
    label: "PUBLISHED",
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
  const [attributesValues, setAttributesValues] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const params = useParams();
  const { parent } = params;
  const { refresh } = useRouterRefreshContext();

  const response = async () => {
    const response = await fetchtAtributeValuesById(parent);
    console.log(response.data);
    if (response.status !== 200) {
      return;
    }
    setAttributesValues(response?.data);
  };

  useEffect(() => {
    console.log("called");
    response();
  }, [refresh]);

  // const filteredAttributesValues = useMemo(() => {
  //   if (search) {
  //     return attributesValues.filter((prodAttrib) => {
  //       return prodAttrib["Name"]
  //         .toLowerCase()
  //         .includes(search?.toLocaleLowerCase());
  //     });
  //   } else return attributesValues;
  // }, [search, attributesValues]);
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
    setAttributesValues((currentAttributesValues) => {
      return currentAttributesValues.map((prodAttrib) => {
        if (prodAttrib.attribute_value_id == id) {
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
      const newSelected = attributesValues.map((n) => n.attribute_value_id);
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
      ? Math.max(0, (1 + page) * rowsPerPage - attributesValues.length)
      : 0;

  const visibleRows = React.useMemo(() => {
    return (
      [...attributesValues]
        // .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [order, orderBy, page, rowsPerPage, attributesValues]);

  return (
    attributesValues.length > 0 && (
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            heading="Attributes values"
            selected={selected?.length > 0 ? selected : []}
            attributeId={parent}
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
                rowCount={attributesValues.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = selected.includes(
                    row.attribute_value_id
                  );
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.attribute_value_id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onClick={(event) =>
                            handleClick(event, row.attribute_value_id)
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
                        {row["attribute_value_id"]}
                      </TableCell>
                      <TableCell align="right">{row["display_name"]}</TableCell>
                      <TableCell align="right">{row.value}</TableCell>
                      <TableCell align="right">
                        <Switch
                          checked={row.published}
                          onChange={handlePublishedChange}
                          id={row.attribute_value_id}
                          disabled
                        />
                      </TableCell>
                      <TableCell align="right">
                        <EditButton
                          id={row.attribute_value_id}
                          parent={parent}
                        />
                        <DeleteButton />
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
            count={attributesValues.length}
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
