import { Box, IconButton, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: "20px 60px",
        backgroundColor: "#e0e0e0",
        height: "150px",
        bottom: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <Box sx={{ flex: "1 1 100%", maxWidth: "35%" }}>
        <Typography
          variant="body1"
          sx={{
            fontSize: 16,
            color: "#9095a0",
            lineHeight: "26px",
          }}
        >
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          The world's largest diamond marketplace.
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 4,
            mt: 2,
          }}
        >
          <IconButton
            sx={{
              color: "#3b5998",
              "&:hover": { color: "#2d4373" },
            }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            sx={{
              color: "#E1306C",
              "&:hover": { color: "#C13584" },
            }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            sx={{
              color: "#1DA1F2",
              "&:hover": { color: "#0A95E8" },
            }}
          >
            <TwitterIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ flex: "1 1 auto", maxWidth: "50%" }}></Box>
      <Box sx={{ flex: "1 1 auto", maxWidth: "25%" }}>
        <Typography
          variant="body1"
          sx={{
            fontSize: 15,
            color: "#3e6272",
            lineHeight: "24px",
            mb: 1,
          }}
        >
          FEATURES
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: 16,
            color: "#9095a0",
            lineHeight: "26px",
            mb: 1,
          }}
        >
          <Link
            to="/calculate"
            style={{ textDecoration: "none", color: "#9095a0" }}
          >
            Price Calculator
          </Link>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: 16,
            color: "#9095a0",
            lineHeight: "26px",
            mb: 1,
          }}
        >
          <Link
            to="/check"
            style={{ textDecoration: "none", color: "#9095a0" }}
          >
            Price &amp; Quality Check
          </Link>
        </Typography>
      </Box>
      <Box sx={{ flex: "1 1 auto", maxWidth: "25%" }}>
        <Typography
          variant="body1"
          sx={{
            fontSize: 15,
            color: "#3e6272",
            lineHeight: "24px",
            mb: 1,
          }}
        >
          MORE
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: 16,
            color: "#9095a0",
            lineHeight: "26px",
            mb: 1,
          }}
        >
          <Link to="/blog" style={{ textDecoration: "none", color: "#9095a0" }}>
            Blog
          </Link>
        </Typography>
      </Box>

      <Box sx={{ flex: "1 1 auto", maxWidth: "25%" }}>
        <Typography
          variant="body1"
          sx={{
            fontSize: 15,
            color: "#3e6272",
            lineHeight: "24px",
            mb: 1,
          }}
        >
          COMPANY
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: 16,
            color: "#9095a0",
            lineHeight: "26px",
            mb: 1,
          }}
        >
          <Link
            to="/about"
            style={{ textDecoration: "none", color: "#9095a0" }}
          >
            About
          </Link>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: 16,
            color: "#9095a0",
            lineHeight: "26px",
          }}
        >
          <Link
            to="/rules"
            style={{ textDecoration: "none", color: "#9095a0" }}
          >
            Rules
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
