import React from 'react';

const ScheduledTable = ({rides}) => {
  return (
    <table class = "table">
      <thead>
        <tr class="d-flex">
          <th class="col-1">Ride ID</th>
          <th class="col-1">Confirmation#</th>
          <th class="col-2">Pickup Point</th>
          <th class="col-2">Pickup Time</th>
          <th class="col-2">Dropoff Point</th>
          <th class="col-2">Dropoff Time</th>
          <th class="col-2">Remove Ride</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        { (rides.length > 0) ? rides.map( (ride, index) => {
           return (
            <tr class="d-flex" key={ index }>
              <td class="col-1">{ ride.rideID }</td>
              <td class="col-1">{ ride.confirmationID }</td>
              <td class="col-2">{ ride.pickupPoint }</td>
              <td class="col-2">{ ride.pickupTime }</td>
              <td class="col-2">{ ride.dropoffPoint }</td>
              <td class="col-2">{ ride.dropoffTime }</td>
              <td class="col-2"> {ride.removeRidesButton} </td>
            </tr>
          )
         }) : <tr><td colSpan="5">Loading...</td></tr> }
        </tr>
      </tbody>
    </table>
  );
}

export default ScheduledTable