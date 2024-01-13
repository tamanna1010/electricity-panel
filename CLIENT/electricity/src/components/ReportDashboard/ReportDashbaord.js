import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { sortMonths } from "../../utils/utils";
const ReportDashboard = ({ data, year, setYear, yearDropDown }) => {
  const [status, setStatus] = useState("All");
  return (
    <>
      {" "}
      <Box>
        <div
          className="dropdown-component"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {" "}
          <div>
            <InputLabel
              id="demo-controlled-open-select-label"
              sx={{ paddingTop: 5 }}
            >
              Select a Year
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
              style={{ width: "200px", margin: "5px" }}
            >
              {yearDropDown.map((item, i) => (
                <MenuItem key={i} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            {" "}
            <InputLabel
              id="demo-controlled-open-select-label"
              sx={{ paddingTop: 5 }}
            >
              Select Status
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              style={{ width: "200px", margin: "5px" }}
            >
              {[
                "All",
                "Approved",
                "Rejected",
                "Pending",
                "Connection Released",
              ].map((item, i) => (
                <MenuItem key={i} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </Box>
      <ResponsiveContainer width="100%" height="70%">
        <BarChart
          width={500}
          height={300}
          data={sortMonths(data[year])}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {["Rejected", "All"].includes(status) && (
            <Bar dataKey="Rejected" stackId="a" fill="#fe7968" />
          )}
          {["Approved", "All"].includes(status) && (
            <Bar dataKey="Approved" stackId="a" fill="#82ca9d" />
          )}
          {["Pending", "All"].includes(status) && (
            <Bar dataKey="Pending" stackId="a" fill="#ffc658" />
          )}
          {["Connection Released", "All"].includes(status) && (
            <Bar dataKey="Connection Released" stackId="a" fill="#67809f" />
          )}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
export default ReportDashboard;
