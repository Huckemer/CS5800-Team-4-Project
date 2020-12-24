// Driver dashboard made by Ian Pope
// I currently don't know how to

import React, { Fragment, Component } from "react";
import { Typography, Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import RiderTable from "./AvailableRiderTable.js";
import "bootstrap/dist/css/bootstrap.min.css";
import ScheduledTable from "./ScheduledRidesTable.js";

class DriverDashboard extends Component {
  constructor(props) {
    super(props);
    console.log("I am " + this.props.email);
    this.state = {
      availableRides: [],
      currentRides: [],
      rideID: 0,
      loading: true,
    };
  }

  setParentState = () => {
    this.props.logout("");
  };

  // Stuff to do when the page loads.
  componentDidMount() {
    this.updateUI();
  }

  // Refreshes the UI with the most current info from the sql database.
  updateUI() {
    this.getAvailableRides();
    this.getScheduledRides();
    console.log("UI Updated");
  }

  // Gets all the possible rides that this driver could sign up for. IE: ones they're not already on, and have at least 1 seat.
  async getAvailableSignUpRides() {
    const response = await fetch(
      `http://localhost:5000/api/users/ridesYoureNotOn?email=${this.props.email}`
    );
    const res = await response.json();
    console.log(res);
    console.log(this.currentRides);
    this.setState({
      loading: false,
      availableRides: res[0].map((ride) => ({
        ...ride,
        removeRidesButton: (
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => this.signUpForRide(ride.rideID)}
          >
            {" "}
            Sign Up{" "}
          </Button>
        ),
      })),
    });
  }

  async getAvailableRides() {
    const response = await fetch(
      `http://localhost:5000/api/admin/availableRides`
    );
    const res = await response.json();
    console.log(res[1]);
    this.setState({
      loading: false,
      availableRides: res[0].map((ride) => ({
        ...ride,
        takeRideButton: (
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => this.signUpForRide(ride.rideID)}
          >
            {" "}
            Signup for Ride{" "}
          </Button>
        ),
      })),
    });
  }

  //Gets the rides this user has signed up for.
  async getScheduledRides() {
    const response = await fetch(
      `http://localhost:5000/api/users/scheduledRides?email=${this.props.email}`
    );
    const res = await response.json();
    console.log(res);

    this.setState({
      loading: false,
      currentRides: res.map((ride) => ({
        ...ride,
        removeRidesButton: (
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => this.removeSelfFromRide(ride.rideID)}
          >
            {" "}
            Quit Ride{" "}
          </Button>
        ),
      })),
    });
    console.log(this.currentRides);
  }

  async removeSelfFromRide(rideID) {
    console.log("removeSelfFromRide called with " + rideID);
    // const response = 
    await fetch(
      `http://localhost:5000/api/users/deleteRide?rideID=${rideID}&email=${this.props.email}`
    );
    // const res = await response.json();
    this.updateUI();
  }

  async signUpForRide(rideID) {
    console.log("removeSelfFromRide called with " + rideID);
    // const response = 
    await fetch(
      `http://localhost:5000/api/users/takeRide?rideID=${rideID}&email=${this.props.email}`
    );
    // const res = await response.json();
    this.updateUI();
  }

  render() {
    return (
      <Fragment>
        <Box mt={4}>
          <Typography variant="h3" gutterBottom>
            Driver Dashboard
          </Typography>
        </Box>
        <Box mt={4}>
          <Typography variant="h4" gutterBottom>
            Available Rides
          </Typography>
        </Box>
        <div className="RiderTable">
          <RiderTable rides={this.state.availableRides} />
        </div>
        <Box mt={4}>
          <Typography variant="h4" gutterBottom>
            Registered Rides
          </Typography>
        </Box>
        <div className="ScheduledTable">
          <ScheduledTable rides={this.state.currentRides} />
        </div>
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
      </Fragment>
    );
  }
}

export default DriverDashboard;
