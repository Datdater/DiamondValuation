import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import proportionsPic from "../../assets/images/proportions.png";
import clarityPic from "../../assets/images/clarity.png";

const ItemDetailsDialog = ({
  certificateDate,
  certificateId,
  shape,
  caratWeight,
  color,
  clarity,
  cut,
  cutScore,
  polish,
  symmetry,
  fluorescence,
  open,
  onClose,
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
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth="md" // Set your desired max width here
      sx={{ "& .MuiDialog-paper": { width: "100%", maxWidth: "900px" } }}
    >
      <DialogTitle>
        <Typography align="center" fontSize="20px">
          Diamond Details
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: "8px",
            top: "8px",
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          position="relative"
          display="flex"
          height="550px"
          bgcolor="#fefeff"
          borderRadius="4px"
          marginRight={4}
          p={2}
        >
          <Box
            position="relative" // Adjusted to relative to contain absolute children
            width="50%" // Set width to 50% for half of the container
            mr={2} // Margin right for spacing between left and right sections
          >
            <Box
              position="absolute"
              left={0}
              top={0}
              width="350px"
              height="32px"
              bgcolor="#3c5474"
              borderRadius="8px"
              border="1px solid"
              p={1}
            >
              <Typography
                position="absolute"
                top="6px"
                left="10px"
                fontWeight="bold"
                color="#ffffff"
                fontSize="13px"
              >
                CERTIFICATE REPORT DETAILS
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop="32px"
              >
                <Typography color="#9095a0" fontSize="13px">
                  Certificate Date
                </Typography>
                <Typography color="#171a1f" fontSize="13px">
                  {formattedDate}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop="10px"
              >
                <Typography color="#9095a0" fontSize="13px">
                  Certificate Report Number
                </Typography>
                <Typography color="#171a1f" fontSize="13px">
                  {certificateId}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop="10px"
              >
                <Typography color="#9095a0" fontSize="13px">
                  Shape
                </Typography>
                <Typography color="#171a1f" fontSize="13px">
                  {shape}
                </Typography>
              </Box>
            </Box>
            <Box
              position="absolute"
              top="130px"
              left="0"
              width="350px"
              height="32px"
              bgcolor="#3c5474"
              borderRadius="5px"
              border="1px solid"
              p={1}
            >
              <Typography
                position="absolute"
                top="6px"
                left="10px"
                fontWeight="bold"
                color="#ffffff"
                fontSize="13px"
              >
                GRADING RESULTS
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop="35px"
              >
                <Typography color="#9095a0" fontSize="13px">
                  Carat Weight
                </Typography>
                <Typography color="#171a1f" fontSize="13px">
                  {caratWeight}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop="10px"
              >
                <Typography color="#9095a0" fontSize="13px">
                  Color Grade
                </Typography>
                <Typography color="#171a1f" fontSize="13px">
                  {color}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop="10px"
              >
                <Typography color="#9095a0" fontSize="13px">
                  Clarity Grade
                </Typography>
                <Typography color="#171a1f" fontSize="13px">
                  {clarity}
                </Typography>
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop="10px"
              >
                <Typography color="#9095a0" fontSize="13px">
                  Cut Grade
                </Typography>
                <Typography color="#171a1f" fontSize="13px">
                  {cut}
                </Typography>
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop="10px"
              >
                <Typography color="#9095a0" fontSize="13px">
                  Cut Score
                </Typography>
                <Typography color="#171a1f" fontSize="13px">
                  {cutScore}
                </Typography>
              </Box>
            </Box>
            <Box
              position="absolute"
              top="330px"
              left="0"
              width="350px"
              height="32px"
              bgcolor="#3c5474"
              borderRadius="8px"
              border="1px solid"
              p={1}
            >
              <Typography
                position="absolute"
                top="6px"
                left="10px"
                fontWeight="bold"
                color="#ffffff"
                fontSize="13px"
              >
                ADDITIONAL GRADING INFORMATION
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop="35px"
              >
                <Typography color="#9095a0" fontSize="13px">
                  Polish{" "}
                </Typography>
                <Typography color="#171a1f" fontSize="13px">
                  {polish}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop="10px"
              >
                <Typography color="#9095a0" fontSize="13px">
                  Symmetry{" "}
                </Typography>
                <Typography color="#171a1f" fontSize="13px">
                  {symmetry}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop="10px"
              >
                <Typography color="#9095a0" fontSize="13px">
                  Fluorescence{" "}
                </Typography>
                <Typography color="#171a1f" fontSize="13px">
                  {fluorescence}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop="10px"
              >
                <Typography color="#9095a0" fontSize="13px">
                  Clarity Characteristics{" "}
                </Typography>
                <Typography color="#171a1f" fontSize="13px">
                  Crystal, Feather, Needle, Pinpoint
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop="10px"
              >
                <Typography color="#9095a0" fontSize="13px">
                  Comments{" "}
                </Typography>
                <Typography color="#171a1f" fontSize="13px">
                  Clouds are not shown.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            position="relative" // Adjusted to relative to contain absolute children
            width="50%" // Set width to 50% for half of the container
          >
            <Box>
              <Box
                position="absolute"
                left="0"
                width="350px"
                height="32px"
                bgcolor="#3c5474"
                borderRadius="8px"
                border="1px solid"
                p={1}
              >
                <Typography
                  position="absolute"
                  top="6px"
                  left="10px"
                  fontWeight="bold"
                  color="#ffffff"
                  fontSize="13px"
                >
                  PROPORTIONS
                </Typography>
              </Box>
              <Box position="absolute" top="40px">
                <img src={proportionsPic} alt="proportion" />
              </Box>
            </Box>
            <Box>
              <Box
                position="absolute"
                top="290px"
                left="0"
                width="350px"
                height="32px"
                bgcolor="#3c5474"
                borderRadius="8px"
                border="1px solid"
                p={1}
              >
                <Typography
                  position="absolute"
                  top="6px"
                  left="10px"
                  fontWeight="bold"
                  color="#ffffff"
                  fontSize="13px"
                >
                  CLARITY CHARACTERISTICS
                </Typography>
              </Box>
              <Box position="absolute" top="360px">
                <img src={clarityPic} alt="clarity" />
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDetailsDialog;
