import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import AdminDashboard from "./AdminDashboard.js";
import DriverDashboard from "./DriverDashboard.js";
import RiderDashboard from "./RiderDashboard.js";
import CreateDashboard from "./CreateDashboard.js";

import "./App.css";

class App extends Component {
  state = {
    response: "",
    post: "",
    responseToPost: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "",
  };

  callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  getUserType = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5000/api/users/authenticate?email=${this.state.email}&passwrd=${this.state.password}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    const json = await response.json();
    if (json.length > 0) {
      this.setState({ userType: json[0].userRole });
      this.setState({ email: json[0].email });
      this.setState({ firstName: json[0].firstName });
      this.setState({ lastName: json[0].lastName });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  handleCreateUser = (x) => {
    this.setState({ userType: "createAccount" });
  };
  
  handleLogout = (newValue) => {
    this.setState({ userType: newValue });
  };

  render() {
    let userType = this.state.userType;
    let dashboard;

    if (userType === "admin" || userType === "Admin") {
      dashboard = <AdminDashboard logout={this.handleLogout} />;
    } else if (userType === "Rider" || userType === "rider") {
      dashboard = (
        <RiderDashboard logout={this.handleLogout} email={this.state.email} />
      );
    } else if (userType === "driver" || userType === "Driver") {
      dashboard = (
        <DriverDashboard logout={this.handleLogout} email={this.state.email} />
      );
    } else if (userType === "createAccount") {
      dashboard = <CreateDashboard logout={this.handleLogout} />;
    } else {
      return (
        <div className="App">
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant="h3">{this.state.response}</Typography>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={this.getUserType} noValidate autoComplete="off">
                <Typography variant="h3" gutterBottom>
                  Welcome to Vanpool!
                </Typography>
                <Typography variant="h5">Please log in</Typography>
                <TextField
                  id="filled-basic"
                  label="Enter Email"
                  variant="filled"
                  color="primary"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <TextField
                  id="filled-basic"
                  label="Password"
                  type="password"
                  variant="filled"
                  color="primary"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <Grid item xs={12}>
                  <Button type="submit" variant="outlined" color="primary">
                    Login
                  </Button>
                </Grid>
              </form>
              <form onSubmit={this.handleCreateUser}>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    onChange={(e) => {
                      userType = "createAccount";
                    }}
                  >
                    Create account
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </div>
      );
    }

    return <div className="App">{dashboard}</div>;
  }
}

export default App;
