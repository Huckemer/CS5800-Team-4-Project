import React from 'react';

const VanTable = ({vans}) => {
  return (
    <table class="table">
      <thead>
        <tr class="d-flex">
          <th class="col-1">Van ID</th>
          <th class="col-2">Available Seats</th>
          <th class="col-2">Remove Van</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        { (vans.length > 0) ? vans.map( (van, index) => {
           return (
            <tr class="d-flex" key={ index }>
              <td class="col-1">{ van.vanID }</td>
              <td class="col-2">{ van.numberOfSeats }</td>
              <td class="col-2">{ van.removeVanButton }</td>
            </tr>
          )
         }) : <tr><td colSpan="5">Loading...</td></tr> }
        </tr>
      </tbody>
    </table>
  );
}

export default VanTable