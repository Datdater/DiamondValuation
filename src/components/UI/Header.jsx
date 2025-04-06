import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import SignIn from "../Auth/SignIn";
import { logout } from "../../redux/authSlice";
import Typography from "@mui/material/Typography";
import logo from "../../assets/images/logo (1).png";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../services/firebase.js";
import Avatar from "@mui/material/Avatar";
import { toast } from "react-toastify";
import NotificationMenu from "../Notification/Menu.jsx";
import { useQuery } from "@tanstack/react-query";
import { getCustomer } from "../../services/api.js";
import UICircularIndeterminate from "./CircularIndeterminate.jsx";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileEl, setProfileEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  console.log("currentUser", currentUser);

  const getAvatarDownloadURL = async () => {
    // Check if currentUser.avatar exists and is a valid URL
    if (currentUser && currentUser.avatar) {
      // Assuming currentUser.avatar is a direct URL
      return currentUser.avatar;
    } else {
      // Fallback to fetching from Firebase Storage if no direct URL is available
      const storageRef = ref(storage, `account/${currentUser.account.id}/`);
      try {
        const url = await getDownloadURL(storageRef);
        return url;
      } catch (error) {
        console.error("Error getting avatar download URL:", error);
        return ""; // Return an empty string or handle error as needed
      }
    }
  };

  const { data: customer, isLoading: isCustomerLoading } = useQuery({
    queryKey: ["customer"],
    queryFn: () => getCustomer(currentUser?.id),
  });

  if (isCustomerLoading) {
    <UICircularIndeterminate />;
  }

  console.log("customer", customer);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const openMenu = Boolean(anchorEl);
  const openProfileMenu = Boolean(profileEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setProfileEl(null);
  };

  const handleMenuItemClick = (text) => {
    setSelectedItem(text);
    handleClose();
    switch (text) {
      case "Diamond CheckInput":
        navigate("/check");
        break;
      case "Diamond Calculate":
        navigate("/calculate");
        break;
      case "Rules":
        navigate("/rules");
        break;
      case "Price":
        navigate("/price");
        break;
      case "HOME":
        navigate("/");
        break;
      case "ABOUT":
        navigate("/about");
        break;

      case "BLOG":
        navigate("/blog");
        break;
      case "Appointment":
        if (!currentUser) {
          setShowAppointmentDialog(true);
        } else {
          navigate("/appointment");
        }
        break;
      case "Register":
        navigate("/register");
        break;
      case "Profile":
        navigate("/profile");
        break;
      case "Appointments":
        navigate("/appointments");
        break;
      case "Logout":
        dispatch(logout());
        toast.success("Logout successful!", {
          position: "bottom-right",
        });
        navigate("/");
        break;
      default:
        break;
    }
  };

  const handleProfileClick = (event) => {
    setProfileEl(event.currentTarget);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "10px 60px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        position: "fixed",
        width: "100%",
        backgroundColor: "#fff",
        zIndex: 1000,
        justifyItems: "center",
      }}
    >
      <Box
        sx={{
          height: 45,
          width: 45,
          bgcolor: "white",
          borderRadius: "50%",
          position: "relative",
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{
            display: "block",
            width: "auto",
            height: "100%",
            objectFit: "contain",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Box>
      <Typography
        noWrap
        component="div"
        sx={{ ml: 1, fontWeight: 800, fontSize: 14, color: "#3e6272" }}
      >
        H&T Diamond
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", flex: 1, gap: 3 }}>
        <Button
          onClick={() => handleMenuItemClick("HOME")}
          sx={{
            color: "#3e6272",
            textTransform: "none",
            fontSize: 16,
            "&:hover": {
              color: "#000",
            },
          }}
        >
          HOME
        </Button>
        <Button
          onClick={() => handleMenuItemClick("ABOUT")}
          sx={{
            color: "#3e6272",
            textTransform: "none",
            fontSize: 16,
            "&:hover": {
              color: "#000",
            },
          }}
        >
          ABOUT
        </Button>
        <Button
          onClick={handleClick}
          sx={{
            color: "#3e6272",
            textTransform: "none",
            fontSize: 16,
            "&:hover": {
              color: "#000",
            },
          }}
          endIcon={openMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          SERVICE
        </Button>
        <Menu anchorEl={anchorEl} open={openMenu} onClose={handleClose}>
          <MenuItem
            selected={selectedItem === "Diamond CheckInput"}
            onClick={() => handleMenuItemClick("Diamond CheckInput")}
          >
            Diamond Check
          </MenuItem>
          <MenuItem
            selected={selectedItem === "Diamond Calculate"}
            onClick={() => handleMenuItemClick("Diamond Calculate")}
          >
            Diamond Calculate
          </MenuItem>
          <MenuItem
            selected={selectedItem === "Price"}
            onClick={() => handleMenuItemClick("Price")}
          >
            Service Price
          </MenuItem>
          <MenuItem
            selected={selectedItem === "Rules"}
            onClick={() => handleMenuItemClick("Rules")}
          >
            Rules
          </MenuItem>
        </Menu>

        <Button
          onClick={() => handleMenuItemClick("BLOG")}
          sx={{
            color: "#3e6272",
            textTransform: "none",
            fontSize: 16,
            "&:hover": {
              color: "#000",
            },
          }}
        >
          BLOG
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={() => handleMenuItemClick("Appointment")}
          variant="outlined"
          sx={{
            borderColor: "#98690c8a",
            color: "#98690c",
            fontSize: 16,
            borderRadius: 1,
            textTransform: "none",
            px: 2,
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
            "&:active": {
              backgroundColor: "#ddd",
            },
          }}
        >
          Appointment
        </Button>
        {currentUser ? (
          <>
            <NotificationMenu />
            <Button
              onClick={handleProfileClick}
              sx={{
                color: "#3e6272",
                borderRadius: 5,
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
                "&:active": {
                  backgroundColor: "#ddd",
                },
              }}
            >
              {/*<Avatar*/}
              {/*  alt={currentUser ? currentUser.authID : ""}*/}
              {/*  src={avatarURL ? avatarURL : ""}*/}
              {/*/>*/}
              <Avatar alt="avatar" src={customer?.avatar} />
            </Button>
            <Menu
              anchorEl={profileEl}
              open={openProfileMenu}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleMenuItemClick("Profile")}>
                <Box mr={1}>
                  <PermIdentityOutlinedIcon />
                </Box>
                Profile
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("Appointments")}>
                <Box mr={1}>
                  <AccountBoxOutlinedIcon />
                </Box>
                Appointments
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("Logout")}>
                <Box mr={1}>
                  <LogoutOutlinedIcon />
                </Box>
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button
              onClick={handleDialogOpen}
              sx={{
                color: "#3e6272",
                minWidth: 50,
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
                "&:active": {
                  backgroundColor: "#ddd",
                },
              }}
            >
              SIGN IN
            </Button>
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
        )}
      </Box>
    </Box>
  );
}
