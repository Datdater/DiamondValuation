import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { getDownloadURL, ref as loadImageRef } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Margin, Resolution, usePDF } from "react-to-pdf";
import logo from "../../../assets/images/logo.png";
import { getValuationRequestDetails } from "../../../services/api.js";
import { storage } from "../../../services/firebase.js";
import { clarityCharacteristicConverter } from "../../../utilities/Status.jsx";
import UICircularIndeterminate from "../../UI/CircularIndeterminate.jsx";
import { useParams } from "react-router-dom";

const RecordScreenResult = () => {
  // Image Links
  const [proportionImages, setProportionImages] = useState(null);
  const [clarityCharacteristicImages, setClarityCharacteristicImages] =
    useState(null);
  const { valuationCode } = useParams();

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

  const { data: requestDetails, isLoading: isValuationRequestLoading } =
    useQuery({
      queryKey: ["requestDetails", { requestId: valuationCode }],
      queryFn: () => getValuationRequestDetails(valuationCode),
    });

  useEffect(() => {
    console.log("requestDetails", requestDetails);
  }, [requestDetails]);

  const loadImage = async (imagePath, setLink) => {
    const imageRef = loadImageRef(storage, imagePath);
    try {
      const url = await getDownloadURL(imageRef);
      setLink(url);
    } catch (error) {
      console.error("Error loading image by path:", error);
    }
  };

  useEffect(() => {
    if (requestDetails?.diamondValuationNote) {
      loadImage(
        requestDetails.diamondValuationNote.proportions,
        setProportionImages,
      );
      loadImage(
        requestDetails.diamondValuationNote.clarityCharacteristicLink,
        setClarityCharacteristicImages,
      );
    }
  }, [requestDetails]);

  if (isValuationRequestLoading) {
    return <UICircularIndeterminate />;
  }

  return (
    <div>
      <div ref={targetRef}>
        <main
          key={requestDetails.id}
          className="mt-5 mb-5 flex w-full flex-col h-[190vh] bg-white shadow-xl shadow-black/10"
        >
          <div className="mt-5 mb-2 flex flex-row items-center justify-center">
            <img src={logo} alt={"H&T Diamond"} className="h-20 w-auto" />
          </div>
          <h1 className="text-center text-2xl text-slate-800">H&T Diamond</h1>
          <p className="pt-1 text-center text-slate-400 h-[35px]">
            Valuation #{requestDetails.id}
          </p>
          <div className="flex-grow rounded-2xl rounded-t-none bg-white p-12">
            <div>
              <div>
                <p className="mb-1 p-0">
                  <b>Diamond Attribute</b>
                </p>
                <div className="flex gap-10">
                  <div className="flex w-1/2">
                    <div className="w-1/2">
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
                        {requestDetails.diamondValuationNote?.diamondOrigin ||
                          "N/A"}
                      </p>
                      <p className="mb-1 p-0">
                        {requestDetails.diamondValuationNote?.caratWeight ||
                          "N/A"}
                      </p>
                      <p className="mb-1 p-0">
                        {requestDetails.diamondValuationNote?.color || "N/A"}
                      </p>
                      <p className="mb-1 p-0">
                        {requestDetails.diamondValuationNote?.clarity || "N/A"}
                      </p>
                      <p className="mb-1 p-0">
                        {requestDetails.diamondValuationNote?.cut || "N/A"}
                      </p>
                      <p className="mb-1 p-0">
                        {requestDetails.diamondValuationNote?.shape || "N/A"}
                      </p>
                      <p className="mb-1 p-0">
                        {requestDetails.diamondValuationNote?.polish || "N/A"}
                      </p>
                      <p className="mb-1 p-0">
                        {requestDetails.diamondValuationNote?.symmetry || "N/A"}
                      </p>
                      <p className="mb-1 p-0">
                        {requestDetails.diamondValuationNote?.fluorescence ||
                          "N/A"}
                      </p>
                      <p className="mb-1 p-0">
                        {clarityCharacteristicConverter(
                          requestDetails.diamondValuationNote
                            ?.clarityCharacteristic || [],
                        )
                          .map((clarity) => clarity.label)
                          .join(", ") || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div>
                      <img
                        src={proportionImages}
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
              <div className="my-4 h-px" />
              <div>
                <div>
                  <img
                    src={clarityCharacteristicImages}
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
                      requestDetails.diamondValuationNote
                        ?.clarityCharacteristic || [],
                    ).map((clarity) => (
                      <Grid key={clarity.code} item>
                        <Stack
                          direction="row"
                          sx={{
                            alignItems: "center",
                            height: 30,
                            gap: 0.5,
                            //border: "1px solid #e0e0e0",
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
                    ))}
                  </Grid>
                </div>
              </div>
              <div className="my-4 h-px bg-gray-300" />
            </div>
            <div className="rounded-md bg-slate-100 py-2">
              <table className="w-full">
                <tbody>
                  <tr className="font-bold text-slate-700">
                    <td className="py-4">Estimated Retail Replacement Value</td>
                    <td className="py-4">
                      {formattedMoney(requestDetails.valuationPrice)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr className="my-6" />
            This is some additional content to inform you that Acme Inc. is a
            fake company and this is a fake receipt. This is just a demo to show
            you how you can create a beautiful receipt with Onedoc.
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecordScreenResult;
