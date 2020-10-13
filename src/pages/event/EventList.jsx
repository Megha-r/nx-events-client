import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "@apollo/react-hoc";
import Compose from "lodash.flowright";
import mg from "../../../src/imgps.png";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  bar: { flexGrow: 1, overflow: "hidden" },
  root: {
    display: "flex",
    flexDirection: "row",
    margin: "10",
    background: "white",
  },
  left: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    background: "#F7F9FB",
  },
  right: {
    display: "flex",
    flexGrow: "2",
    justifyContent: "center",
  },
  content: {
    background: "#F7F9FB",
    width: "100%",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    margin: "5px 5px",
  },
  ul: {
    margin: "10px 10px",
    padding: "0 0 0 0",
    width: "100%",
  },
  filter: {
    margin: theme.spacing(5, 0, 5),
    width: "400px",
  },
  menuButton: {
    color: "white",
    marginRight: theme.spacing(2),
  },
}));

function Profile(props) {
  const classes = useStyles();
  const { data: { getAllEvents = {} } = {} } = props;
  console.log("profile", getAllEvents);
  const { data = [] } = getAllEvents;
  console.log("data", data);
  return (
    <div className={classes.bar}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" color="white">
            menu
          </Typography> */}
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <div className={classes.left}>
          <Button
            variant="contained"
            color="primary"
            className={classes.filter}
          >
            Filter
          </Button>
        </div>
        <div className={classes.right}>
          <ul className={classes.ul}>
            {data.map((hit) => (
              <div className={classes.content}>
                <li key={hit.eventId}>
                  <img src={mg} width="100%" height="200" />
                  <p>
                    <b>Title:</b>
                    {hit.eventName}
                  </p>
                  <div>
                    <b>Description: </b>
                    {hit.description}
                  </div>
                  <div>
                    <b>Start Date:</b>
                    {hit.startDate}
                  </div>
                  <div>
                    <b>Start Date:</b>
                    {hit.endDate}
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const EVENT_LIST = gql`
  query getAllEvents {
    getAllEvents {
      data {
        teamName
        description
        eventId
        startDate
        endDate
        eventName
      }
    }
  }
`;

export default Compose(graphql(EVENT_LIST, {}))(Profile);
