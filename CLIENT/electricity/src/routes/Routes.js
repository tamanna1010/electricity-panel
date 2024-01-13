import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ConnectionsPage from "../pages/connectionsPage";
import Dashboard from "../pages/Dashboard";


// There are 2 pages - Home and Dashboard
export default function Routers() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<ConnectionsPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
