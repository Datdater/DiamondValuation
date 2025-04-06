import React, { useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { DialogTitle, Grid, IconButton } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import {
  updateCustomerInformation,
  updateCustomerPassword,
} from "../../services/api.js";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setMessage } from "../../redux/messageSlide.js";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../services/firebase.js";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import CustomInput from "./CustomerInput.jsx";

const styles = {
  details: {
    padding: "1rem",
    borderTop: "1px solid #e1e1e1",
  },
  value: {
    padding: "1rem 2rem",
    borderTop: "1px solid #e1e1e1",
    color: "#899499",
  },
};

export default function ProfileCard(props) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    firstName: props.firstName,
    lastName: props.lastName,
    phone: props.phone,
    newEmail: props.email,
    address: props.address,
    identityDocument: props.identityDocument,
    username: props.username,
    customerID: props.customerID,
    authID: props.authID,
  });
  const [avatarChanged, setAvatarChanged] = useState(false);

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
    username: Yup.string()
      .test(
        "len",
        "The username must be between 6 and 24 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 24,
      )
      .required("Username is required!"),
    newEmail: Yup.string()
      .email("This is not a valid email.") //@gmail.com
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
    address: Yup.string().test(
      "len",
      "The address must be between 3 and 40 characters.",
      (val) => val && val.toString().length >= 3 && val.toString().length <= 40,
    ),
    identityDocument: Yup.string().test(
      "len",
      "The identity document must be 12 characters.",
      (val) => val && val.toString().length === 12,
    ),
    oldPassword: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 20 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 20,
      )
      .required("Old password is required!"),
    newPassword: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 20 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 20,
      )
      .required("New password is required!"),
  });

  const [originalUser] = useState(user);

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const fullName = `${user.firstName} ${user.lastName}`;

  const changeField = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    formik.setFieldValue(name, value);
    formik.setFieldTouched(name, true);

    // Check if avatar image is changed
    if (name === "avatar") {
      setAvatarChanged(true);
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // BUTTON STATES
  const [edit, update] = useState({
    required: true,
    disabled: true,
    isEdit: true,
  });

  const getChangedFields = () => {
    const changedFields = {};
    for (const key in user) {
      if (user[key] !== originalUser[key]) {
        changedFields[key] = user[key];
      }
    }
    return changedFields;
  };

  const handleUpdate = async () => {
    const changedFields = getChangedFields();

    try {
      if (avatarChanged && changedFields) {
        // Update both avatar and customer information
        await handleUploadAvatarImage();
        await updateCustomerInformation(user.customerID, changedFields);
        toast.dismiss();
        toast.success("Updated successfully!", {
          position: "bottom-right",
        });
      } else if (avatarChanged) {
        // Only update avatar
        await handleUploadAvatarImage();
        toast.dismiss();
        toast.success("Avatar updated successfully!", {
          position: "bottom-right",
        });
      } else if (changedFields) {
        // Only update customer information
        await updateCustomerInformation(user.customerID, changedFields);
        toast.dismiss();
        toast.success("Customer information updated successfully!", {
          position: "bottom-right",
        });
      } else {
        toast.dismiss();
        toast.info("No changes detected.", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to update customer information.", {
        position: "bottom-right",
      });
      console.error("Failed to update customer information", error);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      const response = await updateCustomerPassword(user.authID, passwords);
      if (response && response.data && response.data.message) {
        const message = response.data.message;
        dispatch(setMessage(message));
        toast.error(message, {
          position: "bottom-right",
        });
      } else {
        toast.success("Password updated successfully!", {
          position: "bottom-right",
        });
        handleClose();
        setPasswords({ oldPassword: "", newPassword: "" });
        formik.resetForm({
          values: { ...formik.values, oldPassword: "", newPassword: "" },
        });
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Failed to update password.";
      dispatch(setMessage(message));

      if (error?.response?.data?.message === "Incorrect old password") {
        toast.dismiss();
        toast.info("Incorrect old password", {
          position: "bottom-right",
        });
      } else {
        toast.dismiss();
        toast.error(message, {
          position: "bottom-right",
        });
        console.error("Failed to update password", error);
      }
    }
  };

  const changeButton = async (event) => {
    event.preventDefault();
    if (!edit.disabled) {
      await handleUpdate();
    }
    edit.disabled = !edit.disabled;
    edit.isEdit = !edit.isEdit;
    update({ ...edit });
  };

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      newEmail: user.email,
      address: user.address,
      identityDocument: user.identityDocument,
      oldPassword: "",
      newPassword: "",
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema,
    onSubmit: handleUpdate,
  });

  const handlePasswordChange = (event) => {
    formik.handleChange(event);
    setPasswords({ ...passwords, [event.target.name]: event.target.value });
  };

  // Avatar image handling
  const [avatarImage, setAvatarImage] = useState(null);
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const fileInputRef = useRef(null);

  const openFileDialog = () => {
    console.log("Attempting to open file dialog"); // Debugging log
    if (!isFileDialogOpen && fileInputRef.current) {
      console.log("File dialog is not open, opening now"); // Debugging log
      setIsFileDialogOpen(true); // Mark dialog as open
      fileInputRef.current.click(); // Trigger file dialog
    } else {
      console.log("File dialog is already open, not opening again"); // Debugging log
    }
  };

  const handleSelectAvatarImage = (e) => {
    if (e.target.files[0]) {
      setAvatarImage(e.target.files[0]);
      setAvatarChanged(true);
    }
    setIsFileDialogOpen(false); // Close file dialog after selection
  };

  const handleUploadAvatarImage = async () => {
    if (!avatarImage) return;

    const storageRef = ref(
      storage,
      `account/${user.authID}/${avatarImage.name}`,
    );
    const uploadTask = uploadBytesResumable(storageRef, avatarImage);

    try {
      await uploadTask;
      const downloadURL = await getDownloadURL(storageRef);

      const updateResponse = await updateCustomerInformation(user.customerID, {
        avatar: downloadURL,
      });
      console.log("Update response:", updateResponse.data);
      // toast.success("Avatar updated successfully", {
      //   position: "bottom-right",
      // });
    } catch (error) {
      console.error("Error uploading avatar or updating database:", error);
      toast.error("Failed to upload avatar or update database", {
        position: "bottom-right",
      });
    }
  };

  return (
    <Card variant="outlined" sx={{ height: "730px", width: "100%" }}>
      <ToastContainer />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Avatar
              sx={{ width: 100, height: 100, mb: 1.5 }}
              src={
                avatarImage ? URL.createObjectURL(avatarImage) : props.avatar
              }
            />
            {!edit.isEdit && ( // Conditionally render only when not in edit mode
              <>
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation(); // Stop event propagation
                      console.log("IconButton clicked"); // Debugging log
                      openFileDialog();
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </label>
              </>
            )}
            <input
              ref={fileInputRef}
              accept="image/*"
              style={{ display: "none" }}
              id="icon-button-file"
              type="file"
              onChange={handleSelectAvatarImage}
            />
          </Badge>
          <Typography variant="h6">{fullName}</Typography>
          <Typography>{user.username}</Typography>
        </Grid>

        <Grid item style={styles.details} sx={{ width: "100%" }}></Grid>
      </Grid>
      <CardContent
        sx={{
          p: 3,
          maxHeight: { md: "40vh" },
          textAlign: { xs: "center", md: "start" },
        }}
      >
        <FormControl fullWidth>
          <Grid
            container
            direction={{ xs: "column", md: "row" }}
            columnSpacing={5}
            rowSpacing={3}
          >
            <Grid item xs={6}>
              <CustomInput
                id="firstName"
                name="firstName"
                value={user.firstName}
                onChange={changeField}
                onBlur={formik.handleBlur}
                title="First Name"
                dis={edit.disabled}
                req={edit.required}
                error={formik.touched.firstName && !!formik.errors.firstName}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomInput
                id="lastName"
                name="lastName"
                value={user.lastName}
                onChange={changeField}
                onBlur={formik.handleBlur}
                title="Last Name"
                dis={edit.disabled}
                req={edit.required}
                error={formik.touched.lastName && !!formik.errors.lastName}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomInput
                id="phone"
                name="phone"
                value={user.phone}
                onChange={changeField}
                onBlur={formik.handleBlur}
                title="Phone Number"
                dis={edit.disabled}
                req={edit.required}
                error={formik.touched.phone && !!formik.errors.phone}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomInput
                type="address"
                id="address"
                name="address"
                value={user.address}
                onChange={changeField}
                onBlur={formik.handleBlur}
                title="Address"
                dis={edit.disabled}
                req={edit.required}
                error={formik.touched.address && !!formik.errors.address}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomInput
                type="identityDocument"
                id="identityDocument"
                name="identityDocument"
                value={user.identityDocument}
                onChange={changeField}
                onBlur={formik.handleBlur}
                title="Identity Document"
                dis={edit.disabled}
                req={edit.required}
                error={
                  formik.touched.identityDocument &&
                  !!formik.errors.identityDocument
                }
                helperText={
                  formik.touched.identityDocument &&
                  formik.errors.identityDocument
                }
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                id="newEmail"
                name="newEmail"
                value={user.newEmail}
                onChange={changeField}
                onBlur={formik.handleBlur}
                title="Email"
                dis={edit.disabled}
                req={edit.required}
                error={formik.touched.newEmail && !!formik.errors.newEmail}
                helperText={formik.touched.newEmail && formik.errors.newEmail}
              />
            </Grid>

            <Grid item xs={6}>
              <Button color="primary" onClick={handleClickOpen}>
                Change Password
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Change Password</DialogTitle>
                <DialogContent>
                  <TextField
                    autoComplete="old-password"
                    margin="dense"
                    id="oldPassword"
                    name="oldPassword"
                    label="Old Password"
                    type="password"
                    fullWidth
                    onChange={handlePasswordChange}
                    value={formik.values.oldPassword}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.oldPassword &&
                      Boolean(formik.errors.oldPassword)
                    }
                    helperText={
                      formik.touched.oldPassword && formik.errors.oldPassword
                    }
                  />
                  <TextField
                    autoComplete="new-password"
                    margin="dense"
                    id="newPassword"
                    name="newPassword"
                    label="New Password"
                    type="password"
                    fullWidth
                    onChange={handlePasswordChange}
                    value={formik.values.newPassword}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.newPassword &&
                      Boolean(formik.errors.newPassword)
                    }
                    helperText={
                      formik.touched.newPassword && formik.errors.newPassword
                    }
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handlePasswordUpdate}>Update</Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent="center" // Center the content
            item
          >
            <Button
              sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
              component="button"
              size="large"
              variant="contained"
              color="secondary"
              type="submit"
              onClick={changeButton}
            >
              {edit.isEdit === false ? "UPDATE" : "EDIT"}
            </Button>
          </Grid>
        </FormControl>
      </CardContent>
    </Card>
  );
}
