import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { Button } from "@mui/material";
import { dateRangeFilter } from "../../redux/reducers/connectionReducer";
import { useDispatch } from "react-redux";

export default function DatePickerValue({ handleFilterMenuClose }) {
  const [value, setValue] = useState({
    startDate: dayjs(),
    endDate: dayjs(),
  });
  const dispatch = useDispatch();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePicker
          label="Start Date"
          value={value.startDate}
          format="DD/MM/YYYY"
          onChange={(newValue) =>
            setValue((prev) => {
              return { ...prev, startDate: newValue };
            })
          }
        />
        <DatePicker
          label="End Date"
          value={value.endDate}
          format="DD/MM/YYYY"
          onChange={(newValue) =>
            setValue((prev) => {
              return { ...prev, endDate: newValue };
            })
          }
        />
        <Button
          variant="contained"
          onClick={() => {
            dispatch(
              dateRangeFilter({
                startDate: dayjs(value.startDate).format("DD/MM/YYYY"),
                endDate: dayjs(value.endDate).format("DD/MM/YYYY"),
              })
            );
            handleFilterMenuClose();
          }}
        >
          Submit
        </Button>
      </DemoContainer>
    </LocalizationProvider>
  );
}
