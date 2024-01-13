import { createSlice } from "@reduxjs/toolkit";

export const toggleAppBar = createSlice({
  name: "appBar",
  initialState: {
    value: false,
  },
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggle } = toggleAppBar.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const toggleValue = (state) => state.appBarToggle.value;

export default toggleAppBar.reducer;
