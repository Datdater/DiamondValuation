import CalculateInputForm from "./InputForm/InputForm.jsx";
import CalculateOutputForm from "./OutputForm.jsx";
import { Container, Grid } from "@mui/material";
import { getDiamondData, getDiamondMarketData } from "../../services/api";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CalculatePage() {
  const [params, setParams] = useState({
    diamondOrigin: "NATURAL",
    caratWeight: "0.3",
    color: "K",
    clarity: "SI1",
    cut: "EXCELLENT",
    polish: "EXCELLENT",
    symmetry: "EXCELLENT",
    shape: "ROUND",
    fluorescence: "NONE",
  });

  const {
    data: diamondData,
    isLoading: isDiamondLoading,
    error: diamondError,
  } = useQuery({
    queryKey: ["diamondData", params],
    queryFn: () => getDiamondData(params),
  });

  const {
    data: marketData,
    isLoading: isMarketLoading,
    error: marketError,
  } = useQuery({
    queryKey: ["diamondPriceData", params],
    queryFn: () => getDiamondMarketData(params),
  });

  useEffect(() => {
    if (diamondError || marketError) {
      toast.info(
        "The diamond corresponding to the fields could not be found.",
        {
          position: "bottom-right",
        },
      );
    }
  }, [diamondError, marketError]);

  return (
    <Container
      style={{ marginTop: "30px", marginBottom: "40px", position: "relative" }}
    >
      <ToastContainer containerId="calculation" />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <CalculateInputForm setParams={setParams} />
        </Grid>
        <Grid item xs={12} md={8}>
          <CalculateOutputForm
            diamondData={diamondData}
            isDiamondLoading={isDiamondLoading}
            diamondError={diamondError}
            marketData={marketData}
            isMarketLoading={isMarketLoading}
            marketError={marketError}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CalculatePage;
