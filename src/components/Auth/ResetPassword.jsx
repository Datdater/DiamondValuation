import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { setMessage } from "../../redux/messageSlide.js";
//import { setSignInDialogOpen } from "../../redux/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { beURL } from "../../services/config.js";

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .test(
      "len",
      "The password must be between 6 and 20 characters.",
      (val) => val && val.toString().length >= 6 && val.toString().length <= 20,
    )
    .required("New password is required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required!"),
});

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await fetch(
          `${beURL}auth/reset-password?token=${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ newPassword: values.newPassword }),
          },
        );

        let data;
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          data = await response.text();
        }

        if (!response.ok) {
          throw new Error(data);
        }

        dispatch(setMessage(data?.message || "Password reset successful."));
        setOpen(false);
        navigate("/");
        // dispatch(setSignInDialogOpen(true)); // Open sign-in dialog
        toast.success(data?.message || "Password reset successful.", {
          position: "bottom-right",
        });
      } catch (error) {
        console.error("Error resetting password:", error.message);
        dispatch(setMessage("Failed to reset password."));
        toast.error("Failed to reset password.", {
          position: "bottom-right",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent>
        <Typography>Please enter your new password below.</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="newPassword"
            label="New Password"
            type="password"
            fullWidth
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <TextField
            margin="dense"
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPassword;
