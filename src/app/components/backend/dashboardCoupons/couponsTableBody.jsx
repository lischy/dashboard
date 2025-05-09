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
  EditButton,
  DeleteIconButton,
} from "@/app/components/backend/dashboardCoupons/buttons";
import CouponDrawerButton from "@/app/components/backend/dashboardCoupons/couponDrawerButton";
import { deleteProductCoupon } from "@/app/lib/actions";

const headCells = [
  {
    id: "CAMPAIGN NAME",
    numeric: false,
    disablePadding: true,
    label: "CAMPAIGN NAME",
  },
  {
    id: "CODE",
    numeric: true,
    disablePadding: false,
    label: "CODE",
  },
  {
    id: "DISCOUNT",
    numeric: true,
    disablePadding: false,
    label: "DISCOUNT",
  },
  {
    id: "PUBLISHED",
    numeric: true,
    disablePadding: false,
    label: "PUBLISHED",
  },
  {
    id: "START DATE",
    numeric: true,
    disablePadding: false,
    label: "START DATE",
  },
  {
    id: "END DATE",
    numeric: true,
    disablePadding: false,
    label: "END DATE",
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

const CouponsTableBody = ({ data }) => {
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [coupons, setCoupons] = React.useState(data);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const searchParams = useSearchParams();
  useEffect(() => {
    console.log("Data has changed");
    setCoupons(data);
  }, [data]);

  const search = searchParams.get("query");
  const filteredCoupons = useMemo(() => {
    if (search) {
      return coupons.filter((coupon) => {
        return coupon["Campaign Name"]
          .toLowerCase()
          .includes(search?.toLocaleLowerCase());
      });
    } else return coupons;
  }, [search, coupons, data]);
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
    setCoupons((currentCoupons) => {
      return currentCoupons.map((coupon) => {
        if (coupon.coupon_id == id) {
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
      const newSelected = filteredCoupons.map((n) => n.coupon_id);
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
  const handleDelete = (coupon_id) => {
    console.log("Clicked handle delete coupon", coupon_id);
    const response = async () => {
      const deleteResponse = await deleteProductCoupon({
        coupon_value_id_array: [coupon_id],
      });
    };
    response();
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredCoupons.length)
      : 0;

  const visibleRows = React.useMemo(() => {
    return (
      [...filteredCoupons]
        // .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [order, orderBy, page, rowsPerPage, filteredCoupons]);
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          heading="Coupons"
          selected={selected}
          action="deleteCoupon"
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
              rowCount={filteredCoupons.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.coupon_id);
                const labelId = `enhanced-table-checkbox-${index}`;
                // console.log(
                //   new Date(row["expiration_date"]),
                //   new Date(),
                //   new Date(row["expiration_date"]) < new Date()
                // );
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.coupon_id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onClick={(event) => handleClick(event, row.coupon_id)}
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
                    <TableCell>{row["campaign_code"]}</TableCell>
                    <TableCell align="right">{row["coupon_code"]}</TableCell>
                    <TableCell align="right">{row["discount"]}</TableCell>
                    <TableCell align="right">
                      <Switch
                        disabled
                        checked={row?.published || ""}
                        onChange={handlePublishedChange}
                        id={row.coupon_id}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {new Date().toDateString()}
                    </TableCell>
                    <TableCell align="right">
                      {/* {new Date(row["Coupon Validity Time"]) > new Date()} */}

                      {new Date(row["expiration_date"]).toDateString()}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(row["expiration_date"]) > new Date()
                        ? "Active"
                        : "Expired"}
                    </TableCell>
                    {/* <TableCell align="right">{row["VALUES"]}</TableCell> */}
                    <TableCell align="right">
                      <CouponDrawerButton
                        action="Edit"
                        couponId={row.coupon_id}
                      />
                      {/* <EditButton id={row.id} /> */}
                      <DeleteIconButton
                        handleDelete={() => handleDelete(row?.coupon_id)}
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
          count={filteredCoupons.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default CouponsTableBody;
