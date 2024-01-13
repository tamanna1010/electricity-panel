import moment from "moment";

// 
export const formatDateForUI = (date, format = "DD-MMM-YYYY") =>
  moment(date, "DD/MM/YYYY").format(format);

export const formatDateForJSON = (format = "DD-MM-YYYY") =>
  moment().format(format);

// Function to validate the form fields
export const validateConnectionsField = (connection) => {
  if (!connection["Applicant_Name"].match(/^[a-zA-Z ]+$/)) {
    return {
      status: false,
      message: "Applicant Name should contain alphabets only",
    };
  } else if (connection["Load_Applied (in KV)"] > 200) {
    return {
      status: false,
      message: "Load applied can not be greater than 200",
    };
  } else if (!connection["Reviewer_Name"].match(/^[a-zA-Z ]+$/)) {
    return {
      status: false,
      message: "Reviewer Name should contain alphabets only",
    };
  } else {
    return {
      status: true,
      message: "",
    };
  }
};

// Function to create Chart Data
export function createChartData(data) {
  const nestedObject = {};
  data.forEach((item) => {
    const date = moment(item.Date_of_Application, "DD/MM/YYYY");
    const year = date.year();
   
    const month = date.format("MMMM");

    if (!nestedObject[year]) {
      nestedObject[year] = {};
    }

    if (!nestedObject[year][month]) {
      nestedObject[year][month] = [];
    }

    nestedObject[year][month].push(item);
  });
  const yearObj = {};
  for (const [key, value] of Object.entries(nestedObject)) {
    const monthArr = [];
    for (const [monthKey, monthValue] of Object.entries(value)) {
      const monthObj = {
        name: monthKey,
        Approved: monthValue.filter((item) => item.Status === "Approved")
          .length,
        Pending: monthValue.filter((item) => item.Status === "Pending").length,
        Rejected: monthValue.filter((item) => item.Status === "Rejected")
          .length,
        "Connection Released": monthValue.filter(
          (item) => item.Status === "Connection Released"
        ).length,
        Total: monthValue.length,
        month: `${monthKey} ${key}`,
      };
      monthArr.push(monthObj);
    }
    yearObj[key] = monthArr;
  }
  return yearObj;
}

// Function to sort months in chart data
export const sortMonths = (array) =>
  array?.sort(function (firstEl, secondEl) {
    var firstElMonth = new Date(firstEl.month);
    var secondElMonth = new Date(secondEl.month);
    return firstElMonth - secondElMonth;
  });
export const api = {
  allConnections: "/all_connections",
  editConnection: "/connection"
};
