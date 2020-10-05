import React, { Fragment, useEffect, useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@material-ui/core";
import SettingsArea from "./SettingsArea";
import UserDataArea from "./UserDataArea";
import AccountInformationArea from "./AccountInformationArea";
import StatisticsArea from "./StatisticsArea";
import MapContainer from "./map/MapContainer";

// Map
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// import MapContainer from './map/MapContainer';
import MomentUtils from '@date-io/moment';

import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { render } from 'react-dom';

function Dashboard(props) {
  const {
    selectDashboard,
    CardChart,
    statistics,
    toggleAccountActivation,
    pushMessageToSnackbar,
    targets,
    setTargets,
    isAccountActivated,
  } = props;

  useEffect(selectDashboard, [selectDashboard]);
  
  const onSelectHandler = (result) => {
    // Go to result handler.
  }

  const [viewport, setViewport] = useState({
    latitude: -98.5816684,
    longitude: 39.8283459,
    zoom: 4
  })
  const geocoderContainerRef = useRef()
  const mapRef = useRef()
  const handleViewportChange = useCallback((newViewport) => setViewport(newViewport), [])

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 }

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      })
    },
    [handleViewportChange]
  )

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
    <Fragment>
      <MapContainer/>
      <Box mt={4}></Box>
      <StatisticsArea CardChart={CardChart} data={statistics} />
      <Box mt={4}>
        <Typography variant="subtitle1" gutterBottom>
          Your Account
        </Typography>
      </Box>
      <AccountInformationArea
        isAccountActivated={isAccountActivated}
        toggleAccountActivation={toggleAccountActivation}
      />
      <Box mt={4}>
        <Typography variant="subtitle1" gutterBottom>
          Settings
        </Typography>
      </Box>
      <SettingsArea pushMessageToSnackbar={pushMessageToSnackbar} />
      <UserDataArea
        pushMessageToSnackbar={pushMessageToSnackbar}
        targets={targets}
        setTargets={setTargets}
      />
    </Fragment>
    </MuiPickersUtilsProvider>
  );
}

Dashboard.propTypes = {
  CardChart: PropTypes.elementType,
  statistics: PropTypes.object.isRequired,
  toggleAccountActivation: PropTypes.func,
  pushMessageToSnackbar: PropTypes.func,
  targets: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTargets: PropTypes.func.isRequired,
  isAccountActivated: PropTypes.bool.isRequired,
  selectDashboard: PropTypes.func.isRequired,
};

export default Dashboard;
