import React, { Fragment, Component } from "react";
import { Typography, Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import RiderTable from "./AvailableRiderTable.js";
import "bootstrap/dist/css/bootstrap.min.css";
import ScheduledTable from "./ScheduledRidesTable.js";
// const cors = require("cors");
export default class RiderDashboard extends Component {
  constructor(props) {
    super(props);
    console.log(this);
    this.state = {
      rides: [],
      scheduledRides: [],
      rideID: 0,
      loading: true,
    };
  }

  setParentState = () => {
    this.props.logout("");
  };
  //Gets all available rides across entire platform from the Database
  async getAvailableRides() {
    const response = await fetch(
      "http://localhost:5000/api/admin/availableRides"
    );
    const res = await response.json();
    console.log(res[0]);
    this.setState({
      loading: false,
      rides: res[0].map((ride) => ({
        ...ride,
        takeRideButton: (
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => this.takeRide(ride.rideID)}
          >
            {" "}
            Take Ride{" "}
          </Button>
        ),
      })),
    });
  }
  //Gets all scheduled riders for each user
  async getScheduledRides() {
    const response = await fetch(
      `http://localhost:5000/api/users/scheduledRides?email=${this.props.email}`
    );
    const res = await response.json();
    this.setState({
      loading: false,
      scheduledRides: res.map((ride) => ({
        ...ride,
        removeRidesButton: (
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => this.removeRide(ride.rideID)}
          >
            {" "}
            Delete Ride{" "}
          </Button>
        ),
      })),
    });
  }
  //removes ride from 'scheuled rides' table
  async removeRide(ID) {
    // const response = 
    await fetch(
      `http://localhost:5000/api/users/deleteRide?rideID=${ID}&email=${this.props.email}`
    );
    // const res = await response.json();
    this.componentDidMount();
  }
  //handles clicking the 'take ride' button.
  async takeRide(ID) {
    const response = await fetch(
      `http://localhost:5000/api/users/takeRide?rideID=${ID}&email=${this.props.email}`
    );
    const res = await response.json();
    this.componentDidMount();
    console.log(res);
  }
  componentDidMount() {
    this.getAvailableRides();
    this.getScheduledRides();
  }

  render() {
    return (
      <Fragment>
        <Typography variant="h3" gutterBottom>
          Rider Dashboard
        </Typography>
        <Typography variant="h4" gutterBottom>
          Available Rides
        </Typography>
        <div className="RiderTable">
          <RiderTable rides={this.state.rides} />
        </div>
        <Typography variant="h4" gutterBottom>
          Scheduled Rides
        </Typography>
        <div className="ScheduledTable">
          <ScheduledTable rides={this.state.scheduledRides} />
        </div>
        <div style={{ height: 200 }}>
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
      </Fragment>
    );
  }
}
