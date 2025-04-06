import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import about_1 from "../assets/images/about_1.png";
import about_2 from "../assets/images/about_2.png";
import about_3 from "../assets/images/about_3.png";
import about_4 from "../assets/images/about_4.png";

const About = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: "1252px", margin: "5px auto 50px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            sx={{
              color: "#072753",
              fontSize: "27px",
              fontWeight: "bold",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            About Us
          </Typography>
          <Typography
            sx={{
              color: "#4f6484",
            }}
          >
            H&TDiamond began as a personal quest to find the right diamond at a
            fair price. Nowadays we&#39;re helping our users discover their
            perfect diamond at the lowest price from the top online jewelers.
            Every day we algorithmically search through millions of diamonds to
            find the best deals without compromising on quality.
            <br />
            <br />
            Our business model is similar to Kayak or SeatGeek: free for you
            (the user), and we make a small fee from the jewelers only if you
            purchase a diamond from their site. We experienced how stressful
            this search process can be firsthand. Our goal is to make your
            search easier and align our interests with yours.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            sx={{
              width: "100%",
              height: "300px",
            }}
            alt="Image"
            src={about_1}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} marginTop="30px">
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            sx={{
              width: "100%",
              height: "300px",
            }}
            alt="Image"
            src={about_2}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            sx={{
              color: "#072753",
              fontSize: "27px",
              fontWeight: "bold",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            Outstanding Service
          </Typography>

          <Typography
            sx={{
              color: "#4f6484",
            }}
          >
            We cherish our customers like family. Our dedicated team follows a
            simple principle: providing exceptional care, contributing to their
            happiness, and ensuring fairness. In a world where genuine
            connections are rare, we value the art of building authentic
            relationships. We want our customers to feel like they are part of
            the family.
            <br />
            <br />
            Jewelry holds profound emotional significance. It accompanies us
            during life&#39;s most treasured moments, from engagements to
            anniversaries, birthdays to heirlooms. We deeply understand the
            importance and intimacy of these events, and we consider it a
            privilege to be a part of them. Trust us to honor your milestones
            with the utmost care and dedication.
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} marginTop="30px">
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            sx={{
              color: "#072753",
              fontSize: "27px",
              fontWeight: "bold",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            A Memorable Experience
          </Typography>
          <Typography
            sx={{
              color: "#4f6484",
            }}
          >
            Explore enchanting natural ethically-sourced GIA certified diamonds
            and exquisite jewelry at our exclusive store in . By appointment
            only, we offer a private and personalized experience, ensuring
            utmost privacy and undivided attention.
            <br />
            <br /> With our thoughtful service, exceptional care, and unbeatable
            value, every visit promises a satisfying and delightful
            consultation. Build a special relationship that spans a lifetime of
            diamond and jewel-worthy milestones and successes. Schedule your
            appointment today for an intimate and unforgettable experience.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            sx={{
              width: "100%",
              height: "300px",
            }}
            alt="Image"
            src={about_3}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} marginTop="30px">
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            sx={{
              width: "100%",
              height: "300px",
            }}
            alt="Image"
            src={about_4}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            sx={{
              color: "#072753",
              fontSize: "27px",
              fontWeight: "bold",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            Get To Know Us
          </Typography>
          <Typography
            sx={{
              color: "#4f6484",
            }}
          >
            Throughout the years, our commitment to customers and the joy we
            share with them remains steadfast. Our studio exudes warmth and
            intimacy, ensuring that each person feels truly special and valued.
            Just like diamonds, our relationships with customers endure,
            celebrating their most cherished milestones with everlasting
            brilliance. Join us in creating unforgettable memories that shine
            bright for a lifetime. Explore our exquisite collection of quality
            diamonds, precious gems, and fine jewelry. Plan your visit today
            schedule an appointment online or call our store at 703-536-3600
            during our store hours. We look forward to working with you.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
