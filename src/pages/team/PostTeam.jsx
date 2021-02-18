import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import * as yup from "yup";
import Container from "@material-ui/core/Container";
import TemporaryDrawer from "./../user/drawer";

const schema = yup.object().shape({
  teamName: yup.string().required("EventName is required"),
  description: yup.string().required("Description is required"),
});

const useStyles = (theme) => ({
  box: {
    marginTop: theme.spacing(16),
  },
  paper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacing(15),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "70%", // Fix IE 11 issue.
    marginLeft: theme.spacing(25),
    marginTop: theme.spacing(10),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  left: {
    width: "80%",
    marginRight: theme.spacing(0),
  },
});

class AddTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: "",
      description: "",
      teamId: "",
      message: "",
      hasError: false,
      error: {
        teamName: "",
        description: "",
      },
      touched: {
        teamName: false,
        description: false,
      },
    };
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  hasErrors = () => {
    const { hasError } = this.state;
    schema.isValid(this.state).then((valid) => {
      if (!valid !== hasError) {
        this.setState({ hasError: !valid });
      }
    });
  };

  onClickHandler = async (Data) => {
    // console.log("InputProps", Data);
    const { message } = this.state;
    const { postTeam } = this.props;
    const { teamName, description } = Data;
    const response = await postTeam({ variables: { teamName, description } });
    this.Message(response);
  };

  isTouched = (field) => {
    const { touched } = this.state;
    console.log("field", field);
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  };

  getError = (field) => {
    const { error, touched } = this.state;
    if (touched[field]) {
      console.log("check3");
      schema
        .validateAt(field, this.state)
        .then(() => {
          if (error[field] !== "") {
            this.setState({
              error: {
                ...error,
                [field]: "",
              },
            });
          }
        })
        .catch((err) => {
          if (err.message !== error[field]) {
            this.setState({
              error: {
                ...error,
                [field]: err.message,
              },
            });
          }
        });
    }
    return error[field];
  };

  Message(props) {
    const { message, teamName, description, teamId } = this.state;
    const { data: { postTeam = {} } = {} } = props;
    this.setState({ message: "Team Added Successfully" });
    this.setState({ teamId: postTeam.teamId });
    this.setState({ teamName: postTeam.teamName });
    this.setState({ description: postTeam.description });
  }

  render() {
    const { classes } = this.props;
    const {
      teamName,
      description,
      hasError,
      error,
      message,
      teamId,
    } = this.state;
    console.log(this.state);
    this.hasErrors();
    return message.length ? (
      <div>
        <TemporaryDrawer />
        <p>
          <div>Message: {message}</div>
          <div> TeamId: {teamId}</div> <div>TeamName: {teamName}</div>{" "}
          Description: {description}
        </p>
      </div>
    ) : (
      <div>
        <TemporaryDrawer />
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form} noValidate>
              <TextField
                label="Team Name"
                helperText="Some important text"
                variant="filled"
                margin="normal"
                value={teamName}
                error={!!error.teamName}
                fullWidth
                onChange={this.handleChange("teamName")}
                helperText={this.getError("teamName")}
                onBlur={() => this.isTouched("teamName")}
              />
              <TextField
                label="description"
                id="outlined-start-adornment"
                margin="normal"
                // type="password"
                value={description}
                error={!!error.description}
                fullWidth
                onChange={this.handleChange("description")}
                helperText={this.getError("description")}
                onBlur={() => this.isTouched("description")}
              />
              <Button
                type="button"
                variant="contained"
                color="primary"
                className={classes.submit}
                //   disabled={hasError}
                onClick={() => {
                  console.log("asasasasasdsdsdsdsd");
                  this.onClickHandler({
                    teamName,
                    description,
                  });
                }}
              >
                Submit
              </Button>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(useStyles)(AddTeam);
