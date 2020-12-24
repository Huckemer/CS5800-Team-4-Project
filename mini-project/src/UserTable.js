import React from 'react';

const UserTable = ({users}) => {
  return (
    <table class = "table">
      <thead>
        <tr class="d-flex">
          <th class="col-1">Email</th>
          <th class="col-2">Password</th>
          <th class="col-2">First Name</th>
          <th class="col-2">Last Name</th>
          <th class="col-2">User Type</th>
          <th class="col-2">Remove User</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        { (users.length > 0) ? users.map( (user, index) => {
           return (
            <tr class="d-flex" key={ index }>
              <td class="col-1">{ user.Email }</td>
              <td class="col-2">{ user.passwrd }</td>
              <td class="col-2">{ user.firstName}</td>
              <td class="col-2">{ user.lastName }</td>
              <td class="col-2">{ user.userRole }</td>
              <td class="col-2">{ user.removeUserButton }</td>
            </tr>
          )
         }) : <tr><td colSpan="5">Loading...</td></tr> }
        </tr>
      </tbody>
    </table>
  );
}

export default UserTable