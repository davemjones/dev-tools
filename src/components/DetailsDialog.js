import React from "react";
import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


const DetailsDialog = (props) => {
  const { handleClose, open, data } = props;
  const details = data.data;
  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth={false}>
      <DialogTitle>Details</DialogTitle>
      <DialogContent>
        <DialogContentText>{[...new Array(50)].map(() => details)}</DialogContentText>
      </DialogContent>
      <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
    </Dialog>
  );
};

export default DetailsDialog;
