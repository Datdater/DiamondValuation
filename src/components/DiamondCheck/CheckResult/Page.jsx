import diamond1 from "../../../assets/images/diamond1.png";
import dimond2 from "../../../assets/images/dimond2.png";
import diamond3 from "../../../assets/images/diamond3.png";
import DiamondCheckResultForm from "./ResultForm.jsx";
import ImageGallery from "../CheckResult/ImageForm";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDiamondCheckByCertificateId } from "../../../services/api.js";
import DiamondDetails from "./DiamondDetails.jsx";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../../services/firebase.js";

const DiamondCheckResultPage = () => {
  const { certificateID } = useParams();
  console.log(certificateID);
  const [diamondData, setDiamondData] = useState(null);
  const [uploadedDiamondImages, setUploadedDiamondImages] = useState([]);

  const images = [
    {
      img: diamond1,
      title: "First Diamond Image",
    },
    {
      img: dimond2,
      title: "Second Diamond Image",
    },
    {
      img: diamond3,
      title: "Thirst Diamond Image",
    },
  ];

  useEffect(() => {
    const fetchDiamondData = async () => {
      const data = await getDiamondCheckByCertificateId(certificateID);
      console.log("diamond: ", data.id); // Log the data for now, you can handle it as needed
      setDiamondData(data);
    };
    fetchDiamondData();
  }, [certificateID]);

  useEffect(() => {
    const getListAllImages = async (id) => {
      const imageLinks = `diamonds/${id}/images`;
      console.log("imageLinks: ", imageLinks);
      const listRef = ref(storage, imageLinks);

      try {
        const res = await listAll(listRef);
        const images = await Promise.all(
          res.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return url;
          }),
        );
        setUploadedDiamondImages(images);
      } catch (error) {
        console.error("Error getting download URL:", error);
      }
    };

    // Only attempt to list all images if diamondData is not null and has an id
    if (diamondData && diamondData.id) {
      getListAllImages(diamondData.id);
    }
  }, [diamondData]);

  console.log("uploadedDiamondImages: ", uploadedDiamondImages);

  return (
    <Box
      display="flex"
      flexDirection="column"
      marginY="50px"
      marginLeft="120px"
      justifyContent="space-between"
    >
      <Box
        display="flex"
        flexDirection="row"
        width="100%"
        justifyContent="space-between"
      >
        <Box width="50%">
          <ImageGallery
            images={
              uploadedDiamondImages.length > 0 ? uploadedDiamondImages : images
            }
          />
        </Box>
        <Box width="50%" marginLeft="70px">
          {diamondData && (
            <DiamondCheckResultForm
              certificateId={diamondData.certificateId}
              priceEstimate={diamondData.fairPrice}
              minPrice={diamondData.minPrice}
              maxPrice={diamondData.maxPrice}
              cut_score={diamondData.cutScore}
              shape={diamondData.shape}
              carat={diamondData.caratWeight}
              color={diamondData.color}
              clarity={diamondData.clarity}
              fluorescence={diamondData.fluorescence}
              symmetry={diamondData.symmetry}
              polish={diamondData.polish}
              lab="GIA"
            />
          )}
        </Box>
      </Box>
      <Box marginTop="40px">
        {diamondData && (
          <DiamondDetails
            certificateDate={diamondData.certificateDate}
            certificateId={diamondData.certificateId}
            shape={diamondData.shape}
            carat={diamondData.caratWeight}
            color={diamondData.color}
            clarity={diamondData.clarity}
            cut={diamondData.cut}
            cut_score={diamondData.cutScore}
            polish={diamondData.polish}
            symmetry={diamondData.symmetry}
            fluorescence={diamondData.fluorescence}
            clarityCharacteristic={diamondData.clarityCharacteristic}
          />
        )}
      </Box>
    </Box>
  );
};

export default DiamondCheckResultPage;
