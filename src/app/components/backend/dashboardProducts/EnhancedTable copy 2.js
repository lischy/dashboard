"use client"
import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import {products as prods}  from '../../../../../products' 
import Switch from '@mui/material/Switch';
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import TextInput from "../../reusable/TextInput";
import Stack from "@mui/material/Stack";
import ComboBox from "../../reusable/Autocomplete";
import Form from 'next/form'

import {fetchProducts} from "../../../lib/data"





const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'PRODUCT NAME',
  },
  {
    id: 'category',
    numeric: true,
    disablePadding: false,
    label: 'CATEGORY',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'PRICE',
  },
  {
    id: 'sale price',
    numeric: true,
    disablePadding: false,
    label: 'Sale Price',
  },
  {
    id: 'stock',
    numeric: true,
    disablePadding: false,
    label: 'STOCK',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'STATUS',
  },
  {
    id: 'view',
    numeric: true,
    disablePadding: false,
    label: 'VIEW',
  }, {
    id: 'published',
    numeric: false,
    disablePadding: false,
    label: 'PUBLISHED',
  }, {
    id: 'Actiton',
    numeric: true,
    disablePadding: false,
    label: 'ACTION',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Products
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};



export default  function EnhancedTable({
  query
}) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  console.log(query)

  const formRef = React.useRef(null)


  // const [checkedStatus, setCheckedStatus] = React.useState(products);
  const [products,setProducts] = React.useState( prods);

  // const [request, setRequest] = React.useState({
  //   category: "",
  //   type: "",
  //   subject: "",
  //   description: "",
  //   attachment: "",
  //   errors: {},
  // });

  // const handleFilter= (formData) => {
  //   console.log(Object.fromEntries(formData));
  //   console.log(formData.get("type"))
  //   console.log(formRef.current.reset())
  //   formRef.current?.reset()
  //    }
  // // const [state, action, isPending] = React.useActionState(
    
  //   async (state, payload) => {
  //     if (payload === null) { // if the `submit` function is called with null as the argument, return the initial state, which in this case is null
  //       console.log(state,)  
  //       return state; // the initial state
  //     }

  //     const response = await handleFilter(state, payload);
  //     return response
  // },request)


  // const handleChange = (event) => {
  //   event.preventDefault();
  //   const { name, value } = event.target;

  //   setRequest((previousRequest) => ({
  //     ...previousRequest,
  //     [name]: value,
  //   }));
  // };

  const handlePublishedChange = (event) => {
    const {id}= event.target
    // console.log(checked,id)
      setProducts(currentProducts => 
        {
         return currentProducts.map(prod =>{
            if(prod.id == id){
              // console.log(prod)
                //  console.log(prod.PUBLISHED)
      
              return{
                ...prod,PUBLISHED:!prod.PUBLISHED
              }
            }else{
              return prod
            }
          } )
        }
      )
      
    // console.log(checkedStatus.find(prod => prod.id == id))
    
    // console.log(updatedProductsList[id-1])
    // setCheckedStatus(updatedProductsList)
    // setCheckedStatus((previousPublished) => {
    //   return{myNextList}
    // });
    // console.log(myNextList,checkedStatus)
    // console.log(products)
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = products.map((n) => n.id);
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
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const visibleRows = React.useMemo(
    () =>{
      console.log("called")
      return(
      [...products]
        // .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
       }, [order, orderBy, page, rowsPerPage,products],
  );

  return (
    <Box sx={{ width: '100%' }}>
        {/* <Form action={handleFilter} ref={formRef} >

      <TextInput
        type="text"
        name="type"
        label="Type"
        value={request.type}
        onChange={handleChange}
      />
      <ComboBox name="category"/>
        </Form> */}
     
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={products.length}
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
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onClick={(event) => handleClick(event, row.id)}
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row['PRODUCT NAME']}
                    </TableCell>
                    <TableCell align="right">{row.CATEGORY}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row['Sale Price']}</TableCell>
                    <TableCell align="right">{row.STOCK}</TableCell>
                    <TableCell align="right">{row.STATUS}</TableCell>
                    <TableCell align="right">{row.View}</TableCell>
                    <TableCell align="right">
                    <Switch checked={row.PUBLISHED} onChange={handlePublishedChange} id={row.id}/>
                      </TableCell>
                    <TableCell align="right">{row.ACTIONS}</TableCell>

                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
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
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
