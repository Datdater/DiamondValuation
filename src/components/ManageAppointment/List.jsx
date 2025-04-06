import React from "react";
import Drawer from "../UI/Drawer.jsx";
import UITable from "../UI/Table";
import { RequestHeadCells } from "../../utilities/Table.js";
import { useQuery } from "@tanstack/react-query";
import { getValuationRequestsByCustomerID } from "../../services/api.js";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

// Utility function to format date and time
const formatDateTime = (dateTimeString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Date(dateTimeString).toLocaleString(undefined, options);
};

const ValuationRequestList = () => {
  const { id } = useSelector((state) => state.auth.user);
  //console.log(id);
  const { data: requests, isFetching: isRequestFetching } = useQuery({
    queryKey: ["requests"],
    queryFn: () => getValuationRequestsByCustomerID(id),
  });

  // Handle loading state
  if (isRequestFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Map data to the format expected by UITable
  const requestRows = requests?.content.map((row, index) => {
    return {
      number: row.id,
      status: row.status,
      creationDate: formatDateTime(row.creationDate),
      returnedDate: row.returnDate ? formatDateTime(row.returnDate) : "N/A",
      diamondAmount: row.diamondAmount,
      service: row.serviceName,
    };
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "calc(100vh - 320px)",
        marginBottom: "50px",
      }}
    >
      <div style={{ marginRight: "20px" }}>
        <Drawer />
      </div>
      <UITable
        heading="All Valuations"
        rows={requestRows}
        headCells={RequestHeadCells}
        showDeleteButton={true}
      />
      <ToastContainer />
    </div>
  );
};

export default ValuationRequestList;
