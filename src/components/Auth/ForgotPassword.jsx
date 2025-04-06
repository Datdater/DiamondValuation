import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../redux/messageSlide";
import { forgotPassword } from "../../services/api.js";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ForgotPasswordDialog({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await forgotPassword(values.email);
        setLoading(false);
        dispatch(setMessage("Please check your email to verify."));
        //onClose(); // Đóng hộp thoại sau khi hoàn thành
      } catch (error) {
        setLoading(false);
        console.error("Forgot password failed:", error.message);
        dispatch(
          setMessage("Cannot found account with this email. Please try again."),
        );
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Please enter email</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{
              width: "400px",
            }}
          />
          <Grid item>
            {message && (
              <Typography color="blue" fontStyle="italic" fontSize="13px">
                {message}
              </Typography>
            )}
          </Grid>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={loading}>
              {loading ? "Sending..." : "Verify"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
