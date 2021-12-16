import React, { useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import DetailsDialog from "./DetailsDialog";

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) => ({
    root: {
      "& .data-muiDataGrid-console-log": {
        backgroundColor: "azure",
      },
      "& .data-muiDataGrid-console-warn": {
        backgroundColor: ({ colorized }) => (colorized ? "#eda624" : "inherit"),
      },
      "& .data-muiDataGrid-console-error": {
        backgroundColor: ({ colorized }) => (colorized ? "#6a0000" : "inherit"),
        color: ({ colorized }) => (colorized ? "azure" : "inherit"),
        "&:hover": {
          backgroundColor: ({ colorized }) =>
            colorized ? "lightgray" : "inherit",
          color: ({ colorized }) => (colorized ? "#6a0000" : "inherit"),
        },
      },
      "& .MuiFormGroup-root": {
        padding: "4px 10px",
      },
      "& .MuiFormControlLabel-label": {
        color: "#009be5",
        fontSize: "small",
      },
    },
  }),
  { defaultTheme }
);

const columns = [
  { field: "type", headerName: "Type" },
  {
    field: "timestamp",
    headerName: "Timestamp",
    width: 200,
    valueGetter: (params) => new Date(params.value).toJSON(),
  },
  {
    field: "data",
    headerName: "Entry",
    flex: 1,
    valueGetter: (params) => {
      // check to see if the value is an object
      if (typeof params.value === "object" && !Array.isArray(params.value)) {
        return JSON.stringify(params.value, null, 2);
      }
      return params.value;
    },
  },
];

const Console = (props) => {
  const { data, handleClearData } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [clickedRow, setClickedRow] = useState("");
  const [colorized, setColorized] = useState(true);

  const GridToolBarColorToggle = () => (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={colorized}
            onChange={(e) => setColorized(e.target.checked)}
            size="small"
          />
        }
        label="Colorize Rows"
      />
    </FormGroup>
  );

  const GridToolBarClear = () => (
    <Button
      onClick={handleClearData}
      sx={{ marginLeft: "auto" }}
      startIcon={<ClearAllIcon />}
    >
      Clear
    </Button>
  );

  const ConsoleToolBar = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <GridToolBarColorToggle />
      <GridToolBarClear />
    </GridToolbarContainer>
  );
  const classes = useStyles({ colorized });

  return (
    <>
      <DataGrid
        className={classes.root}
        rows={data}
        density="compact"
        columns={columns}
        checkboxSelection
        rowHeight={30}
        disableSelectionOnClick
        onCellDoubleClick={(params) => {
          if (params.field !== "__checked__") {
            setClickedRow(params.row);
            setOpenDialog(true);
          }
        }}
        components={{
          Toolbar: ConsoleToolBar,
        }}
        getRowClassName={(params) =>
          `data-muiDataGrid-console-${
            params.row.type ? params.row.type : "default"
          }`
        }
      />
      <DetailsDialog
        handleClose={() => setOpenDialog(false)}
        open={openDialog}
        data={clickedRow}
      />
    </>
  );
};

export default Console;
