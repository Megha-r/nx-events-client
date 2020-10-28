import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "@apollo/react-hoc";
import Compose from "lodash.flowright";
import mg from "../../../src/imgps.png";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ls from "local-storage";
import TemporaryDrawer from "./../user/drawer";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";

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

const postTeam = (history) => {
  console.log("inside on click", history);
  history.push("/AddTeam");
};

function Profile(props) {
  const history = useHistory();
  const classes = useStyles();
  const { data: { getAllTeams = {} } = {} } = props;
  //   console.log("profile", getAllTeams);
  const { data = [] } = getAllTeams;
  return (
    <div>
      <TemporaryDrawer />
      <div className={classes.root}>
        <div className={classes.left}>
          <Button
            variant="contained"
            color="primary"
            className={classes.filter}
            onClick={() => postTeam(history)}
          >
            Add Team
          </Button>
        </div>
        <div className={classes.right}>
          <ul className={classes.ul}>
            {data.map((hit) => (
              <div className={classes.content}>
                <li key={hit.teamId}>
                  <Link
                    onClick={() => {
                      console.log("Hello");
                    }}
                  >
                    <img src={mg} width="100%" height="200" />
                  </Link>
                  <p>
                    <b>Title:</b>
                    {hit.teamName}
                  </p>
                  <div>
                    <b>Description: </b>
                    {hit.description}
                  </div>
                  <div>
                    <b>Team Id:</b>
                    {hit.teamId}
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

const TEAM_LIST = gql`
  query getAllTeams {
    getAllTeams {
      data {
        teamName
        description
        teamId
      }
    }
  }
`;

export default Compose(graphql(TEAM_LIST, {}))(Profile);
