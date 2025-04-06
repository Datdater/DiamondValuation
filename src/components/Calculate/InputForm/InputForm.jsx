import { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import OriginButton from "./Button/Origin.jsx";
import Typography from "@mui/material/Typography";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UISilder from "../../UI/Slider.jsx";
import ShapeButton from "./Button/Shape.jsx";

const CalculateInputForm = ({ setParams }) => {
  const [diamondOrigin, setDiamondOrigin] = useState({ NATURAL: "clicked" });
  const [shape, setShape] = useState({ ROUND: "clicked" });
  const [carat, setCarat] = useState(5);
  const [color, setColor] = useState({ I: "clicked" });
  const [clarity, setClarity] = useState({ VS2: "clicked" });
  const [cut, setCut] = useState({ EXCELLENT: "clicked" });
  const [symmetry, setSymmetry] = useState({ EXCELLENT: "clicked" });
  const [polish, setPolish] = useState({ EXCELLENT: "clicked" });
  const [fluorescence, setFluorescence] = useState({ NONE: "clicked" });
  const [showMoreInputs, setShowMoreInputs] = useState(false);

  const handleSubmit = () => {
    const newParams = {
      diamondOrigin: Object.keys(diamondOrigin).find(
        (key) => diamondOrigin[key] === "clicked",
      ),
      shape: Object.keys(shape).find((key) => shape[key] === "clicked"),
      caratWeight: carat,
      color: Object.keys(color).find((key) => color[key] === "clicked"),
      clarity: Object.keys(clarity).find((key) => clarity[key] === "clicked"),
      cut: Object.keys(cut).find((key) => cut[key] === "clicked"),
      symmetry: Object.keys(symmetry).find(
        (key) => symmetry[key] === "clicked",
      ),
      polish: Object.keys(polish).find((key) => polish[key] === "clicked"),
      fluorescence: Object.keys(fluorescence).find(
        (key) => fluorescence[key] === "clicked",
      ),
    };
    setParams(newParams);
    console.log(newParams);
  };

  const handleClick = (setState, buttonName, handleChange) => {
    setState((prevState) => {
      // First, create a new object where all button colors are set to "default"
      const resetColors = Object.keys(prevState).reduce((acc, curr) => {
        acc[curr] = "default";
        return acc;
      }, {});
      // Then, set the clicked button's color to "clicked"
      resetColors[buttonName] = "clicked";

      return resetColors;
    });
  };

  return (
    <Box
      sx={{
        width: 410,
        position: "relative",
        borderRadius: "6px",
        height: showMoreInputs ? 1000 : 675,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          fontWeight: "bold",
          color: "#171a1f",
          fontSize: 22,
          left: "10px",
        }}
      >
        Calculator Input
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 35,
          left: 10,
          backgroundColor: "white",
          boxShadow: "1px 4px 6px rgba(0, 0, 0, 0.1)",
          height: showMoreInputs ? 975 : 675,
        }}
      >
        <Box sx={{ width: 400, height: 620, position: "relative" }}>
          <Box position="absolute" top="15px" left="9px">
            <Box
              sx={{
                fontFamily: "Inter-Regular, Helvetica",
                color: "#9095a0",
                fontSize: 14,
                marginBottom: "10px",
              }}
            >
              DIAMOND ORIGIN
            </Box>
            <Grid container spacing={23} columnSpacing={25}>
              <Grid item xs={6}>
                <OriginButton
                  buttonName={"NATURAL"}
                  onClick={handleClick}
                  state={diamondOrigin}
                  setState={setDiamondOrigin}
                  icon={<PublicOutlinedIcon />}
                >
                  NATURAL
                </OriginButton>
              </Grid>
              <Grid item xs={6}>
                <OriginButton
                  buttonName={"LAB_GROWN"}
                  onClick={handleClick}
                  state={diamondOrigin}
                  setState={setDiamondOrigin}
                  icon={<ScienceOutlinedIcon />}
                >
                  LAB GROWN
                </OriginButton>
              </Grid>
            </Grid>
          </Box>
          <Box position="absolute" top="95px" left="9px">
            <Box
              sx={{
                color: "#9095a0",
                fontSize: 14,
              }}
            >
              SHAPE
            </Box>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                style={{ marginBottom: "27px", marginTop: "10px" }}
              >
                <Grid container justifyContent="space-between" spacing={7}>
                  <Grid item>
                    <ShapeButton
                      buttonName="ROUND"
                      selectedShape={shape}
                      state={shape}
                      setState={setShape}
                      onClick={handleClick}
                    />
                  </Grid>
                  <Grid item>
                    <ShapeButton
                      buttonName="CUSHION"
                      selectedShape={shape}
                      state={shape}
                      setState={setShape}
                      onClick={handleClick}
                    />
                  </Grid>
                  <Grid item>
                    <ShapeButton
                      buttonName="EMERALD"
                      selectedShape={shape}
                      state={shape}
                      setState={setShape}
                      onClick={handleClick}
                    />
                  </Grid>
                  <Grid item>
                    <ShapeButton
                      buttonName="OVAL"
                      selectedShape={shape}
                      state={shape}
                      setState={setShape}
                      onClick={handleClick}
                    />
                  </Grid>
                  <Grid item>
                    <ShapeButton
                      buttonName="PRINCESS"
                      selectedShape={shape}
                      state={shape}
                      setState={setShape}
                      onClick={handleClick}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent="space-between" spacing={2}>
                  <Grid item>
                    <ShapeButton
                      buttonName="PEAR"
                      selectedShape={shape}
                      state={shape}
                      setState={setShape}
                      onClick={handleClick}
                    />
                  </Grid>
                  <Grid item>
                    <ShapeButton
                      buttonName="RADIANT"
                      selectedShape={shape}
                      state={shape}
                      setState={setShape}
                      onClick={handleClick}
                    />
                  </Grid>
                  <Grid item>
                    <ShapeButton
                      buttonName="MARQUISE"
                      selectedShape={shape}
                      state={shape}
                      setState={setShape}
                      onClick={handleClick}
                    />
                  </Grid>
                  <Grid item>
                    <ShapeButton
                      buttonName="ASSCHER"
                      selectedShape={shape}
                      state={shape}
                      setState={setShape}
                      onClick={handleClick}
                    />
                  </Grid>
                  <Grid item>
                    <ShapeButton
                      buttonName="HEART"
                      selectedShape={shape}
                      state={shape}
                      setState={setShape}
                      onClick={handleClick}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Box
              sx={{
                position: "absolute",
                top: 220,
                left: 7,
                fontSize: 14,
                color: "#9095a0",
                whiteSpace: "nowrap",
              }}
            >
              CARAT
            </Box>
            <Box
              sx={{
                position: "absolute",
                width: 373,
                top: 270,
                left: 10,
              }}
            >
              <UISilder carat={carat} setCarat={setCarat} />
            </Box>
          </Box>

          <Box>
            <Box
              sx={{
                position: "absolute",
                top: 310,
                left: 7,
                fontSize: 14,
                color: "#9095a0",
                whiteSpace: "nowrap",
              }}
            >
              COLOR
            </Box>
            <Button
              onClick={(e) => {
                handleClick(setColor, "D");
              }}
              sx={{
                width: 90,
                height: 33,
                position: "absolute",
                top: 385,
                left: 293,
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "6px",
                backgroundColor:
                  color["D"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                ":hover": { bgcolor: "#4F46E5", color: "white" },
                fontSize: 14,
                color: color["D"] === "clicked" ? "white" : "#171a1f",
              }}
            >
              D
            </Button>

            <Button
              onClick={() => {
                handleClick(setColor, "H");
              }}
              sx={{
                width: 90,
                height: 33,
                position: "absolute",
                top: 345,
                left: 293,
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "6px",
                backgroundColor:
                  color["H"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                ":hover": { bgcolor: "#4F46E5", color: "white" },
                fontSize: 14,
                color: color["H"] === "clicked" ? "white" : "#171a1f",
              }}
            >
              H
            </Button>

            <Button
              onClick={() => {
                handleClick(setColor, "E");
              }}
              sx={{
                width: 90,
                height: 33,
                position: "absolute",
                top: 385,
                left: 198,
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "6px",
                backgroundColor:
                  color["E"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                ":hover": { bgcolor: "#4F46E5", color: "white" },
                fontSize: 14,
                color: color["E"] === "clicked" ? "white" : "#171a1f",
              }}
            >
              E
            </Button>
            <Button
              onClick={() => {
                handleClick(setColor, "K");
              }}
              sx={{
                width: 90,
                height: 33,
                position: "absolute",
                top: 345,
                left: 9,
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "6px",
                backgroundColor:
                  color["K"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                ":hover": { bgcolor: "#4F46E5", color: "white" },
                fontSize: 14,
                color: color["K"] === "clicked" ? "white" : "#171a1f",
              }}
            >
              K
            </Button>

            <Button
              onClick={() => {
                handleClick(setColor, "F");
              }}
              sx={{
                width: 90,
                height: 33,
                position: "absolute",
                top: 385,
                left: 104,
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "6px",
                backgroundColor:
                  color["F"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                ":hover": { bgcolor: "#4F46E5", color: "white" },
                fontSize: 14,
                color: color["F"] === "clicked" ? "white" : "#171a1f",
              }}
            >
              F
            </Button>

            <Button
              onClick={() => {
                handleClick(setColor, "J");
              }}
              sx={{
                width: 90,
                height: 33,
                position: "absolute",
                top: 345,
                left: 104,
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "6px",
                backgroundColor:
                  color["J"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                ":hover": { bgcolor: "#4F46E5", color: "white" },
                fontSize: 14,
                color: color["J"] === "clicked" ? "white" : "#171a1f",
              }}
            >
              J
            </Button>

            <Button
              onClick={() => {
                handleClick(setColor, "G");
              }}
              sx={{
                width: 89,
                height: 33,
                position: "absolute",
                top: 385,
                left: 10,
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "6px",
                backgroundColor:
                  color["G"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                ":hover": { bgcolor: "#4F46E5", color: "white" },
                fontSize: 14,
                color: color["G"] === "clicked" ? "white" : "#171a1f",
              }}
            >
              G
            </Button>

            <Button
              onClick={() => {
                handleClick(setColor, "I");
              }}
              sx={{
                width: "90px",
                height: "33px",
                position: "absolute",
                top: "345px",
                left: "198px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "6px",
                backgroundColor:
                  color["I"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                ":hover": { bgcolor: "#4F46E5", color: "white" },
                fontSize: "14px",
                color: color["I"] === "clicked" ? "white" : "#171a1f",
              }}
            >
              I
            </Button>
          </Box>

          <Box>
            <Box
              sx={{
                position: "absolute",
                top: "440px",
                left: "7px",
                fontSize: "14px",
                color: "#9095a0",
                lineHeight: "22px",
                whiteSpace: "nowrap",
              }}
            >
              CLARITY
            </Box>
            <Button
              onClick={() => {
                handleClick(setClarity, "FL");
              }}
              sx={{
                width: "90px",
                height: "33px",
                position: "absolute",
                top: "510px",
                left: "293px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "6px",
                backgroundColor:
                  clarity["FL"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                ":hover": { bgcolor: "#4F46E5", color: "white" },
                fontSize: "14px",
                color: clarity["FL"] === "clicked" ? "white" : "#171a1f",
              }}
            >
              FL
            </Button>

            <Button
              onClick={() => {
                handleClick(setClarity, "VS1");
              }}
              sx={{
                width: "90px",
                height: "33px",
                position: "absolute",
                top: "470px",
                left: "293px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "6px",
                backgroundColor:
                  clarity["VS1"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                ":hover": { bgcolor: "#4F46E5", color: "white" },
                fontSize: "14px",
                color: clarity["VS1"] === "clicked" ? "white" : "#171a1f",
              }}
            >
              VS1
            </Button>

            <Button
              onClick={() => {
                handleClick(setClarity, "IF");
              }}
              sx={{
                width: "90px",
                height: "33px",
                position: "absolute",
                top: "510px",
                left: "198px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "6px",
                backgroundColor:
                  clarity["IF"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                ":hover": { bgcolor: "#4F46E5", color: "white" },
                fontSize: "14px",
                color: clarity["IF"] === "clicked" ? "white" : "#171a1f",
              }}
            >
              IF
            </Button>

            <Button
              onClick={() => {
                handleClick(setClarity, "VVS2");
              }}
              sx={{
                width: "90px",
                height: "33px",
                position: "absolute",
                top: "510px",
                left: "9px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "6px",
                backgroundColor:
                  clarity["VVS2"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                ":hover": { bgcolor: "#4F46E5", color: "white" },
                fontSize: "14px",
                color: clarity["VVS2"] === "clicked" ? "white" : "#171a1f",
              }}
            >
              VVS2
            </Button>

            <Button
              onClick={() => {
                handleClick(setClarity, "SI2");
              }}
              sx={{
                width: "90px",
                height: "33px",
                position: "absolute",
                top: "470px",
                left: "9px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "6px",
                backgroundColor:
                  clarity["SI2"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                ":hover": { bgcolor: "#4F46E5", color: "white" },
                fontSize: "14px",
                color: clarity["SI2"] === "clicked" ? "white" : "#171a1f",
              }}
            >
              SI2
            </Button>
            <Button
              onClick={() => {
                handleClick(setClarity, "VVS1");
              }}
              sx={{
                width: "90px",
                height: "33px",
                position: "absolute",
                top: "510px",
                left: "104px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "6px",
                backgroundColor:
                  clarity["VVS1"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                ":hover": { bgcolor: "#4F46E5", color: "white" },
                fontSize: "14px",
                color: clarity["VVS1"] === "clicked" ? "white" : "#171a1f",
              }}
            >
              VVS1
            </Button>

            <Button
              onClick={() => {
                handleClick(setClarity, "SL1");
              }}
              sx={{
                width: "90px",
                height: "33px",
                position: "absolute",
                top: "470px",
                left: "104px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "6px",
                backgroundColor:
                  clarity["SL1"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                ":hover": { bgcolor: "#4F46E5", color: "white" },
                fontSize: "14px",
                color: clarity["SL1"] === "clicked" ? "white" : "#171a1f",
              }}
            >
              SL1
            </Button>

            <Button
              onClick={() => {
                handleClick(setClarity, "VS2");
              }}
              sx={{
                width: "89px",
                height: "32px",
                position: "absolute",
                top: "470px",
                left: "199px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "6px",
                backgroundColor:
                  clarity["VS2"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                ":hover": { bgcolor: "#4F46E5", color: "white" },
                fontSize: "14px",
                color: clarity["VS2"] === "clicked" ? "white" : "#171a1f",
              }}
            >
              VS2
            </Button>
          </Box>

          <Button
            onClick={handleSubmit}
            sx={{
              all: "unset",
              width: "380px",
              height: "40px",
              position: "absolute",
              top: showMoreInputs ? 885 : 575,
              left: "6px",
              borderRadius: "4px",
              backgroundColor: "#3949AB",
              "&:hover": {
                backgroundColor: "#3f51b5",
              },
              cursor: "pointer",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                top: "8px",
                left: "165px",
                fontFamily: "Inter-Regular, Helvetica",
                color: "white",
                fontSize: "15px",
              }}
            >
              Submit
            </Typography>
          </Button>

          <Button
            onClick={() => setShowMoreInputs(!showMoreInputs)}
            sx={{
              width: "380px",
              height: "40px",
              position: "absolute",
              top: showMoreInputs ? 930 : 625,
              left: "6px",
              borderRadius: "4px",
              textAlign: "left",
            }}
          >
            {showMoreInputs ? "FEWER INPUTS" : "MORE INPUTS"}
            {showMoreInputs ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Button>
          {showMoreInputs && (
            <>
              <Box position="absolute" top="560px" left="7px">
                <Box
                  sx={{
                    fontSize: "14px",
                    color: "#9095a0",
                  }}
                >
                  CUT
                </Box>
                <Button
                  onClick={() => {
                    handleClick(setCut, "FAIR");
                  }}
                  sx={{
                    width: "71px",
                    height: "33px",
                    position: "absolute",
                    top: "30px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "6px",
                    backgroundColor:
                      cut["FAIR"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                    ":hover": { bgcolor: "#4F46E5", color: "white" },
                    fontSize: "14px",
                    color: cut["FAIR"] === "clicked" ? "white" : "#171a1f",
                  }}
                >
                  FAIR
                </Button>
                <Button
                  onClick={() => {
                    handleClick(setCut, "GOOD");
                  }}
                  sx={{
                    width: "71px",
                    height: "33px",
                    position: "absolute",
                    left: "75px",
                    top: "30px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "6px",
                    backgroundColor:
                      cut["GOOD"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                    ":hover": { bgcolor: "#4F46E5", color: "white" },
                    fontSize: "14px",
                    color: cut["GOOD"] === "clicked" ? "white" : "#171a1f",
                  }}
                >
                  GOOD
                </Button>
                <Button
                  onClick={() => {
                    handleClick(setCut, "VERY_GOOD");
                  }}
                  sx={{
                    width: "71px",
                    height: "33px",
                    position: "absolute",
                    left: "150px",
                    top: "30px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "6px",
                    backgroundColor:
                      cut["VERY_GOOD"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                    ":hover": { bgcolor: "#4F46E5", color: "white" },
                    fontSize: "14px",
                    color: cut["VERY_GOOD"] === "clicked" ? "white" : "#171a1f",
                  }}
                >
                  V.GOOD
                </Button>

                <Button
                  onClick={() => {
                    handleClick(setCut, "EXCELLENT");
                  }}
                  sx={{
                    width: "71px",
                    height: "32px",
                    position: "absolute",
                    left: "225px",
                    top: "30px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "6px",
                    backgroundColor:
                      cut["EXCELLENT"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                    ":hover": { bgcolor: "#4F46E5", color: "white" },
                    fontSize: "14px",
                    color: cut["EXCELLENT"] === "clicked" ? "white" : "#171a1f",
                  }}
                >
                  EX.
                </Button>
                <Button
                  onClick={() => {
                    handleClick(setCut, "IDEAL");
                  }}
                  sx={{
                    width: "71px",
                    height: "32px",
                    position: "absolute",
                    left: "300px",
                    top: "30px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "6px",
                    backgroundColor:
                      cut["IDEAL"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                    ":hover": { bgcolor: "#4F46E5", color: "white" },
                    fontSize: "14px",
                    color: cut["IDEAL"] === "clicked" ? "white" : "#171a1f",
                  }}
                >
                  IDEAL
                </Button>
              </Box>
              <Box position="absolute" top="640px" left="7px">
                <Box
                  sx={{
                    fontSize: "14px",
                    color: "#9095a0",
                  }}
                >
                  SYMMETRY
                </Box>
                <Button
                  onClick={() => {
                    handleClick(setSymmetry, "FAIR");
                  }}
                  sx={{
                    width: "90px",
                    height: "33px",
                    position: "absolute",
                    top: "30px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "6px",
                    backgroundColor:
                      symmetry["FAIR"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                    ":hover": { bgcolor: "#4F46E5", color: "white" },
                    fontSize: "14px",
                    color: symmetry["FAIR"] === "clicked" ? "white" : "#171a1f",
                  }}
                >
                  FAIR
                </Button>
                <Button
                  onClick={() => {
                    handleClick(setSymmetry, "GOOD");
                  }}
                  sx={{
                    width: "90px",
                    height: "33px",
                    position: "absolute",
                    left: "95px",
                    top: "30px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "6px",
                    backgroundColor:
                      symmetry["GOOD"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                    ":hover": { bgcolor: "#4F46E5", color: "white" },
                    fontSize: "14px",
                    color: symmetry["GOOD"] === "clicked" ? "white" : "#171a1f",
                  }}
                >
                  GOOD
                </Button>
                <Button
                  onClick={() => {
                    handleClick(setSymmetry, "VERY_GOOD");
                  }}
                  sx={{
                    width: "90px",
                    height: "33px",
                    position: "absolute",
                    left: "190px",
                    top: "30px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "6px",
                    backgroundColor:
                      symmetry["VERY_GOOD"] === "clicked"
                        ? "#4F46E5"
                        : "#f5f5f5",
                    ":hover": { bgcolor: "#4F46E5", color: "white" },
                    fontSize: "14px",
                    color:
                      symmetry["VERY_GOOD"] === "clicked" ? "white" : "#171a1f",
                  }}
                >
                  V.GOOD
                </Button>

                <Button
                  onClick={() => {
                    handleClick(setSymmetry, "EXCELLENT");
                  }}
                  sx={{
                    width: "89px",
                    height: "32px",
                    position: "absolute",
                    left: "284px",
                    top: "30px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "6px",
                    backgroundColor:
                      symmetry["EXCELLENT"] === "clicked"
                        ? "#4F46E5"
                        : "#f5f5f5",
                    ":hover": { bgcolor: "#4F46E5", color: "white" },
                    fontSize: "14px",
                    color:
                      symmetry["EXCELLENT"] === "clicked" ? "white" : "#171a1f",
                  }}
                >
                  EX.
                </Button>
              </Box>
              <Box position="absolute" top="720px" left="7px">
                <Box
                  sx={{
                    fontSize: "14px",
                    color: "#9095a0",
                  }}
                >
                  POLISH
                </Box>
                <Button
                  onClick={() => {
                    handleClick(setPolish, "FAIR");
                  }}
                  sx={{
                    width: "90px",
                    height: "33px",
                    position: "absolute",
                    top: "30px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "6px",
                    backgroundColor:
                      polish["FAIR"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                    ":hover": { bgcolor: "#4F46E5", color: "white" },
                    fontSize: "14px",
                    color: polish["FAIR"] === "clicked" ? "white" : "#171a1f",
                  }}
                >
                  FAIR
                </Button>
                <Button
                  onClick={() => {
                    handleClick(setPolish, "GOOD");
                  }}
                  sx={{
                    width: "90px",
                    height: "33px",
                    position: "absolute",
                    left: "95px",
                    top: "30px",

                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "6px",
                    backgroundColor:
                      polish["GOOD"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                    ":hover": { bgcolor: "#4F46E5", color: "white" },

                    fontSize: "14px",
                    color: polish["GOOD"] === "clicked" ? "white" : "#171a1f",
                  }}
                >
                  GOOD
                </Button>
                <Button
                  onClick={() => {
                    handleClick(setPolish, "VERY_GOOD");
                  }}
                  sx={{
                    width: "90px",
                    height: "33px",
                    position: "absolute",
                    left: "190px",
                    top: "30px",

                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "6px",
                    backgroundColor:
                      polish["VERY_GOOD"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                    ":hover": { bgcolor: "#4F46E5", color: "white" },
                    fontSize: "14px",
                    color:
                      polish["VERY_GOOD"] === "clicked" ? "white" : "#171a1f",
                  }}
                >
                  V.GOOD
                </Button>

                <Button
                  onClick={() => {
                    handleClick(setPolish, "EXCELLENT");
                  }}
                  sx={{
                    width: "89px",
                    height: "32px",
                    position: "absolute",
                    left: "284px",
                    top: "30px",

                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "6px",
                    backgroundColor:
                      polish["EXCELLENT"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                    ":hover": { bgcolor: "#4F46E5", color: "white" },
                    fontSize: "14px",
                    color:
                      polish["EXCELLENT"] === "clicked" ? "white" : "#171a1f",
                  }}
                >
                  EX.
                </Button>
              </Box>
              <Box position="absolute" top="800px" left="7px">
                <Box
                  sx={{
                    fontSize: "14px",
                    color: "#9095a0",
                    lineHeight: "22px",
                    whiteSpace: "nowrap",
                  }}
                >
                  FLUORESCENCE
                </Box>
                <Button
                  onClick={() => {
                    handleClick(setFluorescence, "VSTG");
                  }}
                  sx={{
                    width: "71px",
                    height: "33px",
                    position: "absolute",
                    top: "30px",

                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "6px",
                    backgroundColor:
                      fluorescence["VSTG"] === "clicked"
                        ? "#4F46E5"
                        : "#f5f5f5",
                    ":hover": { bgcolor: "#4F46E5", color: "white" },
                    fontSize: "14px",
                    color:
                      fluorescence["VSTG"] === "clicked" ? "white" : "#171a1f",
                  }}
                >
                  VSTG
                </Button>
                <Button
                  onClick={() => handleClick(setFluorescence, "STG")}
                  sx={{
                    width: "71px",
                    height: "33px",
                    position: "absolute",
                    left: "75px",
                    top: "30px",

                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "6px",
                    backgroundColor:
                      fluorescence["STG"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                    ":hover": { bgcolor: "#4F46E5", color: "white" },
                    fontSize: "14px",
                    color:
                      fluorescence["STG"] === "clicked" ? "white" : "#171a1f",
                  }}
                >
                  STG
                </Button>
                <Button
                  onClick={() => handleClick(setFluorescence, "MED")}
                  sx={{
                    width: "71px",
                    height: "33px",
                    position: "absolute",
                    left: "150px",
                    top: "30px",

                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "6px",
                    backgroundColor:
                      fluorescence["MED"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                    ":hover": { bgcolor: "#4F46E5", color: "white" },
                    fontSize: "14px",
                    color:
                      fluorescence["MED"] === "clicked" ? "white" : "#171a1f",
                  }}
                >
                  MED
                </Button>
                <Button
                  onClick={() => handleClick(setFluorescence, "FNT")}
                  sx={{
                    width: "71px",
                    height: "32px",
                    position: "absolute",
                    left: "225px",
                    top: "30px",

                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "6px",
                    backgroundColor:
                      fluorescence["FNT"] === "clicked" ? "#4F46E5" : "#f5f5f5",
                    ":hover": { bgcolor: "#4F46E5", color: "white" },
                    fontSize: "14px",
                    color:
                      fluorescence["FNT"] === "clicked" ? "white" : "#171a1f",
                  }}
                >
                  FNT
                </Button>
                <Button
                  onClick={() => handleClick(setFluorescence, "NONE")}
                  sx={{
                    width: "71px",
                    height: "32px",
                    position: "absolute",
                    left: "300px",
                    top: "30px",

                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "6px",
                    backgroundColor:
                      fluorescence["NONE"] === "clicked"
                        ? "#4F46E5"
                        : "#f5f5f5",
                    ":hover": { bgcolor: "#4F46E5", color: "white" },
                    fontSize: "14px",
                    color:
                      fluorescence["NONE"] === "clicked" ? "white" : "#171a1f",
                  }}
                >
                  NON
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CalculateInputForm;
