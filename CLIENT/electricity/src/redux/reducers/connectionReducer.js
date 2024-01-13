import { createSlice } from "@reduxjs/toolkit";
export const filterConnections = createSlice({
  name: "connections",
  initialState: {
    data: { data: [], message: "loading" },
    searchText: "",
    dateRange: { startDate: "", endDate: "" },
    currentConnection: {},
  },
  reducers: {
    searchFilter: (state, action) => {
      state.searchText = action.payload;
    },
    dateRangeFilter: (state, action) => {
      state.dateRange = action.payload;
    },
    loadConnections: (state, action) => {
      state.data = action.payload;
    },
    setCurrentConnection: (state, action) => {
      state.currentConnection = action.payload;
    },
    updateConnection: (state, action) => {
      const { payload } = action;
      state.data.data = state.data.data.map((connection) => {
        if (connection.ID_Number === payload.ID_Number) {
          return payload;
        } else {
          return connection;
        }
      });
    },
  },
});
export const {
  searchFilter,
  loadConnections,
  dateRangeFilter,
  setCurrentConnection,
  updateConnection,
} = filterConnections.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const connections = (state) => state.connections;

export default filterConnections.reducer;
