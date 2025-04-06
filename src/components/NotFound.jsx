// src/components/NotFound.jsx
import React from "react";
import { Box, Button, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import notFoundImage from "../assets/images/notFoundImage.jpg";

const NotFound = () => {
  return (
    <Container sx={{ textAlign: "center", mt: 1, height: "520px" }}>
      <Box display="flex" justifyContent="center" alignContent="center">
        <img
          src={notFoundImage}
          alt="404 Not Found"
          style={{ width: "600px", height: "auto" }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/"
        sx={{ mb: 4 }}
      >
        Go to Homepage
      </Button>
    </Container>
  );
};

export default NotFound;
