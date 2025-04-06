import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const DiamondCheckResultForm = ({
  certificateId,
  priceEstimate,
  minPrice,
  maxPrice,
  cut_score,
  shape,
  carat,
  color,
  clarity,
  fluorescence,
  symmetry,
  polish,
}) => {
  const navigate = useNavigate();
  const handleCheck = () => {
    navigate("/check");
  };

  const formattedMoney = (money) => {
    if (money === "N/A" || money === 0) {
      return "N/A";
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(money);
  };

  const priceEstimateFormat = formattedMoney(priceEstimate);
  const estimateRange = `${formattedMoney(minPrice)} - ${formattedMoney(maxPrice)}`;

  return (
    <Box position="relative">
      <Typography
        sx={{
          position: "absolute",
          top: "7px",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#171a1f",
        }}
      >
        GIA ID {certificateId}
      </Typography>
      <Box
        variant="contained"
        sx={{
          textAlign: "center",
          position: "absolute",
          width: 106,
          height: 22,
          top: 8,
          left: 180,
          backgroundColor: "#d9fcda",
          borderRadius: 1,
          border: "1px solid #00c853",
          fontSize: 12,
          color: "#00c853",
          fontWeight: 550,
        }}
      >
        Natural Diamond
      </Box>
      <FiberManualRecordIcon
        sx={{
          position: "absolute",
          top: "52px",
          left: "10px",
          fontSize: "10px",
          color: "#bcc1ca",
        }}
      />
      <Typography
        sx={{
          position: "absolute",
          top: "45px",
          left: "23px",
          fontSize: "17px",
          fontWeight: "bold",
          color: "#171a1f",
        }}
      >
        Off market
      </Typography>
      <Typography
        sx={{
          position: "absolute",
          top: "48px",
          left: "120px",
          fontSize: "15px",
          color: "#171a1f",
          fontWeight: 550,
        }}
      >
        Fair Price Estimate:
      </Typography>
      <Typography
        sx={{
          position: "absolute",
          top: "48px",
          left: "260px",
          fontSize: "15px",
          color: "#6a65d2",
          fontWeight: 540,
        }}
      >
        {priceEstimateFormat}
      </Typography>
      <FiberManualRecordIcon
        sx={{
          position: "absolute",
          top: "75px",
          left: "11px",
          fontSize: "10px",
          color: "#bcc1ca",
        }}
      />
      <Typography
        sx={{
          position: "absolute",
          top: "70px",
          left: "25px",
          fontSize: "14px",
          color: "#171a1f",
          fontWeight: 550,
        }}
      >
        Estimate Range:
      </Typography>
      <Typography
        sx={{
          position: "absolute",
          top: "71px",
          left: "135px",
          fontSize: "14px",
          color: "#6a65d2",
          fontWeight: 540,
        }}
      >
        {estimateRange}
      </Typography>
      <Typography
        sx={{
          position: "absolute",
          top: "100px",
          fontSize: "13px",
          color: "#bcc1ca",
        }}
      >
        Not currently listed on H&TDiamond
      </Typography>

      <Box
        sx={{
          position: "absolute",
          top: "145px",
          width: "457px",
          height: "63px",
          backgroundColor: "#fffffe",
          borderRadius: "4px",
          border: "1px solid #9095a0",
          boxShadow: "0px 0px 1px #171a1f12, 0px 0px 2px #171a1f1f",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box textAlign="center">
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              color: "#bcc1ca",
            }}
          >
            Fair Price
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#675fe8",
              fontWeight: 500,
            }}
          >
            {priceEstimateFormat}
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              color: "#bcc1ca",
            }}
          >
            Cut Score
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#5f56e7",
            }}
          >
            {Number(cut_score).toFixed(1)}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          borderRadius: "4px",
          position: "absolute",
          top: "225px",
          width: "459px",
          height: "155px",
          backgroundColor: "white",
          padding: "20px",
          border: "1px solid #9095a0",

          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "0px 0px 1px #171a1f12, 0px 0px 2px #171a1f1f",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          paddingX="10px"
          paddingTop="4px"
        >
          <Box>
            <Typography
              sx={{
                fontSize: "13px",
                textAlign: "center",
                color: "#bcc1ca",
                fontWeight: "bold",
              }}
            >
              Shape
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                textAlign: "center",
                color: "#171a1f",
              }}
            >
              {shape}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "13px",
                textAlign: "center",
                color: "#bcc1ca",
                fontWeight: "bold",
              }}
            >
              Carat
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                textAlign: "center",
                color: "#171a1f",
              }}
            >
              {carat}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "13px",
                textAlign: "center",
                color: "#bcc1ca",
                fontWeight: "bold",
              }}
            >
              Color
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                textAlign: "center",
                color: "#171a1f",
              }}
            >
              {color}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "13px",
                color: "#bcc1ca",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Clarity
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#171a1f",
                textAlign: "center",
              }}
            >
              {clarity}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          paddingBottom="10px"
          marginLeft="30px"
          marginRight="30px"
        >
          <Box>
            <Typography
              sx={{
                fontSize: "13px",
                textAlign: "center",
                color: "#bcc1ca",
                fontWeight: "bold",
              }}
            >
              Fluorescence
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                textAlign: "center",
                color: "#171a1f",
              }}
            >
              {fluorescence}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "13px",
                color: "#bcc1ca",
                fontWeight: "bold",
              }}
            >
              Symmetry
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                textAlign: "center",
                color: "#171a1f",
              }}
            >
              {symmetry}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "13px",
                textAlign: "center",
                color: "#bcc1ca",
                fontWeight: "bold",
              }}
            >
              Polish
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#171a1f",
                textAlign: "center",
              }}
            >
              {polish}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Button
        onClick={handleCheck}
        sx={{
          position: "absolute",
          top: "400px",
          left: "13px",
          width: "433px",
          height: "49px",
          backgroundColor: "#bbdefb",
          borderRadius: "4px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#554cd0",
          "&hover": {
            backgroundColor: "#bbdefb",
          },
        }}
      >
        Run another check
      </Button>
    </Box>
  );
};

export default DiamondCheckResultForm;
