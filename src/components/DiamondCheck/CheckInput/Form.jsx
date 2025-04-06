import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import checkImage from "../../../assets/images/check.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getDiamondCheckByCertificateId,
  getValuationRequestDetails,
} from "../../../services/api.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import { string } from "yup";

const DiamondCheckInputForm = () => {
  const navigate = useNavigate();
  const initialValues = {
    inputValue: "",
    checkType: "certificateId",
  };

  const validationSchema = Yup.object().shape({
    inputValue: Yup.string().when("checkType", {
      is: "certificateId",
      then: () =>
        string()
          .required("Certificate ID is required")
          .matches(/^[0-9]+$/, "Certificate ID must be numeric")
          .length(10, "Certificate ID must be 10 characters."),
      otherwise: () =>
        string()
          .required("Valuation Code is required")
          .matches(/^[0-9]+$/, "Valuation Code must be numeric"),
    }),
  });

  const handleCheck = async (values) => {
    const { inputValue, checkType } = values;
    try {
      let response;
      if (checkType === "certificateId") {
        response = await getDiamondCheckByCertificateId(inputValue);
        console.log("API Response for Certificate ID:", response); // Log the response
        if (!response) {
          throw new Error("Certificate ID not found!");
        }
        navigate(`/check/certificate/${inputValue}`);
      } else if (checkType === "valuationCode") {
        response = await getValuationRequestDetails(inputValue);
        console.log("API Response for Valuation Code:", response);
        if (response.status !== "APPROVED") {
          throw new Error("Valuation Code not found!");
        }
        if (!response) {
          throw new Error("Valuation Code not found!");
        }
        navigate(`/check/valuation/${inputValue}`);
      }
    } catch (error) {
      console.error("Error during form submission:", error); // Log the error
      if (error.response && error.response.status === 404) {
        toast.info("Certificate ID not found!", {
          position: "bottom-right",
        });
      } else {
        toast.info(error.message || "An unexpected error occurred.", {
          position: "bottom-right",
        });
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleCheck,
  });
  console.log(formik.values);
  const CustomErrorMessage = ({ children }) => (
    <div
      style={{
        color: "red",
        fontSize: "0.75rem",
        paddingLeft: "20px",
        marginTop: "12px",
      }}
    >
      {children}
    </div>
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
      mt={3}
      height="calc(100vh - 243px)"
    >
      <ToastContainer containerId="diamondCheck" />
      <Box
        width="100vw"
        height="calc(100vh - 245px)"
        sx={{
          backgroundImage: `url(${checkImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <Box
          position="relative"
          width="100%"
          maxWidth={720}
          height="auto"
          p={12}
        >
          <Box position="relative" width="100%" height="auto">
            <Typography
              fontFamily="'Epilogue-Bold', Helvetica"
              fontWeight="bold"
              color="#171a1f"
              fontSize={{ xs: 30, sm: 40, md: 50 }}
            >
              Check any diamond's
            </Typography>
            <Typography
              width="100%"
              position="relative"
              top={-20}
              fontFamily="'Epilogue-Bold', Helvetica"
              fontWeight="bold"
              color="#171a1f"
              fontSize={{ xs: 25, sm: 35, md: 45 }}
            >
              price &amp; quality
            </Typography>
          </Box>
          <Typography
            position="relative"
            width="100%"
            top={10}
            fontFamily="'Inter-Regular', Helvetica"
            color="#171a1f"
            fontSize={{ xs: 14, sm: 16, md: 17 }}
          >
            Transact with confidence -- get fair price, cut score, visual carat
            and more for free
          </Typography>

          <Box>
            <RadioGroup
              row
              name={"checkType"}
              value={formik.values.checkType}
              onChange={formik.handleChange}
              sx={{ position: "relative", top: 20 }}
            >
              <FormControlLabel
                value={"certificateId"}
                checked={formik.values.checkType === "certificateId"}
                control={<Radio />}
                label="Check by Certificate ID"
              />
              <FormControlLabel
                value={"valuationCode"}
                checked={formik.values.checkType === "valuationCode"}
                control={<Radio />}
                label="Check by Valuation Code"
              />
            </RadioGroup>

            <Box
              position="relative"
              width="100%"
              height={50}
              top={30}
              left={0}
              bgcolor="white"
              borderRadius={1}
              border="1px solid #9095a0"
            >
              <TextField
                name="inputValue"
                variant="standard"
                placeholder={
                  formik.values.checkType === "certificateId"
                    ? "Enter Certificate ID"
                    : "Enter Valuation Code"
                }
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  style: {
                    paddingLeft: 20,
                    paddingTop: 8,
                    color: "black",
                    fontSize: 16,
                  },
                }}
                value={formik.values.inputValue}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.inputValue && Boolean(formik.errors.inputValue)
                }
              />

              {formik.touched.inputValue && formik.errors.inputValue && (
                <FormHelperText
                  error={true}
                  sx={{
                    color: "#ffffff", // Customize your helper text styles here
                    fontSize: "0.75rem",
                    paddingLeft: "20px",
                    marginTop: "10px",
                    textAlign: "end",
                  }}
                >
                  **{formik.errors.inputValue}
                </FormHelperText>
              )}
            </Box>

            <Button
              type="submit"
              sx={{
                position: "relative",
                width: 151,
                height: 50,
                top: 50,
                left: "calc(50% - 75.5px)",
                backgroundColor: "#6366f2",
                borderRadius: 1,
                textTransform: "none",
                ":hover": { backgroundColor: "#6366f2" },
              }}
              onClick={() => formik.submitForm()}
            >
              <Typography color="white" fontSize={16} lineHeight="26px">
                Run free check
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DiamondCheckInputForm;
