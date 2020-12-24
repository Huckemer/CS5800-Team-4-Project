import React, { Fragment, Component } from "react";
import { Typography, Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import RiderAdminTable from "./AvailableRiderAdminTable.js";
import VanTable from "./AvailableVanTable.js";
import UserTable from "./UserTable.js";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      post: "",
      responseToPost: "",
      availableRideSelections: [],
      scheduledRideSelections: [],
      pickupPoint: "",
      pickupTime: "",
      dropoffPoint: "",
      dropoffTime: "",
      vanID: "",
      numberOfSeats: "",
      rides: [],
      vans: [],
      users: [],
    };
  }

  setParentState = () => {
    this.props.logout("");
  };

  componentDidMount() {
    this.getAvailableRides();
    this.getAvailableVans();
    this.getUsers();
  }

  //Gets all available rides across entire platform from the Database
  async getAvailableRides() {
    const response = await fetch(
      "http://localhost:5000/api/admin/availableRides"
    );
    const res = await response.json();
    this.setState({
      loading: false,
      rides: res[0].map((ride) => ({
        ...ride,
        takeRideButton: (
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => this.removeRide(ride.rideID)}
          >
            {" "}
            Remove Ride{" "}
          </Button>
        ),
      })),
    });
  }

  //removes ride from 'scheuled rides' table
  async removeRide(ID) {
    // const response = 
    await fetch(
      `http://localhost:5000/api/admin/deleteRide?rideID=${ID}`
    );
    // const res = await response.json();
    this.getAvailableRides();
  }

  //Gets all available vans across entire platform from the Database
  async getAvailableVans() {
    const vanResponse = await fetch(
      "http://localhost:5000/api/admin/availableVans"
    );
    const res = await vanResponse.json();
    this.setState({
      loading: false,
      vans: res[0].map((van) => ({
        ...van,
        removeVanButton: (
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => this.removeVan(van.vanID)}
          >
            {" "}
            Remove Van{" "}
          </Button>
        ),
      })),
    });
  }

  //removes van from 'vans' table
  async removeVan(ID) {
    // const response = 
    await fetch(
      `http://localhost:5000/api/admin/deleteVan?vanID=${ID}`
    );
    // const res = await response.json();
    this.getAvailableVans();
  }

  //Gets all users across entire platform from the Database
  async getUsers() {
    const userResponse = await fetch("http://localhost:5000/api/admin/users");
    const res = await userResponse.json();
    this.setState({
      loading: false,
      users: res[0].map((user) => ({
        ...user,
        removeUserButton: (
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => this.removeUser(user.Email)}
          >
            {" "}
            Remove User{" "}
          </Button>
        ),
      })),
    });
  }

  //removes user from 'users' table
  async removeUser(email) {
    // const response = 
    await fetch(
      `http://localhost:5000/api/admin/deleteUser?email=${email}`
    );
    // const res = await response.json();
    this.getUsers();
  }

  handleAvailableRideChange = (selections) => {
    let data = [];
    for (var i = 0; i < selections.rowIds.length; i++) {
      data.push(selections.rowIds[i]);
    }
    this.setState({ availableRideSelections: data });
    // console.log(this.state.availableRideSelections);
  };

  handleScheduledRideChange = (selections) => {
    this.setState({ scheduledRideSelections: selections.rowIds });
  };

  handleRemoveAvailableRides = async (e) => {
    e.preventDefault();
    // const response = 
    await fetch("/api/admin/removeAvailableRides", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selected: this.state.availableRideSelections }),
    });
    // const body = await response.text();
    // console.log(body);
    const rideResponse = await fetch("/api/admin/availableRides");
    this.rows = await rideResponse.text();
  };

  handleAddAvailableRide = async (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:5000/api/admin/addRides?pickupPoint=${this.state.pickupPoint}&pickupTime=${this.state.pickupTime}&dropoffPoint=${this.state.dropoffPoint}&dropoffTime=${this.state.dropoffTime}&vanID=${this.state.vanID}`
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));
    this.getAvailableRides();
  };

  handleAddVan = async (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:5000/api/admin/addVan?vanID=${this.state.vanID}&numberOfSeats=${this.state.numberOfSeats}`
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));
    this.getAvailableVans();
  };

  handleAddUser = async (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:5000/api/users/add?email=${this.state.newEmail}&passwrd=${this.state.newPasswrd}&firstName=${this.state.newFirstName}&lastName=${this.state.newLastName}&userRole=${this.state.newUserRole}`
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));
    this.getUsers();
  };

  render() {
    return (
      <Fragment>
        <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>
              Admin Dashboard
            </Typography>
            <Typography variant="h4" gutterBottom>
              Available Rides
            </Typography>
            <div className="RiderTable">
              <RiderAdminTable rides={this.state.rides} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Add Ride
            </Typography>
            <form
              onSubmit={this.handleAddAvailableRide}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="filled-basic"
                label="Pickup Point"
                variant="filled"
                color="primary"
                onChange={(e) => this.setState({ pickupPoint: e.target.value })}
              />
              <TextField
                id="filled-basic"
                label="Pickup Time"
                variant="filled"
                color="primary"
                onChange={(e) => this.setState({ pickupTime: e.target.value })}
              />
              <TextField
                id="filled-basic"
                label="Dropoff Point"
                variant="filled"
                color="primary"
                onChange={(e) =>
                  this.setState({ dropoffPoint: e.target.value })
                }
              />
              <TextField
                id="filled-basic"
                label="Dropoff Time"
                variant="filled"
                color="primary"
                onChange={(e) => this.setState({ dropoffTime: e.target.value })}
              />
              <TextField
                id="filled-basic"
                label="VanID"
                variant="filled"
                color="primary"
                onChange={(e) => this.setState({ vanID: e.target.value })}
              />
              <Button type="submit" variant="outlined" color="primary">
                Add
              </Button>
            </form>
          </Grid>
          <Grid item xs={12}>
            <Box mt={4}>
              <Typography variant="h4" gutterBottom>
                Available Vans
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <div className="VanTable">
              <VanTable vans={this.state.vans} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Add Van
            </Typography>
            <form onSubmit={this.handleAddVan} noValidate autoComplete="off">
              <TextField
                id="filled-basic"
                label="Van ID"
                variant="filled"
                color="primary"
                onChange={(e) => this.setState({ vanID: e.target.value })}
              />
              <TextField
                id="filled-basic"
                label="Available Seats"
                variant="filled"
                color="primary"
                onChange={(e) =>
                  this.setState({ numberOfSeats: e.target.value })
                }
              />
              <Button type="submit" variant="outlined" color="primary">
                Add
              </Button>
            </form>
          </Grid>
          <Grid item xs={12}>
            <Box mt={4}>
              <Typography variant="h4" gutterBottom>
                Users
              </Typography>
            </Box>
            <div className="UserTable">
              <UserTable users={this.state.users} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Add User
            </Typography>
            <form onSubmit={this.handleAddUser} noValidate autoComplete="off">
              <TextField
                id="filled-basic"
                label="Email"
                variant="filled"
                color="primary"
                onChange={(e) => this.setState({ newEmail: e.target.value })}
              />
              <TextField
                id="filled-basic"
                label="Password"
                variant="filled"
                color="primary"
                onChange={(e) => this.setState({ newPasswrd: e.target.value })}
              />
              <TextField
                id="filled-basic"
                label="First Name"
                variant="filled"
                color="primary"
                onChange={(e) =>
                  this.setState({ newFirstName: e.target.value })
                }
              />
              <TextField
                id="filled-basic"
                label="Last Name"
                variant="filled"
                color="primary"
                onChange={(e) => this.setState({ newLastName: e.target.value })}
              />
              <TextField
                id="filled-basic"
                label="User Type"
                variant="filled"
                color="primary"
                onChange={(e) => this.setState({ newUserRole: e.target.value })}
              />
              <Button type="submit" variant="outlined" color="primary">
                Add
              </Button>
            </form>
          </Grid>
          <div style={{ height: 100 }}>
            <Box mt={4}>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={this.setParentState}
              >
                Logout
              </Button>
            </Box>
          </div>
        </Grid>
      </Fragment>
    );
  }
}

export default AdminDashboard;
