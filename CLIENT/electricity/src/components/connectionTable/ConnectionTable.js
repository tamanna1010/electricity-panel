import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import NestedModal from "../connectionDetails/ConnectionDetails";
import { useDispatch } from "react-redux";
import { setCurrentConnection } from "../../redux/reducers/connectionReducer";
import { useState } from "react";
import { formatDateForUI } from "../../utils/utils";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2c82c9",
    color: theme.palette.common.white,
    borderRadius: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //   "&:nth-of-type(odd)": {
  //     backgroundColor: theme.palette.action.hover,
  //   },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const columns = [
  { id: "Applicant_Name", label: "Name", width: "10%" },
  { id: "Gender", label: "Gender", width: "10%" },
  {
    id: "District",
    label: "District",
    width: "10%",
    // align: "right",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "State",
    label: "State",
    width: "10%",
    // align: "right",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Pincode",
    label: "Pincode",
    width: "10%",
    // align: "right",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "Load_Applied (in KV)",
    label: "Load Applied(KV)",
    width: "10%",
    // align: "right",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "ID_Number",
    label: "ID Number",
    width: "20%",
    // align: "right",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "Date_of_Application",
    label: "Date of Application",
    width: "10%",
    // align: "right",
    // format: (value) => value.toFixed(2),
  },

  {
    id: "Status",
    label: "Status",
    width: "10%",
    align: "center",
    // format: (value) => value.toFixed(2),
  },
];

// This table will be responsible for the population of collection in a tabular form
export default function ConnectionTable({ records }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  const [connectionState, setConnectionState] = useState({});
  const [error, setError] = useState({ status: true, message: "" });

  const onHandleChange = (key, value) => {
    setConnectionState((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = (row) => {
    setOpen(true);
    dispatch(setCurrentConnection(row));
  };
  const handleClose = () => {
    setOpen(false);
    dispatch(setCurrentConnection({}));
    setError({ status: true, message: "" });
  };
  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        height: "calc(100vh - 84px)",
        // paddingTop: 0.1,
      }}
    >
      <TableContainer sx={{ maxHeight: "calc(100vh - 155px)" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {records
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={i}
                    onClick={() => {
                      handleOpen(row);
                      setConnectionState(row);
                    }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "Date_of_Application" ? (
                            formatDateForUI(value)
                          ) : column.id === "Status" ? (
                            <Chip
                              label={value}
                              //   color={
                              //     value === "Approved"
                              //       ? "success"
                              //       : value === "Rejected"
                              //       ? "error"
                              //       : "warning"
                              //   }
                              sx={{
                                background:
                                  value === "Connection Released"
                                    ? "#67809f"
                                    : value === "Approved"
                                    ? "#82ca9d"
                                    : value === "Rejected"
                                    ? "#fe7968"
                                    : "#ffc658",
                                color: "#fff",
                              }}
                              variant="filled"
                            />
                          ) : column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={records.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <NestedModal
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        handleChange={onHandleChange}
        connectionState={connectionState}
        error={error}
        setError={setError}
      />
    </Paper>
  );
}
