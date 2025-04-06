import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import { getBlogById } from "../../services/api";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";

const BlogDetail = () => {
  const { blogID } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(blogID);
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogID]);

  if (loading) {
    return <UICircularIndeterminate />;
  }

  if (!blog) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", marginTop: "20px" }}>
        Blog not found
      </Typography>
    );
  }

  return (
    <Container
      sx={{
        margin: "20px auto",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "800px", // Ensure the container does not exceed the max width
        padding: "0 16px", // Add padding for better spacing
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        {blog.title}
      </Typography>
      <Box
        component="img"
        sx={{
          width: "100%", // Make the image responsive
          maxWidth: 500, // Limit the max width of the image
          height: "auto",
          flexShrink: 0,
        }}
        alt="Thumbnail"
        src={blog.thumbnail}
      />
      <Box
        dangerouslySetInnerHTML={{
          __html: blog.content,
        }}
        variant="body1"
        sx={{ textAlign: "justify" }}
      />
      {}
    </Container>
  );
};

export default BlogDetail;
