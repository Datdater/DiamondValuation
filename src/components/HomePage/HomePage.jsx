import React from "react";
import Poster from "./Poster.jsx";
import Supplier from "./Supplier.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllServices, getSupplier } from "../../services/api.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1000 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ArrowButton = styled("button")(({ theme }) => ({
  filter: "blur(2px)",
  transition: "filter 0.3s ease, opacity 0.3s ease",
  "&:hover": {
    filter: "blur(0)",
    opacity: 0.7,
  },
  "&::before": {
    color: theme.palette.primary.main,
  },
}));

function HomePage() {
  const navigate = useNavigate();

  const handleServiceClick = (serviceID) => {
    navigate(`/price?serviceID=${serviceID}`);
  };

  const { data: services, isLoading: isServicesLoading } = useQuery({
    queryKey: ["services"],
    queryFn: () => getAllServices(),
  });

  const { data: suppliers, isLoading: isSupplierLoading } = useQuery({
    queryKey: ["supplier"],
    queryFn: () => getSupplier(),
  });

  if (isServicesLoading || isSupplierLoading) {
    return <UICircularIndeterminate />;
  }

  return (
    <div style={{ overflowX: "hidden" }}>
      <div>
        <Poster />
      </div>
      <Box sx={{ paddingX: "50px" }}>
        <Typography
          sx={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#003565",
            margin: "20px 50px",
            textAlign: "center",
          }}
        >
          Our Services
        </Typography>
        <Carousel
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={2000}
          infinite={true}
          keyBoardControl={true}
          customLeftArrow={
            <ArrowButton className="react-multiple-carousel__arrow--left" />
          }
          customRightArrow={
            <ArrowButton className="react-multiple-carousel__arrow--right" />
          }
        >
          {services?.map((service) => (
            <Box
              key={service.id}
              sx={{
                backgroundColor: "white",
                height: "200px",
                padding: "20px",
                cursor: "pointer",
                marginLeft: "20px",
              }}
              onClick={() => handleServiceClick(service.id)}
            >
              <Typography
                sx={{
                  fontSize: 23,
                  fontWeight: "bold",
                  color: "#003565",
                  textAlign: "center",
                }}
              >
                {service.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: 17,
                  color: "#4f6484",
                  textAlign: "center",
                }}
              >
                {service.description}
              </Typography>
            </Box>
          ))}
        </Carousel>
      </Box>
      <Box>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyItems: "center",
            //alignItems: "center",
            alignContent: "center",
            marginLeft: "65px",
          }}
          gap="50px"
        >
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "5px",
              marginTop: "50px",
              marginLeft: "40px",
            }}
          >
            <Link to="/check">
              <Typography
                sx={{
                  fontSize: 23,
                  fontWeight: "bold",
                  color: "#003565",
                  textAlign: "center",
                }}
              >
                Diamond Check
              </Typography>
              <Typography
                sx={{
                  fontSize: 17,
                  color: "#4f6484",
                  textAlign: "center",
                }}
              >
                Use our Check tool to automatically verify the Fair Price, Cut
                Score, and Visual Carat size of certified loose diamond. Simply
                enter the report number (found on the diamond’s Certificate) and
                you’ll receive custom analysis of your diamond. We’ll also run a
                diamond valuation code check on the H&TDiamond’s website and
                show you all of the details on your diamond to help ensure have
                all of the info you need in one place.
              </Typography>
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "5px",
              marginTop: "50px",
              //marginLeft: "20px",
            }}
          >
            <Link to="/calculate">
              <Typography
                sx={{
                  fontSize: 23,
                  fontWeight: "bold",
                  color: "#003565",
                  textAlign: "center",
                }}
              >
                Calculator
              </Typography>
              <Typography
                sx={{
                  fontSize: 17,
                  color: "#4f6484",
                  textAlign: "center",
                }}
              >
                Use our free diamond price calculator to estimate the current
                retail price for diamonds. Our price estimates are updated daily
                based on our massive database of online jeweler inventory
                sourced from top-rated jewelers. To see more diamond data and
                up-to-date price charts, visit our diamond price indexes page.
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
      <div style={{ margin: "50px 0" }}>
        <Supplier />
      </div>
    </div>
  );
}

export default HomePage;
