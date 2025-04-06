import { useEffect, useState } from "react";
import { Box, ImageList, ImageListItem } from "@mui/material";

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      alignItems="center"
    >
      <ImageList
        sx={{
          width: { xs: "100%", md: 150 },
          height: { xs: "auto", md: "450px" },
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          gap: 10,
        }}
        cols={1}
        rowHeight={100}
      >
        {images.map((item, index) => (
          <ImageListItem
            key={index}
            onClick={() => setSelectedImage(item)}
            sx={{
              cursor: "pointer",
              borderRadius: "6px",
            }}
          >
            <img
              src={`${item}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={`Image ${index + 1}`}
              loading="lazy"
              style={{
                borderRadius: "6px",
                height: "100px",
                width: "100px",
                objectFit: "cover",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Box sx={{ ml: { xs: 0, md: 2 }, mt: { xs: 2, md: 0 } }}>
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected"
            style={{
              width: "600px",
              height: "450px",
              borderRadius: "6px",
              objectFit: "cover",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default ImageGallery;
