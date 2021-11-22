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
import { Button } from "@mui/material";
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
        backgroundColor: "#eda624",
      },
      "& .data-muiDataGrid-console-error": {
        backgroundColor: "#6a0000",
        color: 'azure',
        '&:hover': {
          backgroundColor: 'lightgray',
          color: "#6a0000"
        }
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
  { field: "data", headerName: "Entry", flex: 1 },
];

const Console = (props) => {
  const { data, handleClearData } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [clickedRow, setClickedRow] = useState("");

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
      <GridToolBarClear />
    </GridToolbarContainer>
  );
  const classes = useStyles();

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
