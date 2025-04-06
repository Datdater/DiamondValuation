import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { getDownloadURL, ref as loadImageRef } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { Margin, Resolution, usePDF } from "react-to-pdf";
import logo from "../../assets/images/logo.png";
import { getValuationRequest } from "../../services/api.js";
import { storage } from "../../services/firebase.js";
import { clarityCharacteristicConverter } from "../../utilities/Status.jsx";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";

const RecordScreenResult = ({ requestId }) => {
  // Image Links
  const [proportionImages, setProportionImages] = useState([]);
  const [clarityCharacteristicImages, setClarityCharacteristicImages] =
    useState([]);
  const formattedMoney = (money) => {
    if (money === "N/A" || money === 0) {
      return "N/A";
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(money);
  };

  // PDF render
  const options = {
    // default is `save`
    filename: "ahi.pdf",
    method: "open",
    resolution: Resolution.HIGH,
    page: {
      margin: Margin.SMALL,
      format: "letter",
      orientation: "portrait",
    },
    canvas: {
      mimeType: "image/png",
      qualityRatio: 1,
    },
    overrides: {
      pdf: {
        compress: true,
      },
      canvas: {
        useCORS: true,
      },
    },
  };
  const { toPDF, targetRef } = usePDF(options);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const { data: request, isLoading: isValuationRequestLoading } = useQuery({
    queryKey: ["request", { requestId: requestId }],
    queryFn: () => getValuationRequest(requestId),
    select: (data) => {
      return {
        ...data,
        valuationRequestDetails: data?.valuationRequestDetails.filter(
          (item) => item.status === "APPROVED",
        ),
      };
    },
  });

  console.log(request);
  const loadImage = async (imagePath, setLink) => {
    const imageRef = loadImageRef(storage, imagePath);
    try {
      const url = await getDownloadURL(imageRef);
      setLink((prev) => [...prev, url]);
    } catch (error) {
      console.error("Error loading image by path:", error);
    }
  };
  const valuationRequestDetails = request?.valuationRequestDetails;

  useEffect(() => {
    if (proportionImages.length === 0 && valuationRequestDetails !== null) {
      for (let i = 0; i < valuationRequestDetails?.length; i++) {
        loadImage(
          valuationRequestDetails[i].diamondValuationNote.proportions,
          setProportionImages,
        );
      }
    }
    if (
      clarityCharacteristicImages.length === 0 &&
      valuationRequestDetails !== null
    ) {
      for (let i = 0; i < valuationRequestDetails?.length; i++) {
        loadImage(
          valuationRequestDetails[i].diamondValuationNote
            .clarityCharacteristicLink,
          setClarityCharacteristicImages,
        );
      }
    }
  }, [valuationRequestDetails]);
  console.log(clarityCharacteristicImages);

  const ref = useRef(); // Create a reference

  if (isValuationRequestLoading) {
    return <UICircularIndeterminate />;
  }
  return (
    <div className={"w-full"}>
      <div ref={targetRef} className={"w-full"}>
        {valuationRequestDetails?.map((item, index) => (
          <main
            key={item.id}
            className="mt-19 flex w-full flex-col text-slate-800 h-[161vh]"
          >
            <div className="mb-2 flex flex-row items-center justify-center">
              <img src={logo} alt={"H&T Diamond"} className="h-20 w-auto" />
            </div>
            <h1 className="text-center text-2xl text-slate-800">H&T Diamond</h1>
            <p className="pt-1 text-center text-slate-400 h-[35px]">
              Valuation #{item.id}
            </p>
            <div className="flex-grow rounded-2xl rounded-t-none bg-white p-12 shadow-xl shadow-black/10">
              <div className="">
                <div>
                  <p className="mb-1 p-0">
                    <b>Diamond Attribute</b>
                  </p>
                  <div className="flex gap-10">
                    <div className="flex w-1/2">
                      <div className="w-1/2">
                        <p className="mb-1 p-0">Certificate Id</p>
                        <p className="mb-1 p-0">Certificate Date</p>
                        <p className="mb-1 p-0">Diamond Origin</p>
                        <p className="mb-1 p-0">Carat</p>
                        <p className="mb-1 p-0">Color</p>
                        <p className="mb-1 p-0">Clarity</p>
                        <p className="mb-1 p-0">Cut</p>
                        <p className="mb-1 p-0">Shape</p>
                        <p className="mb-1 p-0">Polish</p>
                        <p className="mb-1 p-0">Symmetry</p>
                        <p className="mb-1 p-0">Fluorescence</p>
                        <p className="mb-1 p-0">Clarity Characteristics</p>
                      </div>
                      <div className="w-1/2 text-right">
                        <p className="mb-1 p-0">
                          {item.diamondValuationNote.certificateId}
                        </p>
                        <p className="mb-1 p-0">
                          {formatDate(
                            item.diamondValuationNote.certificateDate,
                          )}
                        </p>
                        <p className="mb-1 p-0">
                          {item.diamondValuationNote.diamondOrigin}
                        </p>
                        <p className="mb-1 p-0">
                          {item.diamondValuationNote.caratWeight}
                        </p>
                        <p className="mb-1 p-0">
                          {item.diamondValuationNote.color}
                        </p>
                        <p className="mb-1 p-0">
                          {item.diamondValuationNote.clarity}
                        </p>
                        <p className="mb-1 p-0">
                          {item.diamondValuationNote.cut}
                        </p>
                        <p className="mb-1 p-0">
                          {item.diamondValuationNote.shape}
                        </p>
                        <p className="mb-1 p-0">
                          {item.diamondValuationNote.polish}
                        </p>
                        <p className="mb-1 p-0">
                          {item.diamondValuationNote.symmetry}
                        </p>
                        <p className="mb-1 p-0">
                          {item.diamondValuationNote.fluorescence}
                        </p>
                        <p className="mb-1 p-0">
                          {clarityCharacteristicConverter(
                            item.diamondValuationNote.clarityCharacteristic,
                          )
                            .map((item) => item.label)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="">
                        <img
                          src={proportionImages[index]}
                          alt={"Proportion"}
                          loading="lazy"
                          style={{
                            height: "auto",
                            width: "100%",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-4 h-px bg-gray-300" />
                <div>
                  <div>
                    <img
                      src={clarityCharacteristicImages[index]}
                      alt={"Clarity Characteristic"}
                      loading="lazy"
                      style={{
                        height: "auto",
                        width: "70%",
                        objectFit: "cover",
                        cursor: "pointer",
                        margin: "0 auto",
                      }}
                    />
                    <Grid container spacing={0.5} justifyContent="center">
                      {clarityCharacteristicConverter(
                        item.diamondValuationNote.clarityCharacteristic,
                      ).map((clarity, index) => {
                        return (
                          <Grid key={clarity.code} item>
                            <Stack
                              direction="row"
                              sx={{
                                alignItems: "center",
                                height: 30,
                                gap: 0.5,
                                border: "1px solid #e0e0e0",
                                p: 1,
                              }}
                            >
                              <img
                                src={clarity.image}
                                alt={clarity.label}
                                style={{
                                  width: "auto",
                                  height: "100%",
                                  objectFit: "contain",
                                }}
                              />
                              <Typography sx={{ color: "gray" }}>
                                {clarity.label}
                              </Typography>
                            </Stack>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </div>
                </div>
                <div className="my-4 h-px bg-gray-300" />
              </div>
              <div className="rounded-md bg-slate-100 py-2">
                <table className="w-full">
                  <tbody>
                    <tr className="font-bold text-slate-700">
                      <td className="py-4">
                        Estimated Retail Replacement Value
                      </td>
                      <td className="py-4">
                        {formattedMoney(item.valuationPrice)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <hr className="my-6" />
              Diamonds are valued based on the 4Cs: Carat (weight), Clarity
              (clarity), Color, and Cut. This information helps determine the
              accurate value of your diamond. Please note that this value is for
              reference only and may change based on the market.
            </div>
          </main>
        ))}
      </div>
    </div>
  );
};

export default RecordScreenResult;
