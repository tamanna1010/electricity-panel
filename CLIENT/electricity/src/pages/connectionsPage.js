import React, { useEffect, useState } from "react";
import LayoutTopBottom from "../components/layoutTopBottom/layoutTopBottom";
import SideBar from "../components/sidebar/Sidebar";
import ConnectionTable from "../components/connectionTable/ConnectionTable";
import {  useSelector } from "react-redux";
import {
  connections,
} from "../redux/reducers/connectionReducer";
import moment from "moment";

export default function ConnectionsPage() {
  const value = useSelector(connections);
  const [records, setRecords] = useState(value.data.data);

  // To Update the records as per the search bar
  useEffect(() => {
    setRecords(
      value.data.data.filter(
        (item) =>
          item.ID_Number.toString()
            .toLowerCase()
            .indexOf(value.searchText.toLowerCase()) > -1
      )
    );
    // eslint-disable-next-line
  }, [value.searchText, value.currentConnection]);

  // To Update the records as per the date range added by user
  useEffect(() => {
    if (value.dateRange.startDate && value.dateRange.endDate) {
      setRecords(
        value.data.data.filter((item) =>
          moment(item.Date_of_Application, "DD/MM/YYYY").isBetween(
            moment(value.dateRange.startDate, "DD/MM/YYYY"),
            moment(value.dateRange.endDate, "DD/MM/YYYY"),null,[]
          )
        )
      );
    }
    // eslint-disable-next-line
  }, [value.dateRange]);
  return (
    <>
      {" "}
      <LayoutTopBottom>
        <SideBar />
        <ConnectionTable records={records} />
      </LayoutTopBottom>
    </>
  );
}
