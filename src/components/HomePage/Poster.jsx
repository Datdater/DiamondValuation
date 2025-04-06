import { Box } from "@mui/material";
import diamond from "../../assets/images/poster.jpg";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import SignIn from "../Auth/SignIn.jsx";

export default function Poster() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate(); // Initialize navigate function from useNavigate

  const handleCreateAppointment = () => {
    if (!currentUser) {
      setShowAppointmentDialog(true);
    } else {
      navigate("/appointment");
    }
  };
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "560px",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "17%",
            left: "8%",
            transform: "translate(-50%, -50%)",
            //textAlign: "center",
            zIndex: 1,
          }}
        >
          <Box sx={{ width: "500px", position: "absolute" }}>
            <Typography
              sx={{ color: "white", fontSize: "32px", fontWeight: "bold" }}
            >
              We have experience and insider knowledge of the industry.
            </Typography>
            <Typography sx={{ color: "white", fontSize: "17px" }}>
              Our team of diamond experts has helped over 71,318 shoppers find
              the right conflict-free diamond with our comprehensive guides and
              offering honest and unbiased advice by answering your questions.
              We will help you sift through hundreds of thousands of loose
              diamonds online in order to find the one that best fits your
              needs.
            </Typography>
            <Button
              sx={{
                position: "absolute",
                marginLeft: "40px",
                marginTop: "15px",
                color: "white",
                borderRadius: "8px",
                width: "150px",
                border: "1px solid white",
              }}
            >
              <Link
                to="/about"
                style={{
                  textDecoration: "none",
                  //color: "#9095a0",
                  cursor: "pointer",
                }}
              >
                MORE ABOUT US
              </Link>
            </Button>
            <Button
              onClick={handleCreateAppointment}
              sx={{
                position: "absolute",
                marginLeft: "210px",
                marginTop: "15px",
                color: "white",
                borderRadius: "8px",
                width: "200px",
                border: "1px solid white",
              }}
            >
              NEW APPOINTMENT{" "}
              <ArrowForwardIosIcon
                sx={{ fontSize: "13px", marginLeft: "5px" }}
              />
            </Button>
          </Box>
        </Box>

        <Box
          component="img"
          src={diamond}
          alt="Diamond"
          sx={{
            position: "absolute",
            height: "555px",
            width: "100%",
            zIndex: 0, // Ensure the image is behind the button
          }}
        />
      </Box>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogContent>
          <SignIn open={openDialog} onClose={handleDialogClose} />
        </DialogContent>
      </Dialog>
      <Dialog
        open={showAppointmentDialog}
        onClose={() => setShowAppointmentDialog(false)}
      >
        <DialogContent sx={{ textAlign: "center" }}>
          <div>
            <p>You need to sign in to create an Appointment!</p>
            <Button
              onClick={() => {
                setShowAppointmentDialog(false);
                handleDialogOpen();
              }}
            >
              Sign In
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
