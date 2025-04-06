import PriceTable from "./Table.jsx";
import { useQuery } from "@tanstack/react-query";
import { getAllServices, getServiceByID } from "../../services/api.js";
import { PriceListHeadCells } from "../../utilities/Table.js";
import { useEffect, useRef } from "react";
import ServiceDetailsTable from "./ServiceDetailTable.jsx";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";

const Price = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const serviceIDFromURL = searchParams.get("serviceID");

  const { data: services, isLoading: isServicesLoading } = useQuery({
    queryKey: ["services"],
    queryFn: () => getAllServices(),
  });

  const {} = useQuery({
    queryKey: ["service"],
    queryFn: () => getServiceByID(),
  });

  const serviceRefs = useRef({});

  useEffect(() => {
    if (serviceIDFromURL) {
      const serviceElement = serviceRefs.current[serviceIDFromURL];
      if (serviceElement) {
        serviceElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [serviceIDFromURL, services]);

  const handleServiceClick = (serviceID) => {
    const serviceElement = serviceRefs.current[serviceID];
    if (serviceElement) {
      serviceElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const serviceRows = services?.map((row, index) => {
    return {
      number: row.id,
      service: row.name,
      price: row.price,
      description: row.description,
      period: row.period,
    };
  });

  return (
    <Box
      sx={{
        paddingX: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <Box
        sx={{
          width: "80%",
        }}
      >
        <PriceTable
          rows={serviceRows}
          headCells={PriceListHeadCells}
          title="SERVICES LIST"
          onRowClick={handleServiceClick}
        />
        {services?.map((service) => (
          <div
            key={service.id}
            ref={(el) => (serviceRefs.current[service.id] = el)}
            style={{ marginTop: "50px" }}
          >
            <ServiceDetailsTable serviceID={service.id} />
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default Price;
