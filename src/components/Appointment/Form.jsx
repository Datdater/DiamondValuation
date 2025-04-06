import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import diamond from "../../assets/images/poster.jpg";
import UICircularIndeterminate from "../UI/CircularIndeterminate";
import {
  addValuationRequest,
  getCustomer,
  getServices,
} from "../../services/api.js";

const AppointmentForm = () => {
  const { id } = useSelector((state) => state.auth.user);
  console.log("User ID:", id);

  const { data: services, isLoading: isServiceLoading } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  const { data: customer, isLoading: isCustomerLoading } = useQuery({
    queryKey: ["customer"],
    queryFn: () => getCustomer(id),
  });

  const [service, setService] = useState("");
  const [diamondQuantity, setDiamondQuantity] = useState(0);
  const [appointmentTime, setAppointmentTime] = useState("");
  const [valuationRequestId, setValuationRequestId] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (services && services.length > 0) {
      setService(services[0].name);
    }
  }, [services]);

  const validationSchema = Yup.object({
    diamondQuantity: Yup.number()
      .required("Quantity is required")
      .min(1, "Quantity must be larger than 0"),
  });

  const formik = useFormik({
    initialValues: {
      diamondQuantity: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const body = {
        diamondAmount: values.diamondQuantity,
        service: {
          id: services.find((s) => s.name === service).id,
        },
        customerID: customer.id,
        staffID: 0,
      };
      mutate(body);

      const now = new Date();
      const options = {
        hour: "numeric",
        minute: "numeric",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const appointmentTime = `${now.toLocaleTimeString(undefined, options)}`;
      setAppointmentTime(appointmentTime);
      setDiamondQuantity(values.diamondQuantity);
    },
  });

  const { mutate } = useMutation({
    mutationFn: (body) => {
      return addValuationRequest(body);
    },
    onSuccess: (data) => {
      setValuationRequestId(data.data.id);
      toast.success("Appointment created successfully", {
        position: "bottom-right",
      });
      setOpen(true);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to create appointment", {
        position: "bottom-right",
      });
    },
  });

  const handleServiceChange = (event) => {
    setService(event.target.value);
  };

  const handleUpdate = () => {
    navigate("/profile");
  };

  if (isServiceLoading || isCustomerLoading) {
    return <UICircularIndeterminate />;
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "550px",
        marginTop: "20px",
        marginBottom: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        src={diamond}
        alt="Diamond"
        sx={{
          width: "100%",
          position: "absolute",
          height: "550px",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "460px",
          height: "500px",
          left: "150px",
          backgroundColor: "rgba(240, 240, 240, 0.8)",
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontWeight: "bold",
            color: "#003565",
            mb: 3,
          }}
        >
          Appointments
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <FormControl
            sx={{
              width: "380px",
              ml: "15px",
              borderRadius: 1,
              border: "1px solid white",
              paddingLeft: "10px",
              paddingY: "5px",
              marginBottom: "7px",
            }}
          >
            <FormLabel
              sx={{
                color: "black",
                margin: "2px",
                fontWeight: "bold",
                fontSize: "17px",
                textAlign: "center",
              }}
            >
              Customer Information
            </FormLabel>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "5px",
                borderRadius: "4px",
              }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: "black", margin: "2px" }}
                >
                  Name: {customer.lastName + " " + customer.firstName}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "black", margin: "2px" }}
                >
                  Identity Card: {customer.identityDocument}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "black", margin: "2px" }}
                >
                  Phone: {customer.phone}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "black", margin: "2px" }}
                >
                  Address: {customer.address}
                </Typography>
              </Box>
              <ArrowForwardIosIcon
                onClick={handleUpdate}
                sx={{ color: "black", marginTop: "-15px" }}
                cursor="pointer"
              />
            </Box>
          </FormControl>

          <FormControl sx={{ width: "380px", ml: "15px" }}>
            <FormLabel sx={{ color: "black", margin: "2px" }}>
              Service*
            </FormLabel>
            <Select
              variant="outlined"
              required
              sx={{
                color: service === "Choose service" ? " #a9a9a9" : "black",
                height: "40px",
                backgroundColor: "white",
                fontFamily: "'Your Font Family', sans-serif",
              }}
              value={service}
              onChange={handleServiceChange}
            >
              <MenuItem value="" disabled>
                Choose service
              </MenuItem>
              {services.map((service, index) => (
                <MenuItem key={index} value={service.name}>
                  {service.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: "380px", ml: "15px" }}>
            <FormLabel sx={{ color: "black", margin: "2px" }}>
              Quantity*
            </FormLabel>
            <TextField
              type="number"
              variant="outlined"
              required
              placeholder="Input quantity"
              name="diamondQuantity"
              value={formik.values.diamondQuantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.diamondQuantity &&
                Boolean(formik.errors.diamondQuantity)
              }
              helperText={
                formik.touched.diamondQuantity && formik.errors.diamondQuantity
              }
              InputProps={{
                sx: {
                  height: "40px",
                  backgroundColor: "white",
                },
              }}
              inputProps={{
                min: 0,
              }}
            />
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, width: "380px", ml: "15px" }}
          >
            Submit
          </Button>
        </form>

        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <Box display="flex" justifyContent="center" alignItems="center">
              <CheckCircleOutlineIcon
                color="success"
                style={{ fontSize: 70 }}
              />
            </Box>
            <Typography
              align="center"
              style={{
                fontWeight: "bold",
                color: "green",
                fontSize: 20,
              }}
            >
              {"Successful Appointment"}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box id="alert-dialog-description">
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                align="center"
                marginBottom="10px"
              >
                <Typography> Appointment details:</Typography>
                <Typography style={{ fontWeight: "bold", color: "#AE9A7F" }}>
                  Code: #{valuationRequestId}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" flexDirection="column">
                  <span style={{ marginBottom: "10px", color: "#999999" }}>
                    Customer Name:
                  </span>
                  <span style={{ marginBottom: "10px", color: "#999999" }}>
                    Phone:
                  </span>
                  <span style={{ marginBottom: "10px", color: "#999999" }}>
                    Appointment Time:
                  </span>
                  <span style={{ marginBottom: "10px", color: "#999999" }}>
                    Service:
                  </span>
                  <span style={{ marginBottom: "10px", color: "#999999" }}>
                    Diamond Quantity:
                  </span>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  ml={2}
                >
                  <span style={{ marginBottom: "10px" }}>
                    {customer.lastName + " " + customer.firstName}
                  </span>
                  <span style={{ marginBottom: "10px" }}>{customer.phone}</span>
                  <Typography
                    style={{ fontWeight: "bold", marginBottom: "10px" }}
                  >
                    {appointmentTime}
                  </Typography>
                  <span style={{ marginBottom: "10px" }}>{service}</span>
                  <span style={{ marginBottom: "10px" }}>
                    {diamondQuantity}
                  </span>
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Box display="flex" justifyContent="center" width="100%">
              <Button
                onClick={() => {
                  setOpen(false);
                  setService(services[0].name);
                  setDiamondQuantity(0);
                }}
                color="primary"
                autoFocus
              >
                Close
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AppointmentForm;
