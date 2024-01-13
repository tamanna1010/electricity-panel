import { configureStore } from "@reduxjs/toolkit";
import toggleAppBar from "./reducers/toggleAppBar";
// We'll use redux-logger just as an example of adding another middleware
import logger from "redux-logger";
import searchBar from "./reducers/connectionReducer";

export default configureStore({
  reducer: {
    appBarToggle: toggleAppBar,
    connections: searchBar,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});
