import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import TemporaryDrawer from "./drawer";

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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeName: "",
      email: "",
      employeeId: "",
      userType: "",
      employeeNumber: "",
    };
  }

  onClickHandler = async (Data) => {
    console.log("InputProps", Data);
    const { getEmployeeById } = this.props;
    const { employeeId } = Data;
    console.log("Data in PostTeam", employeeId);
    const response = await getEmployeeById({ variables: { employeeId } });
    console.log("response", response);
    this.Message(response);
  };

  Message(props) {
    const { employeeId, employeeName, userType, email } = this.state;
    const { data: { getEmployeeById = {} } = {} } = props;
    console.log("dataaaaaaaaaaap", this.state.email);
    this.state.employeeId = getEmployeeById.employeeId;
    this.state.employeeName = getEmployeeById.employeeName;
    this.state.email = getEmployeeById.email;
    this.state.userType = getEmployeeById.userType;
    this.state.employeeNumber = getEmployeeById.employeeNumber;
  }

  render() {
    const { classes } = this.props;
    const {
      employeeName,
      employeeId,
      userType,
      email,
      employeeNumber,
    } = this.state;
    console.log(this.state);
    const id = localStorage.getItem("id");
    this.onClickHandler({ employeeId: id });
    console.log("dataaaaaaaaaaapqqq", employeeId);
    return (
      <div>
        <TemporaryDrawer />
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <TextField
              label="Employee Name"
              margin="normal"
              value={employeeName}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="EmployeeId"
              id="outlined-start-adornment"
              margin="normal"
              value={employeeId}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Employee Number"
              id="outlined-start-adornment"
              margin="normal"
              value={employeeNumber}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Email"
              id="outlined-start-adornment"
              margin="normal"
              value={email}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="User Type"
              id="outlined-start-adornment"
              margin="normal"
              value={userType}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Profile);
