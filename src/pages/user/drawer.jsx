import React from "react";
import { gql } from "apollo-boost";

import { BrowserRouter as Router, useHistory } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function TemporaryDrawer() {
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const openLogin = (history) => {
    console.log("inside on click", history);
    localStorage.clear("token");
    history.push("/Login");
  };

  const openTeam = (history) => {
    console.log("inside on click", history);
    history.push("/ListTeam");
  };

  const openEvent = (history) => {
    console.log("inside on click", history);
    history.push("/EventList");
  };

  const openProfile = (history) => {
    console.log("inside on click", history);
    history.push("/Profile");
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button onClick={() => openProfile(history)}>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={() => openEvent(history)}>
          <ListItemText primary="Events" />
        </ListItem>
        <ListItem button onClick={() => openTeam(history)}>
          <ListItemText primary="Teams" />
        </ListItem>
        <ListItem button onClick={() => openLogin(history)}>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.bar}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
