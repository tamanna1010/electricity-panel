import React from "react";
import LayoutTopBottom from "../components/layoutTopBottom/layoutTopBottom";
import SideBar from "../components/sidebar/Sidebar";
import { useState } from "react";
import { useSelector } from "react-redux";
import { connections } from "../redux/reducers/connectionReducer";
import { createChartData } from "../utils/utils";
import ReportDashboard from "../components/ReportDashboard/ReportDashbaord";

export default function Dashboard() {
  const initialChartData = useSelector(connections).data.data;

  // State for Dashboard
  const [chartData, setChartData] = useState(
    createChartData(initialChartData)
  );
  const [yearDropDown, setDropDown] = useState(Object.keys(chartData));
  const [year, setYear] = useState(Object.keys(chartData)[0]);

  return (
    <>
      {" "}
      <LayoutTopBottom>
        <SideBar />
        <ReportDashboard
          data={chartData}
          year={year}
          setYear={setYear}
          yearDropDown={yearDropDown}
        />
      </LayoutTopBottom>
    </>
  );
}
