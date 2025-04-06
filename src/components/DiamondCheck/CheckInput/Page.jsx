import DiamondCheckInputForm from "./Form.jsx";
import { Box } from "@mui/material";

const DiamondCheckInputPage = () => {
  return (
    <Box
      style={{
        display: "flex",
        //justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "100px",
        height: "calc(100vh - 320px)",
      }}
    >
      <Box style={{ margin: "auto 0" }}>
        <DiamondCheckInputForm />
      </Box>
    </Box>
  );
};

export default DiamondCheckInputPage;
