import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Grid } from "@mui/material";

function valuetext(value) {
  return `{value}`;
}

export default function UISilder({ carat, setCarat }) {
  const handleSliderChange = (event, newValue) => {
    setCarat(newValue);
  };
  const handleInputChange = (event) => {
    setCarat(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (carat < 0.1) {
      setCarat(0.1);
    } else if (carat > 50) {
      setCarat(50);
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <Slider
            value={carat}
            onChange={handleSliderChange}
            aria-label="Always visible"
            defaultValue={5}
            getAriaValueText={valuetext}
            step={0.1}
            valueLabelDisplay="on"
            max={50}
          />
        </Grid>
        <Grid item xs={4}>
          <input
            type="number"
            value={carat}
            onChange={handleInputChange}
            onBlur={handleBlur}
            step={0.1}
            min={0.1}
            max={50}
            style={{
              width: "70px",
              paddingLeft: "10px",
              borderRadius: "2px",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
