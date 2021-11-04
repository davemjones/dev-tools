import React, { useState } from "react";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { ReadMore } from "@mui/icons-material";
import { Button } from "@mui/material";
import DetailsDialog from "./DetailsDialog";

const columns = [
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

  return (
    <>
      <DataGrid
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
