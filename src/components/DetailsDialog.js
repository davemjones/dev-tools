import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DetailsDialog = (props) => {
  const { handleClose, open, data } = props;
  
  const isDetailsArray = Array.isArray(data.data);
  const isDetailsObject =
    !Array.isArray(data.data) && typeof data.data === "object";
  let details = [];
  if (isDetailsObject) {
    Object.keys(data.data).forEach((key) => {
      details.push(`${key}: ${data.data[key]}`);
    });
  } else {
    details = data.data;
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth={false}
      scroll="paper"
    >
      <DialogTitle>Details</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>{details}</DialogContentText> */}
        {isDetailsArray || isDetailsObject ? (
          details.map((x, idx) => (
            <DialogContentText key={idx}>{x}</DialogContentText>
          ))
        ) : (
          <div>{details}</div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailsDialog;
