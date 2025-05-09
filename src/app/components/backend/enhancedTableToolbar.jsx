import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { alpha } from "@mui/material/styles";
import PropTypes from "prop-types";
import { usePathname } from "next/navigation";
import { deleteProductAttributeValue } from "@/app/lib/actions";
import { useRouterRefreshContext } from "@/app/context/routerRefresh";
import { deleteProductAttribute, deleteProductCoupon } from "@/app/lib/actions";

const EnhancedTableToolbar = (props) => {
  const { numSelected, heading, selected, attributeId, setSelected, action } =
    props;
  const { refresh, setRefresh } = useRouterRefreshContext();
  const pathname = usePathname();

  const handleDelete = () => {
    try {
      switch (action) {
        case "deleteAttribute": {
          if (attributeId) {
            const response = async () => {
              const deleteProductAttributeValueResponse =
                await deleteProductAttributeValue({
                  attribute_id: attributeId,
                  attribute_value_id_array: selected,
                });
              if (deleteProductAttributeValueResponse.status !== 200) return;
              setRefresh(!refresh);
              setSelected([]);
            };

            response();
          } else {
            const response = async () => {
              const deleteProductAttributeResponse =
                await deleteProductAttribute({
                  attribute_id_array: selected,
                });
              if (deleteProductAttributeResponse.status !== 200) return;
              setRefresh(!refresh);
              setSelected([]);
            };
            response();
          }
          break;
        }
        case "deleteCoupon": {
          const response = async () => {
            const deleteResponse = await deleteProductCoupon({
              coupon_value_id_array: selected,
              pathname: pathname,
            });
            if (deleteResponse.status !== 200) return;
            setSelected([]);
          };
          response();
          break;
        }
        case "deleteClient":
          {
            console.log(
              "I don't think it is a good Idea, let a client delete their account",
              selected
            );
            setSelected([]);
          }
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {heading}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon onClick={handleDelete} />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
        // <Tooltip title="Filter list">
        //   <IconButton>
        //     <FilterListIcon />
        //   </IconButton>
        // </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
