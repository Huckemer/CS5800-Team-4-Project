import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { GeolocateControl } from "react-map-gl";
import "./map.css";
// import API from '../utils/API'
import * as colors from "./filter/Colors";
import MatGeocoder from "react-mui-mapbox-geocoder";
import { Grid, Typography, Box } from "@material-ui/core";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiaHVja2VtZXIiLCJhIjoiY2tmc3gxemphMHRmdDJwbDdyNjZ4b2VleSJ9.OUdHutsi64NxcUV8Hk5x9w",
});

class MapBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      points: [],
      currentLocation: []
    };
  }

  updateCurrentLocation( position ) {

  }

  componentDidMount() {
    this.updateMap();
  }

  async updateMap() {
    // let data = await API.get(`/map/range/${this.props.start}-${this.props.end}`)
    // console.log(data.data.result)
    // this.setState({points: data.data.result})
  }

  renderPoints( filter ) {
    // this.state.points.map(point => console.log(point.IncidentType))
    const result = this.state.points.filter(
      (point) => point.IncidentType === filter
    );
    return result.map(function (point) {
      // console.log(point.IncidentType);
      return <Feature coordinates={[point.Longitude, point.Latitude]} />;
    });
  }

  render() {
    return (
      <div>
        <Map
          // style={'mapbox://styles/mapbox/streets-v11'}
          style={"mapbox://styles/huckemer/ckfw2tzeu1g4x19kz38ssubu2"}
          className={"mapContainer"}
          center={[-98.5816684, 39.8283459]}
          zoom={[4]}
        >
          <Grid container spacing={3}>
            <Grid item xs={6} md={6}>
              <MatGeocoder
                inputPlaceholder="Search Address"
                accessToken={
                  "pk.eyJ1IjoiaHVja2VtZXIiLCJhIjoiY2tmc3gxemphMHRmdDJwbDdyNjZ4b2VleSJ9.OUdHutsi64NxcUV8Hk5x9w"
                }
                onSelect={this.onSelectHandler}
                showLoader={true}
                {...this.geocoderApiOptions}
              />
            </Grid>
            <Grid item xs={5}></Grid>
            <Grid item xs={0.9}></Grid>
            <Grid item xs={0.5}>
              <GeolocateControl
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
              >
              </GeolocateControl>
            </Grid>
          </Grid>
        </Map>
      </div>
    );
  }
}

export default MapBox;
