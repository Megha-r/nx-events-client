import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import * as yup from "yup";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Container from "@material-ui/core/Container";
import EmailIcon from "@material-ui/icons/Email";
import InputAdornment from "@material-ui/core/InputAdornment";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
  eventName: yup.string().required("EventName is required"),
  startDate: yup.string().required("Start Date is required"),
  endDate: yup.string().required("End Date is required"),
  description: yup.string().required("Descrition is required"),
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

class AddEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      description: "",
      message: "",
      hasError: false,
      error: {
        eventName: "",
        description: "",
        startDate: "",
        endDate: "",
      },
      touched: {
        eventName: false,
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
      console.log("asasasasasasasas", valid);
      if (!valid !== hasError) {
        console.log("ddddddddddddd");
        this.setState({ hasError: !valid });
      }
    });
  };

  onClickHandler = async (Data) => {
    console.log("rererererer", Data);
    const { message } = this.state;
    const { putEmployee } = this.props;
    const { email, password } = Data;
    console.log("eeeeeeeeeeee", putEmployee);
    const response = await putEmployee({ variables: { email, password } });
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
    const { message } = this.state;
    const { data: { loginEmployee = {} } = {} } = props;
    console.log("data", message);
    this.setState({ message: loginEmployee.message });
  }

  render() {
    const { classes } = this.props;
    const {
      eventName,
      description,
      hasError,
      error,
      message,
      startDate,
      endDate,
    } = this.state;
    console.log(this.state);
    this.hasErrors();
    return message.length ? (
      <p>{message}</p>
    ) : (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <TextField
              label="Event Name"
              helperText="Some important text"
              variant="filled"
              margin="normal"
              value={eventName}
              error={!!error.eventName}
              fullWidth
              onChange={this.handleChange("eventName")}
              helperText={this.getError("eventName")}
              onBlur={() => this.isTouched("eventName")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Start Date"
              helperText="Some important text"
              variant="filled"
              margin="normal"
              value={startDate}
              error={!!error.startDate}
              fullWidth
              onChange={this.handleChange("startDate")}
              helperText={this.getError("startDate")}
              onBlur={() => this.isTouched("startDate")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="End Date"
              id="outlined-start-adornment"
              margin="normal"
              // type="password"
              value={endDate}
              error={!!error.endDate}
              fullWidth
              onChange={this.handleChange("endDate")}
              helperText={this.getError("endDate")}
              onBlur={() => this.isTouched("endDate")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="button"
              variant="contained"
              color="primary"
              className={classes.submit}
              // disabled={hasError}
              onClick={() => {
                console.log("asasasasasdsdsdsdsd");
                this.onClickHandler({
                  eventName,
                  description,
                  startDate,
                  endDate,
                });
              }}
            >
              Submit
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(AddEvents);
