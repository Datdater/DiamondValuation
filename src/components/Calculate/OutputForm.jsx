import { Box, IconButton, Typography } from "@mui/material";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";
import { useState } from "react";
import stonealgo from "../../assets/images/stonealgo.png";
import rockher from "../../assets/images/rockher.png";
import daniel from "../../assets/images/daniel.png";
import friendly from "../../assets/images/friendly.png";
import allurez from "../../assets/images/allurez.png";
import adiamor from "../../assets/images/adiamor.png";
import dreamstone from "../../assets/images/dreamstone.png";
import diamond1 from "../../assets/images/diamond1.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getSupplierByID } from "../../services/api.js";
import { useQuery } from "@tanstack/react-query";

export const CalculateOutputForm = ({
  diamondData,
  isDiamondLoading,
  diamondError,
  marketData,
  isMarketLoading,
}) => {
  const formattedMoney = (money) => {
    if (money === "N/A" || money === 0) {
      return "N/A";
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(money);
  };

  // Nếu diamondData không tồn tại hoặc có lỗi, trả về giá trị mặc định
  if (!diamondData || diamondError) {
    diamondData = {
      fairPrice: "N/A",
      pricePerCarat: "N/A",
      minPrice: "N/A",
      maxPrice: "N/A",
      shape: "ROUND",
      caratWeight: "1",
      color: "G",
      clarity: "VS1",
    };
  }

  const fairPriceFormat = formattedMoney(diamondData.fairPrice);
  const estimatePerCaratFormat = formattedMoney(diamondData.pricePerCarat);
  const minPriceFormat = formattedMoney(diamondData.minPrice);
  const maxPriceFormat = formattedMoney(diamondData.maxPrice);

  const [visibleCount, setVisibleCount] = useState(5);

  const supplierImages = {
    1: stonealgo,
    2: rockher,
    3: daniel,
    4: friendly,
    5: allurez,
    6: adiamor,
    7: dreamstone,
  };

  const { data: supplier, isLoading: isSupplierLoading } = useQuery({
    queryKey: ["supplierByID"],
    queryFn: () => getSupplierByID(marketData[0].supplierId),
  });
  console.log(supplier);

  if (isDiamondLoading || isMarketLoading || isSupplierLoading)
    return (
      <Box
        sx={{
          width: 723,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          left: 120,
        }}
      >
        <UICircularIndeterminate />
      </Box>
    );
  console.log(marketData)

  return (
    <Box
      sx={{
        position: "relative",
        width: 743,
        left: 80,
        height: 850,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          fontWeight: "bold",
          color: "#171a1f",
          fontSize: 22,
        }}
      >
        Calculator Output
      </Box>
      <Box
        sx={{
          position: "absolute",
          width: 740,
          height: 310,
          top: 35,
          left: 3,
          boxShadow: "0px 0px 1px #171a1f12, 0px 0px 2px #171a1f1f",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            width: 740,
            height: 205,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            backgroundColor: "white",
            borderRadius: 1,
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: 30,
              fontFamily: "Epilogue-Bold, Helvetica",
              fontWeight: "bold",
              fontSize: 18,
              color: "#171a1f",
            }}
          >
            Fair Price Estimate
          </Typography>
          <Typography
            sx={{
              position: "absolute",
              top: 63,
              fontFamily: "Epilogue-Bold, Helvetica",
              fontWeight: "bold",
              fontSize: 57,
              lineHeight: "74px",
              color: "#171a1f",
            }}
          >
            {fairPriceFormat}
          </Typography>

          <Typography
            sx={{
              position: "absolute",
              top: 146,

              fontSize: 12,
              lineHeight: "20px",
              color: "#9095a0",
            }}
          >
            {`${diamondData.shape} ${diamondData.caratWeight} Carat ${diamondData.color} ${diamondData.clarity}`}
          </Typography>
          <Box
            variant="contained"
            sx={{
              textAlign: "center",
              position: "absolute",
              width: 98,
              height: 20,
              top: 170,
              backgroundColor: "#c8e6c9",
              borderRadius: 1,
              textTransform: "none",

              fontSize: 11,
              lineHeight: "18px",
              color: "#00c853",
            }}
          >
            Natural Diamond
          </Box>
        </Box>
        <Box
          sx={{
            width: "50%",
            height: 103,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 206,
            backgroundColor: "#f5f5f5",
            boxShadow: "0px 0px 1px #171a1f12, 0px 0px 2px #171a1f1f",
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: 24,

              color: "#9095a0",
              fontSize: 12,
              lineHeight: "20px",
            }}
          >
            Estimate Range
          </Typography>
          <Typography
            sx={{
              position: "absolute",
              top: 53,

              color: "#171a1f",
              fontSize: 15,
              lineHeight: "24px",
              textAlign: "center",
            }}
          >
            {minPriceFormat} - {maxPriceFormat}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "50%",
            height: 103,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 206,
            left: 370,
            backgroundColor: "#f5f5f5",
            boxShadow: "0px 0px 1px #171a1f12, 0px 0px 2px #171a1f1f",
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: 24,

              color: "#9095a0",
              fontSize: 12,
              lineHeight: "20px",
            }}
          >
            Estimate Price per Carat
          </Typography>
          <Typography
            sx={{
              position: "absolute",
              top: 52,

              fontSize: 16,
              lineHeight: "26px",
              color: "#171a1f",
            }}
          >
            {estimatePerCaratFormat}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            top: 320,
            left: 5,

            color: "#9095a0",
            fontSize: 10,
          }}
        >
          Sponsored
        </Typography>
        <Box
          sx={{
            top: 340,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            backgroundColor: "white",
            paddingTop: "10px",
            marginBottom: "100px",
          }}
        >
          {marketData &&
            marketData.slice(0, visibleCount).map((diamond, index) => (
              <Box
                sx={{
                  width: "98%",
                  height: 86,
                  borderRadius: 1,
                  boxShadow: "0px 0px 1px #171a1f12, 0px 0px 2px #171a1f1f",
                  border: "1px solid black",
                  marginBottom: "10px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0px 10px",
                }}
                key={index}
              >
                <Box
                  sx={{
                    width: 70,
                    height: 58,
                    top: 10,
                    left: 7,
                  }}
                >
                  <img
                    src={diamond.diamondImage ? diamond1 : diamond.diamondImage}
                    alt="diamond"
                  />
                </Box>

                <Box
                  sx={{
                    width: 60,
                    top: 23,
                    left: 107,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      top: 20,
                      color: "#171a1f",
                      fontSize: 9,
                    }}
                  >
                    CUT SCORE
                  </Typography>
                  <Typography
                    sx={{
                      left: 16,
                      color: "#6a63ee",
                      fontSize: 14,
                    }}
                  >
                    {diamond.cutScore}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    top: 43,
                    left: 207,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      top: 43,
                      left: 207,
                      color: "#171a1f",
                      fontSize: 9,
                      lineHeight: "14px",
                    }}
                  >
                    CARAT
                  </Typography>
                  <Typography
                    sx={{
                      top: 23,
                      left: 208,
                      color: "#171a1f",
                      fontSize: 14,
                      lineHeight: "20px",
                    }}
                  >
                    {diamond.caratWeight}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 39,
                    height: 35,
                    top: 23,
                    left: 275,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      top: 21,
                      color: "#171a1f",
                      fontSize: 9,
                      lineHeight: "14px",
                    }}
                  >
                    CLARITY
                  </Typography>
                  <Typography
                    sx={{
                      left: 7,
                      color: "#171a1f",
                      fontSize: 14,
                      lineHeight: "22px",
                    }}
                  >
                    {diamond.clarity}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 28,
                    height: 32,
                    top: 25,
                    left: 352,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      top: 18,
                      color: "#171a1f",
                      fontSize: 9,
                      lineHeight: "14px",
                      textAlign: "center",
                    }}
                  >
                    COLOR
                  </Typography>
                  <Typography
                    sx={{
                      left: 11,
                      color: "#171a1f",
                      fontSize: 14,
                      textAlign: "center",
                    }}
                  >
                    {diamond.color}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 96,
                    height: 27,
                    top: 29,
                    left: 446,
                  }}
                >
                  <img
                    src={supplierImages[diamond.supplierId]}
                    alt="Supplier Logo"
                    style={{ width: "100%", height: "100%" }}
                  />
                </Box>
                <Typography
                  sx={{
                    top: 32,
                    left: 620,
                    color: "#171a1f",
                    fontSize: 15,
                  }}
                >
                  {formattedMoney(diamond.price)}
                </Typography>
                <IconButton onClick={() => window.open(diamond.link, "_blank")}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CalculateOutputForm;
