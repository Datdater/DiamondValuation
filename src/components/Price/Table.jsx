import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography"; // Import Typography

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function PriceTable({
  rows = [],
  headCells = [],
  title,
  onRowClick = () => {},
}) {
  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        {title}
      </Typography>
      <TableContainer
        sx={{
          backgroundColor: "#f5f5f5",
        }}
      >
        <Table
          sx={{
            marginY: "20px",
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              {headCells.map((cell, index) => (
                <StyledTableCell
                  align="center"
                  sx={{ fontWeight: "bold" }}
                  key={index}
                >
                  {cell.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <StyledTableRow
                key={rowIndex}
                onClick={() => onRowClick(row.number)}
                sx={{ cursor: "pointer" }}
              >
                {headCells.map((cell) => (
                  <StyledTableCell align="center" key={`${row.id}-${cell.id}`}>
                    {row[cell.id]}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
