import { Box, Button } from "@mui/material";

// eslint-disable-next-line react/prop-types
const OriginButton = ({ onClick, buttonName, icon, state, setState }) => {
  return (
    <Button
      onClick={() => {
        onClick(setState, buttonName);
      }}
      sx={{
        width: 175,
        height: 37,
        position: "absolute",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "6px",
        backgroundColor:
          state[buttonName] === "clicked" ? "#4F46E5" : "#f5f5f5",
        ":hover": { bgcolor: "#4F46E5", color: "white" },
        fontFamily: "Inter-Regular, Helvetica",
        color: state[buttonName] === "clicked" ? "white" : "#171a1f",
        fontSize: 12,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "5%",
          height: "20%",
          top: 8,
          left: 10,
        }}
      >
        {icon}
      </Box>
      {buttonName.toUpperCase()}
    </Button>
  );
};

export default OriginButton;
