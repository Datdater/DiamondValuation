function createValuationRequest(
    id,
    requestNumber,
    status,
    creationDate,
    diamondAmount,
    service,
) {
    return {
        id,
        requestNumber,
        status,
        creationDate,
        diamondAmount,
        service,
    };
}

const statuses = ["Pending", "Processing"];
const services = ["Fast", "Standard", "Premium"];

export const rows = Array.from({ length: 20 }, (_, i) => {
    const id = i + 1;
    const requestNumber = `VR${id}`;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const creationDate = new Date().toLocaleDateString();
    const diamondAmount = Math.floor(Math.random() * 100);
    const service = services[Math.floor(Math.random() * services.length)];

    return createValuationRequest(
        id,
        requestNumber,
        status,
        creationDate,
        diamondAmount,
        service,
    );
});

export const headCells = [
    {
        id: "requestNumber",
        numeric: false,
        disablePadding: true,
        label: "Number",
    },
    {
        id: "status",
        numeric: false,
        disablePadding: false,
        label: "Status",
    },
    {
        id: "creationDate",
        numeric: false,
        disablePadding: false,
        label: "Date",
    },
    {
        id: "diamondAmount",
        numeric: true,
        disablePadding: false,
        label: "Diamond Amount",
    },
    {
        id: "service",
        numeric: false,
        disablePadding: false,
        label: "Service",
    },
];