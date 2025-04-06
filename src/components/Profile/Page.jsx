// IMPORTS
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProfileCard from "./ProfileCard.jsx";
import Drawer from "../UI/Drawer.jsx";
import { useSelector } from "react-redux";
import { getCustomer } from "../../services/api.js";
import { useQuery } from "@tanstack/react-query";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";

// STYLE & THEME
const theme = createTheme();

// PAGE
export default function ProfilePage() {
  const { id } = useSelector((state) => state.auth.user);

  // Query for information of customer
  const {
    data: customer,
    isLoading: isCustomerLoading,
    error: customerError,
  } = useQuery({
    queryKey: ["customerProfile", { customerId: id }],
    queryFn: () => getCustomer(id),
  });

  const [text, setText] = useState("");

  if (isCustomerLoading) {
    return <UICircularIndeterminate />;
  }

  if (customerError) {
    return <div>Error loading customer data</div>;
  }

  const mainUser = {
    username: customer?.account?.username || "",
    firstName: customer?.firstName || "",
    lastName: customer?.lastName || "",
    phone: customer?.phone?.trim() || "",
    email: customer?.account?.email || "",
    address: customer?.address || "",
    identityDocument: customer?.identityDocument?.trim() || "",
    avatar: customer?.avatar || "",
    customerID: customer?.id || "",
    authID: customer?.account?.id || "",
  };
  //console.log(mainUser);
  //console.log(mainUser.customerID);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        {/* MAIN GRID */}
        <Grid container direction="row">
          {/* DRAWER */}
          <Grid item xs={2}>
            <Drawer />
          </Grid>

          {/* CONTENT */}
          <Grid item xs={9.5} overflow="hidden" sx={{ marginBottom: "40px" }}>
            {/* BACKGROUND */}
            <Grid container direction="column" sx={{ marginLeft: "65px" }}>
              {/* COMPONENTS */}
              <Grid
                container
                direction={{ xs: "column", md: "row" }}
                sx={{
                  position: "relative",
                  px: { xs: 2, md: 7 },
                }}
              >
                {/* SETTINGS CARD */}
                <Grid item xs={12}>
                  <ProfileCard
                    expose={(v) => setText(v)}
                    firstName={mainUser.firstName}
                    lastName={mainUser.lastName}
                    address={mainUser.address}
                    phone={mainUser.phone}
                    email={mainUser.email}
                    identityDocument={mainUser.identityDocument}
                    avatar={mainUser.avatar}
                    username={mainUser.username}
                    customerID={mainUser.customerID}
                    authID={mainUser.authID}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CssBaseline>
    </ThemeProvider>
  );
}
