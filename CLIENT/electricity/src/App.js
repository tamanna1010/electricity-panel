import React, { useEffect } from "react";
import "./App.css";
import Routers from "./routes/Routes";
import { useDispatch, useSelector } from "react-redux";
import {
  connections,
  loadConnections,
} from "./redux/reducers/connectionReducer";
import { CircularProgress } from "@mui/material";
import { api } from "./utils/utils";
function App() {
  const dispatch = useDispatch();
  const value = useSelector(connections);
  
  // To load all Connections
  useEffect(() => {
    const url = api.allConnections;
    dispatch(loadConnections({ message: "loading", data: [] }));
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        dispatch(loadConnections(json));
      });
    // eslint-disable-next-line
  }, []);
  return (
    <div className="App">
      {value.data.message === "loading" ? (
        <div
          style={{
            display: "flex",
            height: "70%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <CircularProgress />
        </div>
      ) : (
        <Routers />
      )}
    </div>
  );
}

export default App;
