export function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export const RequestHeadCells = [
  {
    id: "number",
    numeric: false,
    disablePadding: false,
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
    label: "Created Date",
  },
  {
    id: "returnedDate",
    numeric: false,
    disablePadding: false,
    label: "Returned Date",
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
  {
    id: "delete",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];
export const DetailHeadCells = [
  {
    id: "number",
    numeric: false,
    disablePadding: false,
    label: "Number",
  },
  {
    id: "service",
    numeric: false,
    disablePadding: true,
    label: "Service",
  },
  {
    id: "size",
    numeric: true,
    disablePadding: false,
    label: "Size",
  },

  {
    id: "servicePrice",
    numeric: true,
    disablePadding: true,
    label: "Service Price",
  },

  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "view",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

export const PriceListHeadCells = [
  {
    id: "number",
    numeric: false,
    disablePadding: false,
    label: "Number",
  },
  {
    id: "service",
    numeric: false,
    disablePadding: true,
    label: "Service",
  },
  {
    id: "description",
    numeric: true,
    disablePadding: true,
    label: "Description",
  },
  {
    id: "period",
    numeric: true,
    disablePadding: true,
    label: "Period (hours)",
  },
];

export const ServiceDetailHeadCells = [
  {
    id: "number",
    numeric: false,
    disablePadding: false,
    label: "Number",
  },
  {
    id: "size",
    numeric: false,
    disablePadding: true,
    label: "Size (mm)",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: true,
    label: "Price",
  },
];
