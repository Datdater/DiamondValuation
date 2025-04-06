import React from "react";
import { Button } from "@mui/material";

const ShapeButton = ({ buttonName, onClick, state, setState }) => {
  return (
    <Button
      onClick={() => {
        onClick(setState, buttonName);
      }}
      sx={{
        width: 71,
        height: 33,
        position: "absolute",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "6px",
        backgroundColor:
          state[buttonName] === "clicked" ? "#4F46E5" : "#f5f5f5",
        ":hover": { bgcolor: "#4F46E5", color: "white" },
        fontFamily: "Inter-Regular,Helvetica",
        fontSize: 10,
        color: state[buttonName] === "clicked" ? "white" : "#171a1f",
      }}
    >
      {buttonName.toUpperCase()}
    </Button>
  );
};

export default ShapeButton;
