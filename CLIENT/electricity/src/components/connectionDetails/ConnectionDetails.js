import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import {
  loadConnections,
  updateConnection,
} from "../../redux/reducers/connectionReducer";
import {
  Alert,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  api,
  formatDateForJSON,
  formatDateForUI,
  validateConnectionsField,
} from "../../utils/utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

// This Modal is the container for the connection form
export default function NestedModal(props) {
  const { open, handleClose, connectionState, handleChange, error, setError } =
    props;

    // This function will generate a text or number component as per the parameters provided
  const textComponent = (
    label,
    key,
    type,
    disabled,
    multiline,
    maxRows,
    fullWidth
  ) => {
    return (
      <div className="text-component">
        {" "}
        <InputLabel id="demo-controlled-open-select-label">{label}</InputLabel>
        <TextField
          disabled={disabled}
          style={{
            width: fullWidth
              ? key === "Reviewer_Comments"
                ? "99%"
                : "98%"
              : "200px",
            margin: "5px",
          }}
          type={type ? type : "text"}
          hiddenLabel
          variant="outlined"
          value={
            key === "Date_of_Application"
              ? formatDateForUI(connectionState[key])
              : connectionState[key]
          }
          onChange={(e) => {
            handleChange(key, e.target.value);
          }}
          multiline={multiline}
          maxRows={maxRows}
          fullWidth={fullWidth}
        />
      </div>
    );
  };

  // This function will generate a dropdown component as per the parameters provided
  const dropDownComponent = (label, key, data) => {
    return (
      <div className="dropdown-component">
        {" "}
        <InputLabel id="demo-controlled-open-select-label">{label}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={connectionState[key]}
          //   label="Gender"
          onChange={(e) => {
            handleChange(key, e.target.value);
          }}
          style={{ width: "200px", margin: "5px" }}
        //   input={<Input />}
        >
          {data.map((item, i) => (
            <MenuItem key={i} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  };
  const dispatch = useDispatch();

  // This function will be called when user clicks on submit
  const onSubmit = (connectionState) => {
    const { status, message } = validateConnectionsField(connectionState);
    if (status) {
      dispatch(
        updateConnection({
          ...connectionState,
          Modified_Date: formatDateForJSON(),
          ...(connectionState.Status === "Approved" && {
            Date_of_Approval: formatDateForJSON(),
          }),
        })
      );
      const url = `${api.editConnection}/${connectionState._id}`
      const { _id, Reviewer_Comments, ...remaining } = connectionState
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...remaining, Reviewer_Comments:`${Reviewer_Comments}`}),
      })
        .then((response) => response.json())
        .then((json) => {
          dispatch(loadConnections({ message: "loading", data: [] }));
          const url = api.allConnections
          fetch(url)
            .then((response) => response.json())
            .then((json) => {
              dispatch(loadConnections(json));
              handleClose();
            });
        });
    } else {
      setError({ status, message });
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            overflow: "auto",
            height: "85vh",
            width: "60%",
          }}
        >
          <div>
            <Typography variant="h4" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
              <div style={{ display: "flex" }}>
                Connection Form
                {!error.status && (
                  <Alert sx={{ marginLeft: 14 }} severity="error">
                    {error.message}
                  </Alert>
                )}
              </div>
            </Typography>

            <div
              style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}
            >
              {textComponent("Applicant Name", "Applicant_Name")}
              {dropDownComponent("Gender", "Gender", ["Male", "Female"])}
              {dropDownComponent("District", "District", [
                "East",
                "North",
                "South",
                "West",
              ])}

              {dropDownComponent("State", "State", ["DELHI", "MUMBAI"])}
              {textComponent("Pincode", "Pincode", "number")}
              {dropDownComponent("Ownership", "Ownership", [
                "JOINT",
                "INDIVIDUAL",
              ])}

              {dropDownComponent("Category", "Category", [
                "Commerical",
                "Residential",
              ])}

              {textComponent(
                "Load Applied (in KV)",
                "Load_Applied (in KV)",
                "number"
              )}

              {dropDownComponent("Status", "Status", [
                "Approved",
                "Pending",
                "Connection Released",
                "Rejected",
              ])}
              {textComponent("GovtID Type", "GovtID_Type", "text", true)}
              {textComponent("ID Number", "ID_Number", "number", true)}
              {textComponent(
                "Date of Application",
                "Date_of_Application",
                "text",
                true
              )}
            </div>
            <div
              style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}
            >
              {textComponent(
                "Reviewer ID",
                "Reviewer_ID",
                "number",
                false,
                false,
                1,
                true
              )}
              {textComponent(
                "Reviewer Name",
                "Reviewer_Name",
                "text",
                false,
                false,
                1,
                true
              )}
            </div>
            {textComponent(
              "Reviewer Comments",
              "Reviewer_Comments",
              "text",
              false,
              true,
              5,
              true
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "end", marginTop: 5 }}>
            <Button variant="outlined" color="primary" onClick={handleClose}>
              cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginLeft: 5 }}
              onClick={() => {
                onSubmit(connectionState);
              }}
            >
              Submit
            </Button>
          </div>
          {/* <ChildModal /> */}
        </Box>
      </Modal>
    </div>
  );
}
