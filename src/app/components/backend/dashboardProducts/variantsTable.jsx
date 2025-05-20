"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { CancelButton, DeleteButton } from "./buttons";
import { TableFooter } from "@mui/material";
import { updateProductVariants } from "@/app/lib/actions";
import { fetchtProductVariants, fetchtProductImages } from "@/app/lib/data";
import Button from "@mui/material/Button";
import ImageDialog from "./imageDialog";
import AlertDialog from "./deleteAlert";
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

function createData({
  Id = null,
  Image = null,
  Combination = null,
  Sku = null,
  Barcode = null,
  Price = null,
  SalePrice = null,
  Quantity = null,
} = {}) {
  return { Id, Image, Combination, Sku, Barcode, Price, SalePrice, Quantity };
}
let productImages;
const VariantsTable = ({
  cartesianCombination,
  selections,
  setVariantRows,
}) => {
  const params = useParams();
  const { id } = params;
  const product_id = id;
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  // console.log(cartesianCombination);
  useEffect(() => {
    // console.log("CALLED, CALLED, - variants table ", cartesianCombination);

    const response = async () => {
      const response = await fetchtProductVariants({ product_id: product_id });
      const responseImages = await fetchtProductImages({
        product_id: product_id,
      });
      const productVariants = response.data;
      productImages = responseImages.data;
      // console.log(productImages);
      if (productVariants) {
        const filterProductVariants = productVariants?.filter((variant) => {
          // console.log(variant, variant !== null);
          return variant !== null;
        });

        const combined = [
          ...filterProductVariants,
          ...cartesianCombination?.map((item, id) => ({
            Id: id + filterProductVariants.length + 1,
            Image: null,
            Combination:
              cartesianCombination.length > 1 ? item?.join(", ") : item,
            Sku: "",
            Barcode: "",
            Price: "",
            SalePrice: "",
            Quantity: "",
          })),
        ];

        //  Normalize each combination
        const normalizedData = combined.map((item) => ({
          ...item,
          normalizedCombination: item.Combination.split(", ").sort().join(", "),
        }));
        // Remove null values and filter unique objects based on the 'Combination' key
        const uniqueData = normalizedData.filter(
          (item, index, self) =>
            item &&
            self.findIndex(
              (t) => t.normalizedCombination === item.normalizedCombination
            ) === index
        );

        const cleanedData = uniqueData.map(
          ({ normalizedCombination, ...rest }) => rest
        );
        // console.log(uniqueData, cleanedData);

        setRows(cleanedData);
        setVariantRows?.(cleanedData);
      } else {
        setRows(() => {
          return [
            ...cartesianCombination?.map(
              (item, id) => ({
                Id: id,
                Image: null,
                Combination: item.join(", "),
                Sku: "",
                Barcode: "",
                Price: "",
                SalePrice: "",
                Quantity: "",
              })
              // createData(id, "", item.join(", "), "", "", "", "", "")
            ),
          ];
        });

        setVariantRows?.(() => {
          return [
            ...cartesianCombination?.map(
              (item, id) => ({
                Id: id,
                Image: null,
                Combination: item.join(", "),
                Sku: "",
                Barcode: "",
                Price: "",
                SalePrice: "",
                Quantity: "",
              })
              // createData(id, "", item.join(", "), "", "", "", "", "")
            ),
          ];
        });
      }
    };

    response();
  }, [cartesianCombination]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleInpuChange = (event, Id) => {
    const {
      target: { value, name },
    } = event;
    console.log(name, value);
    if (value !== null) {
      const updatedRows = rows.map((row) => {
        // console.log(row, Id == row.Id);
        if (row.Id == Id) {
          return { ...row, [name]: value };
        } else {
          return row;
        }
      });
      setRows(updatedRows);
      setVariantRows?.(updatedRows);
    }
    console.log(rows);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //dialo
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseProductImageClick = (value) => {
    setOpen(false);
    if (rowId !== null && value !== null) {
      const updatedRows = rows.map((row) => {
        // console.log(row, Id == row.Id);
        if (row.Id == rowId) {
          return { ...row, Image: value };
        } else {
          return row;
        }
      });
      console.log(updatedRows);
      setRows(updatedRows);
      setVariantRows?.(updatedRows);
    }
  };

  const visibleRows = React.useMemo(() => {
    // console.log("called");
    return [...rows].slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [page, rowsPerPage, rows]);

  const handleProductUpdate = () => {
    updateProductVariants(rows, selections, cartesianCombination, product_id);
  };

  //handle imae update
  const [rowId, setRowId] = React.useState(0);

  const handleClick = (event, id) => {
    // console.log(event.target.tagName, id);
    if (event.target.tagName === "BUTTON") {
      setRowId(id);
    } else {
      setRowId(0);
    }
  };
  //open alert dialo
  const [openRemoveVariantAlert, setOpenRemoveVariantAlert] =
    React.useState(false);
  const [removeRowId, setRemoveRowId] = React.useState(null);
  const handleRemoveVariantAlertClickOpen = (event, row_id) => {
    setRemoveRowId(row_id);
    setOpenRemoveVariantAlert(true);
  };

  const handleRemoveVariantAlertClose = (event, row_id) => {
    setOpenRemoveVariantAlert(false);
  };
  const handleRemoveVariant = (remove_row_id) => {
    console.log(remove_row_id);
    const filtered = rows.filter((row) => {
      console.log(row, row.Id == rowId);
      return row.Id !== remove_row_id;
    });
    // console.log(filtered, rowId);
    setRows(filtered);
    setVariantRows?.(filtered);
    setOpenRemoveVariantAlert(false);
    updateProductVariants({ variants: filtered, product_id: product_id });
  };

  if (rows.length === 0) {
    return;
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="right">Combination</TableCell>
                <TableCell align="right">Sku</TableCell>
                <TableCell align="right">Barcode</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Sale Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row, id) => {
                console.log(row);
                return (
                  <TableRow
                    key={id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={(event) => handleClick(event, row.Id)}
                  >
                    <TableCell>
                      <Avatar>
                        <img
                          src={
                            row?.Image
                              ? `/${row.Image}`
                              : !productImages
                              ? null
                              : `/${productImages[0]}`
                          }
                        />
                      </Avatar>
                      <Button
                        variant="text"
                        disableRipple
                        sx={{
                          minWidth: "unset",
                          textTransform: "none",
                          padding: "unset",
                          background: "none",
                        }}
                        onClick={handleClickOpen}
                      >
                        Change
                      </Button>
                      <ImageDialog
                        open={open}
                        onClose={handleClose}
                        productImages={!productImages ? [] : productImages}
                        handleCloseProductImageClick={
                          handleCloseProductImageClick
                        }
                      />
                    </TableCell>
                    <TableCell>{row.Combination}</TableCell>
                    <TableCell align="right">
                      <TextField
                        placeholder="Sku"
                        size="small"
                        sx={{ width: "50%" }}
                        value={row?.Sku}
                        onChange={(event) => handleInpuChange(event, row.Id)}
                        name="Sku"
                        data-rowid={row.Id}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        placeholder="Barcode"
                        size="small"
                        sx={{ width: "50%" }}
                        onChange={(event) => handleInpuChange(event, row.Id)}
                        name="Barcode"
                        value={row?.Barcode}
                        data-rowid={row.Id}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        placeholder="Price"
                        size="small"
                        sx={{ width: "50%" }}
                        onChange={(event) => handleInpuChange(event, row.Id)}
                        name="Price"
                        value={row?.Price}
                        data-rowid={row.Id}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        placeholder="Sale Price"
                        size="small"
                        sx={{ width: "50%" }}
                        onChange={(event) => handleInpuChange(event, row.Id)}
                        name="SalePrice"
                        value={row?.SalePrice}
                        data-rowid={row.Id}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        placeholder="Quantity"
                        size="small"
                        sx={{ width: "50%" }}
                        onChange={(event) => handleInpuChange(event, row.Id)}
                        name="Quantity"
                        value={row?.Quantity}
                        data-rowid={row.Id}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <DeleteButton
                        onClick={(event) =>
                          handleRemoveVariantAlertClickOpen(event, row.Id)
                        }
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <AlertDialog
              open={openRemoveVariantAlert}
              handleClose={handleRemoveVariantAlertClose}
              handleDelete={handleRemoveVariant}
              row={removeRowId}
            />
            <TableFooter>
              <TableRow></TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={cartesianCombination?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <Stack
        spacing={2}
        direction="row"
        sx={{ justifyContent: "space-between" }}
      >
        <CancelButton />
        <UpdateButton handleProductUpdate={handleProductUpdate} />
      </Stack> */}
    </Box>
  );
};

export default VariantsTable;
