import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../assets/images/logo (1).png";

import { registerByGoogle } from "../../redux/authSlice";
import { clearMessage } from "../../redux/messageSlide";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import DialogContent from "@mui/material/DialogContent";
import SignIn from "./SignIn.jsx";
import Dialog from "@mui/material/Dialog";

const defaultTheme = createTheme();

export default function RegisterByGoogle() {
  const { message } = useSelector((state) => state.message);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: location.state?.email || "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    identityDocument: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "The first name must be alphabetic.")
      .test(
        "len",
        "The first name must be between 2 and 30 characters.",
        (val) =>
          val && val.toString().length >= 2 && val.toString().length <= 30,
      )
      .required("First name is required!"),
    lastName: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "The last name must be alphabetic.")
      .test(
        "len",
        "The last name must be between 2 and 30 characters.",
        (val) =>
          val && val.toString().length >= 2 && val.toString().length <= 30,
      )
      .required("Last name is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("Email is required!"),
    phone: Yup.string()
      .test(
        "len",
        "The phone number must be 10 characters.",
        (val) => val && val.toString().length === 10,
      )
      .test("is-numbers", "Phone number must only contain numbers.", (val) => {
        return /^\d+$/.test(val);
      })
      .required("Phone number is required!"),
  });

  const handleRegister = async (formValue) => {
    const { email, firstName, lastName, phone, address, identityDocument } =
      formValue;

    try {
      const response = await dispatch(
        registerByGoogle({
          email,
          firstName,
          lastName,
          phone,
          address,
          identityDocument,
        }),
      ).unwrap();

      console.log("Response:", response);

      toast.success(
        "Register successfully! Please check your email to verify!",
        {
          position: "bottom-right",
        },
      );
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    console.log("Error:", error);
    if (error) {
      console.log(error);
      toast.info(error, {
        position: "bottom-right",
      });
    } else {
      console.error("Unexpected error:", error);
      toast.error("Registration failed. Please try again.", {
        position: "bottom-right",
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleRegister,
  });

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer containerId="register" />
      <Box
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 1,
              marginBottom: 6,
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
              Sign Up By Google
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              {({ errors, touched }) => (
                <Form>
                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="given-name"
                          name="firstName"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.firstName &&
                            Boolean(formik.errors.firstName)
                          }
                          helperText={
                            formik.touched.firstName && formik.errors.firstName
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="family-name"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.lastName &&
                            Boolean(formik.errors.lastName)
                          }
                          helperText={
                            formik.touched.lastName && formik.errors.lastName
                          }
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email"
                          name="email"
                          autoComplete="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.email && Boolean(formik.errors.email)
                          }
                          helperText={
                            formik.touched.email && formik.errors.email
                          }
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="phone"
                          label="Phone"
                          name="phone"
                          autoComplete="phone"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.phone && Boolean(formik.errors.phone)
                          }
                          helperText={
                            formik.touched.phone && formik.errors.phone
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="address"
                          label="Address"
                          name="address"
                          autoComplete="address"
                          value={formik.values.address}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="identityDocument"
                          label="Identity Document"
                          name="identityDocument"
                          autoComplete="identityDocument"
                          value={formik.values.identityDocument}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </Grid>
                    </Grid>
                    {message && (
                      <Typography
                        color={"error"}
                        fontSize={12}
                        fontStyle={"italic"}
                        sx={{ mt: 1 }}
                      >
                        **{message}
                      </Typography>
                    )}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 2, mb: 2 }}
                      onClick={formik.handleSubmit}
                    >
                      Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Button
                          variant="body2"
                          onClick={handleDialogOpen}
                          color="primary"
                        >
                          <Typography
                            style={{ cursor: "pointer" }}
                            color="primary"
                            fontSize="12px"
                          >
                            Already have an account? Sign in
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Container>
      </Box>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogContent>
          <SignIn open={openDialog} onClose={handleDialogClose} />
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
