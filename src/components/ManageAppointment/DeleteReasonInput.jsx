import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const DeleteReasonInput = ({
  deleteReason,
  setDeleteReason,
  customReason,
  setCustomReason,
}) => {
  const handleChange = (event) => {
    const { value } = event.target;
    setDeleteReason(value);
    if (value !== "Other") {
      setCustomReason(""); // Clear the custom reason if not "Other"
    }
  };

  const handleCustomReasonChange = (event) => {
    setCustomReason(event.target.value);
  };

  return (
    <FormControl
      fullWidth
      margin="normal"
      sx={{ ml: 2, mr: 2, width: "400px" }}
    >
      <InputLabel id="delete-reason-label">Reason</InputLabel>
      <Select
        labelId="delete-reason-label"
        id="delete-reason"
        value={deleteReason}
        onChange={handleChange}
        label="Reason"
      >
        <MenuItem value="I want to change service">
          I want to change service
        </MenuItem>
        <MenuItem value="I want to change amount of diamond">
          I want to change amount of diamond
        </MenuItem>
        <MenuItem value="I want to change information">
          I want to change information
        </MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </Select>
      {deleteReason === "Other" && (
        <TextField
          fullWidth
          margin="normal"
          value={customReason}
          onChange={handleCustomReasonChange}
          label="Please tell us your reason"
        />
      )}
    </FormControl>
  );
};

export default DeleteReasonInput;
