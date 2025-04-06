import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import proportionsPic from "../../../assets/images/proportions.png";
import clarityPic from "../../../assets/images/clarity.png";

const DiamondDetails = ({
  certificateDate,
  certificateId,
  shape,
  carat,
  color,
  clarity,
  cut,
  cut_score,
  polish,
  symmetry,
  fluorescence,
  clarityCharacteristic,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const formattedDate = formatDate(certificateDate);

  return (
    <Box sx={{ marginRight: "50px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Diamond Details
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: "white",
        }}
      >
        <Grid item xs={12} md={6}>
          <Box>
            <Box
              sx={{
                bgcolor: "#3c5474",
                borderRadius: "8px",
                border: "1px solid",
                p: 1,
              }}
            >
              <Typography fontWeight="bold" color="#ffffff" fontSize="14px">
                CERTIFICATE REPORT DETAILS
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginTop="15px"
            >
              <Typography color="#9095a0" fontSize="16px">
                Certificate Date
              </Typography>
              <Typography color="#171a1f" fontSize="16px">
                {formattedDate}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginTop="10px"
            >
              <Typography color="#9095a0" fontSize="16px">
                Certificate Report Number
              </Typography>
              <Typography color="#171a1f" fontSize="16px">
                {certificateId}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginTop="10px"
            >
              <Typography color="#9095a0" fontSize="16px">
                Shape
              </Typography>
              <Typography color="#171a1f" fontSize="16px">
                {shape}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                bgcolor: "#3c5474",
                borderRadius: "8px",
                border: "1px solid",
                p: 1,
                mt: 2,
              }}
            >
              <Typography fontWeight="bold" color="#ffffff" fontSize="14px">
                GRADING RESULTS
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginTop="15px"
            >
              <Typography color="#9095a0" fontSize="16px">
                Carat Weight
              </Typography>
              <Typography color="#171a1f" fontSize="16px">
                {carat}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginTop="10px"
            >
              <Typography color="#9095a0" fontSize="16px">
                Color Grade
              </Typography>
              <Typography color="#171a1f" fontSize="16px">
                {color}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginTop="10px"
            >
              <Typography color="#9095a0" fontSize="16px">
                Clarity Grade
              </Typography>
              <Typography color="#171a1f" fontSize="16px">
                {clarity}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginTop="10px"
            >
              <Typography color="#9095a0" fontSize="16px">
                Cut Grade
              </Typography>
              <Typography color="#171a1f" fontSize="16px">
                {cut}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginTop="10px"
            >
              <Typography color="#9095a0" fontSize="16px">
                Cut Score
              </Typography>
              <Typography color="#171a1f" fontSize="16px">
                {cut_score}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                bgcolor: "#3c5474",
                borderRadius: "8px",
                border: "1px solid",
                p: 1,
                mt: 2,
              }}
            >
              <Typography fontWeight="bold" color="#ffffff" fontSize="14px">
                ADDITIONAL GRADING INFORMATION
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginTop="15px"
            >
              <Typography color="#9095a0" fontSize="16px">
                Polish
              </Typography>
              <Typography color="#171a1f" fontSize="16px">
                {polish}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginTop="10px"
            >
              <Typography color="#9095a0" fontSize="16px">
                Symmetry
              </Typography>
              <Typography color="#171a1f" fontSize="16px">
                {symmetry}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginTop="10px"
            >
              <Typography color="#9095a0" fontSize="16px">
                Fluorescence
              </Typography>
              <Typography color="#171a1f" fontSize="16px">
                {fluorescence}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginTop="10px"
            >
              <Typography color="#9095a0" fontSize="16px">
                Clarity Characteristics
              </Typography>
              <Typography color="#171a1f" fontSize="16px">
                Crystal, Feather, Needle, Pinpoint
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginTop="10px"
            >
              <Typography color="#9095a0" fontSize="16px">
                Comments
              </Typography>
              <Typography color="#171a1f" fontSize="16px">
                Clouds are not shown.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              bgcolor: "#3c5474",
              borderRadius: "8px",
              border: "1px solid",
              p: 1,
              mb: 2,
            }}
          >
            <Typography fontWeight="bold" color="#ffffff" fontSize="14px">
              PROPORTIONS
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <img
              src={proportionsPic}
              alt="Proportions"
              style={{ height: "250px" }}
            />
          </Box>
          <Box
            sx={{
              bgcolor: "#3c5474",
              borderRadius: "8px",
              border: "1px solid",
              p: 1,
              mb: 2,
            }}
          >
            <Typography fontWeight="bold" color="#ffffff" fontSize="14px">
              CLARITY CHARACTERISTICS
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={clarityPic} alt="Clarity" style={{ height: "220px" }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DiamondDetails;
