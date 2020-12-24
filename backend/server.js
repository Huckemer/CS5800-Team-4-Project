const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Database = require("./database.js");
const e = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// const database = new Database({
//     host     :  process.env.DB_HOST,
//     user     :  process.env.DB_USER,
//     password :  process.env.DB_PASSWORD,
//     port     :  process.env.DB_PORT,
//     database :  process.env.DB_DATABASE
// });

const database = new Database({
  host: "localhost",
  user: "root",
  password: "password",
  port: 3306,
  database: "sys",
});

// API calls
app.get("/", (req, res) => {
  res.send("go to /users to see users");
});

app.get("/api/users/show", (req, res) => {
  const SHOW_USERS_LIST = `SELECT * FROM users;`;
  database.query(SHOW_USERS_LIST, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});
//###############_______________________ Rider functions  _______________________#################################################
//Creates a user account in the Database
app.get("/api/users/add", (req, res) => {
  const { email, passwrd, firstName, lastName, userRole } = req.query;
  const INSERT_USER_QUERY = `INSERT INTO users (Email, passwrd, firstName, lastName, userRole) VALUES ('${email}', '${passwrd}', '${firstName}', '${lastName}', '${userRole}');`;
  database.query(INSERT_USER_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("successfully added user");
    }
  });
});

//checks databse for user account and returns their information
app.get("/api/users/authenticate", (req, res) => {
  const { email, passwrd } = req.query;
  const CHECK_USER_CREDENTIALS = `SELECT email, firstName, lastName, userRole FROM users WHERE Email = '${email}' AND passwrd = '${passwrd}';`;
  database.query(CHECK_USER_CREDENTIALS, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});
//returns list of scheduled rides for rider dashboard
app.get("/api/users/scheduledRides", (req, res) => {
  const { email } = req.query;
  const USER_RIDES = `SELECT * FROM scheduledUserActivity INNER JOIN scheduledRides ON scheduledUserActivity.rideID = scheduledRides.rideID WHERE Email = '${email}' ;`;
  database.query(USER_RIDES, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

//Adds a ride to the scheduledRides table in the database
app.get("/api/admin/addRides", (req, res) => {
  const {
    pickupPoint,
    pickupTime,
    dropoffPoint,
    dropoffTime,
    vanID,
  } = req.query;
  const ADD_RIDE = `CALL scheduleNewRide('${pickupPoint}', '${pickupTime}', '${dropoffPoint}', '${dropoffTime}', ${vanID});`;
  database.query(ADD_RIDE, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

//Adds a van to the vans table in the database
app.get("/api/admin/addVan", (req, res) => {
  const { vanID, numberOfSeats } = req.query;
  const ADD_VAN = `CALL addVan('${vanID}', '${numberOfSeats}');`;
  database.query(ADD_VAN, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

//Handles 'takeride' button in available rides table on the rider dashboard
app.get("/api/users/takeRide", (req, res) => {
  const { rideID, email } = req.query;
  const TAKE_RIDE = `CALL takeRide(${rideID}, '${email}');`;
  database.query(TAKE_RIDE, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

app.get("/api/users/deleteRide", (req, res) => {
  const { rideID, email } = req.query;
  const DELETE_RIDE = `CALL deleteRide(${rideID}, '${email}');`;
  database.query(DELETE_RIDE, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

app.get("/api/admin/deleteRide", (req, res) => {
  const { rideID } = req.query;
  const DELETE_RIDE = `CALL adminDeleteRide(${rideID});`;
  database.query(DELETE_RIDE, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

app.get("/api/admin/deleteVan", (req, res) => {
  const { vanID } = req.query;
  const DELETE_VAN = `CALL deleteVan(${vanID});`;
  database.query(DELETE_VAN, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

app.get("/api/admin/deleteUser", (req, res) => {
  const { email } = req.query;
  const DELETE_USER = `CALL deleteUser('${email}');`;
  database.query(DELETE_USER, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

//###############_______________________ End of Rider functions  _______________________#################################################

//###############_______________________ Driver functions  _______________________#################################################
//By Ian Pope. Complain to him if something breaks.

//returns list of scheduled rides that are available for a driver to sign up for.
// AKA: scheduledrides you're not on yet.
// The inverse of '/api/users/scheduledRides'
app.get("/api/users/ridesYoureNotOn", (req, res) => {
  const { email } = req.query;
  const USER_RIDES = `SELECT * FROM scheduledUserActivity INNER JOIN scheduledRides ON scheduledUserActivity.rideID != scheduledRides.rideID WHERE Email = '${email}' and scheduledRides.availableSeats != 0;`;
  database.query(USER_RIDES, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

//###############_______________________ End of Driver functions  _______________________#################################################

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From The Backend" });
});

app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(`Here's the backend responding with what it got: ${req.body.post}`);
});

app.post("/api/user", (req, res) => {
  console.log("User Login: " + req.body);
  res.send(`${req.body.post}`);
});
//###############_______________________ Admin functions  _______________________#################################################
app.post("/api/admin/removeAvailableRides", (req, res) => {
  console.log("Remove Available Rides:" + req.body);
  res.send(`${req.body.post}`);
});

app.get("/api/admin/availableRides", (req, res) => {
  const ALL_RIDES = `CALL allRides();`;
  database.query(ALL_RIDES, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

app.get("/api/admin/availableVans", (req, res) => {
  const ALL_VANS = `CALL allVans();`;
  database.query(ALL_VANS, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

app.get("/api/admin/users", (req, res) => {
  const ALL_USERS = `CALL allUsers();`;
  database.query(ALL_USERS, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

app.get("/api/users/scheduledRides", (req, res) => {
  const { email } = req.query;
  const USER_RIDES = `SELECT * FROM scheduledUserActivity INNER JOIN scheduledRides ON scheduledUserActivity.rideID = scheduledRides.rideID WHERE Email = '${email}' ;`;
  database.query(USER_RIDES, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});
app.get("/api/users/takeRide", (req, res) => {
  const { rideID, email } = req.query;
  const TAKE_RIDE = `CALL takeRide(${rideID}, '${email}');`;
  database.query(TAKE_RIDE, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
