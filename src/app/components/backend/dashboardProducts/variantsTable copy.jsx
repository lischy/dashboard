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
import { CancelButton, UpdateButton } from "./buttons";
import { TableFooter } from "@mui/material";
import { updateProductVariants } from "@/app/lib/actions";
import { fetchtProductVariants, fetchtProductImages } from "@/app/lib/data";

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

function createData(
  Id,
  Image,
  Combination,
  Sku,
  Barcode,
  Price,
  SalePrice,
  Quantity
) {
  return { Id, Image, Combination, Sku, Barcode, Price, SalePrice, Quantity };
}

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

const VariantsTable = ({ cartesianCombination, selections }) => {
  const params = useParams();
  const { id } = params;
  const product_id = id;
  const [rows, setRows] = React.useState([]);
  // React.useMemo(() => {
  //   setRows((prev) => {
  //     return [
  //       ...prev,
  //       ...cartesianCombination?.map((item, id) =>
  //         createData(id, "", item.join(", "), "", "", "", "", "")
  //       ),
  //     ];
  //   });
  // }, [cartesianCombination]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  console.log(selections);
  // useEffect(() => {
  //   const response = async () => {
  //     const response = await fetchtProductVariants({ product_id: product_id });
  //     const variants = response.data;
  //     console.log(variants);
  //   };
  //   response();
  //   // if(response.status === 200 ) {
  //   //   setRows(variants)
  //   // }
  // });

  // const fetchtProductVariants = async () => {
  //   const productVariants = await variants;
  //   const filterProductVariants = productVariants.filter((variant) => {
  //     return variant !== null;
  //   });
  //   if (filterProductVariants.length > 0) {
  //     setRows((prev) => {
  //       return [...prev, filterProductVariants];
  //     });
  //   }
  // };
  // useMemo(() => fetchtProductVariants(), [variants]);

  useEffect(() => {
    console.log("CALLED, CALLED, - variants table ", cartesianCombination);
    // if (cartesianCombination?.length > 0) {
    //   setRows((prev) => {
    //     return [
    //       ...prev,
    //       ...cartesianCombination?.map((item, id) =>
    //         createData(id, "", item.join(", "), "", "", "", "", "")
    //       ),
    //     ];
    //   });
    // }
    const response = async () => {
      const response = await fetchtProductVariants({ product_id: product_id });
      const productVariants = await response.data;
      const filterProductVariants = productVariants.filter((variant) => {
        console.log(variant, variant !== null);
        return variant !== null;
      });

      // Normalize the Combination string by sorting its components
      // function normalizeCombination(combination) {
      //   return combination.split(', ').sort().join(', ');
      // }
      const combined = [
        ...filterProductVariants,
        ...cartesianCombination?.map((item, id) =>
          createData(
            id + filterProductVariants.length + 1,
            "",
            item?.join(", "),
            "",
            "",
            "",
            "",
            ""
          )
        ),
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
      console.log(uniqueData, cleanedData);

      setRows(cleanedData);
      // setRows(() => {
      //   return [
      //     ...filterProductVariants,
      //     ...cartesianCombination?.map((item, id) =>
      //       createData(
      //         id + filterProductVariants.length + 1,
      //         "",
      //         item.join(", "),
      //         "",
      //         "",
      //         "",
      //         "",
      //         ""
      //       )
      //     ),
      //   ];
      // });
    };

    response();
  }, [cartesianCombination]);
  //   // fetchtProductVariants();

  //   // const response = async () => {
  //   //   const response = await fetchtProductVariants({ product_id: product_id });
  //   //   const productVariants = await response.data;
  //   //   const filterProductVariants = productVariants.filter((variant) => {
  //   //     console.log(variant, variant !== null);
  //   //     return variant !== null;
  //   //   });
  //   //   console.log(filterProductVariants);
  //   //   setRows((prev) => {
  //   //     return [...prev, ...filterProductVariants];
  //   //   });
  //   // };

  //   // response();
  // }, [variants]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // const handleInpuChange = debounce((event, Id) => {
  //   const {
  //     target: { value, name },
  //   } = event;
  //   console.log(name, value);
  //   if (value !== null) {
  //     const updatedRows = rows.map((row) => {
  //       // console.log(row, Id == row.Id);
  //       if (row.Id == Id) {
  //         return { ...row, [name]: value };
  //       } else {
  //         return row;
  //       }
  //     });
  //     setRows(updatedRows);
  //   }
  //   console.log(rows);
  // }, 4000);
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
    }
    console.log(rows);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(() => {
    console.log("called");
    return (
      [...rows]
        // .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [page, rowsPerPage, rows]);

  const handleProductUpdate = () => {
    // console.log("clicked", rows, selections);
    updateProductVariants(rows, selections, cartesianCombination, product_id);
  };
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
                console.log(row, row.Sku);
                return (
                  <TableRow
                    key={id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>Image</TableCell>
                    <TableCell>{row.Combination}</TableCell>
                    <TableCell align="right">
                      <TextField
                        placeholder="Sku"
                        size="small"
                        sx={{ width: "50%" }}
                        value={row?.Sku}
                        onChange={(event) => handleInpuChange(event, row.Id)}
                        name="Sku"
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
                      />
                    </TableCell>
                    <TableCell align="right"> Action</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
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
      <Stack
        spacing={2}
        direction="row"
        sx={{ justifyContent: "space-between" }}
      >
        <CancelButton />
        <UpdateButton handleProductUpdate={handleProductUpdate} />
      </Stack>
    </Box>
  );
};

export default VariantsTable;
