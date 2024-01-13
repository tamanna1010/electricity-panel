import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useDispatch, useSelector } from "react-redux";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { toggle, toggleValue } from "../../redux/reducers/toggleAppBar";
import { Drawer, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

// This will allow the user to switch the pages
export default function SideBar() {
  const toggleVal = useSelector(toggleValue);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const list = () => (
    <Box sx={{ width: 200 }} role="presentation">
      <List>
        <ListItem key="MenuIcon" disablePadding>
          <ListItemButton>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => dispatch(toggle())}
            >
              <MenuIcon />
            </IconButton>
          </ListItemButton>
        </ListItem>
        {["Connections", "Dashboard"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(text === "Connections" ? "/home" : "/dashboard");
                dispatch(toggle());
              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <PeopleAltIcon /> : <AssessmentIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer anchor="left" open={toggleVal}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
