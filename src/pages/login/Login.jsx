import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import * as yup from "yup";
import * as jwt from "jsonwebtoken";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Container from "@material-ui/core/Container";
import EmailIcon from "@material-ui/icons/Email";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Redirect } from "react-router-dom";
import { Query } from "./../../modules";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: "",
      redirect: false,
      hasError: false,
      error: {
        email: "",
        password: "",
      },
      touched: {
        email: false,
        password: false,
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
    const { message } = this.state;
    this.setState({ redirect: true });
    const { loginEmployee } = this.props;
    const { email, password } = Data;
    // console.log("eeeeeeeeeeee", loginEmployee);
    const response = await loginEmployee({ variables: { email, password } });
    const token = response.data.loginEmployee.data;
    console.log("token", token);
    localStorage.setItem("token", token);
    console.log(typeof token);
    var decoded = jwt.verify(token, "qwertyuiopasdfghjklzxcvbnm123456");
    localStorage.setItem("id", decoded.id);
    // console.log("asasasasasadfefe", localStorage.getItem("id"));
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

  renderRedirect = () => {
    const { redirect } = this.state;
    console.log("redirect", redirect);
    if (redirect) {
      return <Redirect to="/EventList" />;
    }
    return true;
  };

  Message(props) {
    const { message } = this.state;
    const { data: { loginEmployee = {} } = {} } = props;
    console.log("data", message);
    this.setState({ message: loginEmployee.message });
  }

  render() {
    const { classes } = this.props;
    const { email, password, hasError, error, message } = this.state;
    console.log(this.state);
    this.hasErrors();
    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
          <div className={classes.left}>
            <p>
              <h1>Event Management Tool</h1>
            </p>
            <p>
              Event Management is the application of project management to the
              creation and development of small and/or large scale personal or
              corporate events such as festivals, conferences, ceremonies,
              formal parties and convention.
            </p>
          </div>
          <form className={classes.form} noValidate>
            <TextField
              label="Email Address"
              helperText="Some important text"
              variant="filled"
              margin="normal"
              value={email}
              error={!!error.email}
              fullWidth
              onChange={this.handleChange("email")}
              helperText={this.getError("email")}
              onBlur={() => this.isTouched("email")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              id="outlined-start-adornment"
              margin="normal"
              type="password"
              value={password}
              error={!!error.password}
              fullWidth
              onChange={this.handleChange("password")}
              helperText={this.getError("password")}
              onBlur={() => this.isTouched("password")}
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
              disabled={hasError}
              onClick={() => {
                console.log("asasasasasdsdsdsdsd");
                this.onClickHandler({ email, password });
              }}
            >
              Log In
              {this.renderRedirect()}
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(Login);
