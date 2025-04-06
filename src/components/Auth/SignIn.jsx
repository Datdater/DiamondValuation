import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { login } from "../../redux/authSlice";
import { clearMessage, setMessage } from "../../redux/messageSlide";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import UICircularIndeterminate from "../UI/CircularIndeterminate";
import logo from "../../assets/images/logo (1).png";
import ForgotPasswordDialog from "./ForgotPassword.jsx";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { beURL } from "../../services/config.js";

export default function SignIn({ open, onClose }) {
  const navigate = useNavigate();
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    if (forgotPasswordOpen) {
      console.log(
        "Forgot Password dialog is open, now closing Sign In dialog...",
      );
      if (typeof onClose === "function") {
        // onClose(); // Close the Sign In dialog
      }
    }
  }, [forgotPasswordOpen, onClose]);

  const initialValues = {
    usernameOrEmail: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    usernameOrEmail: Yup.string().required("Username or Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (formValues) => {
    const { usernameOrEmail, password } = formValues;
    setLoading(true);

    try {
      const user = await dispatch(
        login({ usernameOrEmail, password }),
      ).unwrap();
      //await dispatch(login({ usernameOrEmail, password })).unwrap();
      setLoading(false);
      console.log("User data:", user);
      if (user?.user.account.role !== "CUSTOMER") {
        toast.error("You are not authorized to log in", {
          position: "bottom-right",
        });
        return;
      }

      toast.success("Login successful", {
        position: "bottom-right",
      });
      navigate("/", { replace: true });
      if (typeof onClose === "function") {
        onClose(); // Safeguard: Close the dialog on successful login only if onClose is defined
      }
    } catch (error) {
      setLoading(false);
      console.error("Login failed:", error.message);
      if (error.response && error.response.data.message) {
        const errorMessage = error.response.data.message;
        dispatch(setMessage(errorMessage)); // Set new error message
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleLogin,
  });

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handleForgotPasswordClick = () => {
    console.log("Attempting to open Forgot Password dialog...");
    setForgotPasswordOpen(true); // Open the Forgot Password dialog
    console.log("Forgot Password dialog state set to open");
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const decoded = jwtDecode(token);
      const response = await fetch(`${beURL}auth/google-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      localStorage.setItem("auth", JSON.stringify(data));
      console.log("Google login response:", data);
      if (response.ok) {
        // Handle success: dispatch login action with user data
        console.log("Login successful:", data);
        await dispatch(login({ user: data })).unwrap(); // Dispatch login action with user data
        onClose(); // Close the dialog
        toast.success("Login successful", {
          position: "bottom-right",
        });
        navigate("/", { replace: true });
      } else {
        // Handle error: show message, navigate, etc.
        if (
          response.status === 404 ||
          response.status === 401 ||
          response.status === 403 ||
          response.status === 500
        ) {
          // Email not found, navigate to register page
          toast.info("Email not found, please register", {
            position: "bottom-right",
          });
          navigate("/registerbygoogle", {
            state: {
              email: decoded.email,
            },
          });
          onClose();
        } else {
          dispatch(setMessage(data.message || "Login failed"));
          toast.error("Login failed", {
            position: "bottom-right",
          });
        }
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      dispatch(setMessage("Login failed"));
      toast.error("Login failed", {
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                margin: "10px 0px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "65px",
                  height: "50px",
                  objectFit: "cover",
                }}
              />
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  fullWidth
                  id="usernameOrEmail"
                  type="text"
                  name="usernameOrEmail"
                  label="Username or Email"
                  value={formik.values.usernameOrEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.usernameOrEmail &&
                    Boolean(formik.errors.usernameOrEmail)
                  }
                  helperText={
                    formik.touched.usernameOrEmail &&
                    formik.errors.usernameOrEmail
                  }
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    {message && (
                      <Typography
                        color="error"
                        fontStyle="italic"
                        fontSize="13px"
                        sx={{ ml: 2 }}
                      >
                        **{message}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                >
                  {loading && <UICircularIndeterminate color={"secondary"} />}
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Typography
                      variant="body2"
                      onClick={handleForgotPasswordClick}
                      style={{ cursor: "pointer" }}
                      color="primary"
                    >
                      Forgot password?
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Link
                      to={"/register"}
                      replace={true}
                      eariant="body2"
                      onClick={onClose}
                      color="primary"
                    >
                      <Typography
                        style={{ cursor: "pointer" }}
                        color="primary"
                        variant="body2"
                      >
                        Don't have an account? Sign Up
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                    style={{ width: "100%" }}
                  />
                </Box>
              </Box>
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" size="small">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <ForgotPasswordDialog
        open={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
      />
    </>
  );
}
