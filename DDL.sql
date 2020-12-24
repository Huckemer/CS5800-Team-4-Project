CREATE TABLE users (
	Email VARCHAR (25) NOT NULL,
    passwrd VARCHAR (256) NOT NULL,
    firstName VARCHAR (20) NOT NULL,
    lastName VARCHAR (20) NOT NULL,
    userRole VARCHAR (10) NOT NULL,
    PRIMARY KEY(Email)
    );
    
CREATE TABLE vans(
	vanID INT AUTO_INCREMENT,
    numberOfSeats INT NOT NULL,
	PRIMARY KEY(vanID)
	);
    
CREATE TABLE scheduledRides(
	rideID INT AUTO_INCREMENT,
    availableSeats INT NOT NULL,
    pickupPoint VARCHAR (25) NOT NULL, 
    pickupTime VARCHAR(6) NOT NULL,
    dropoffPoint VARCHAR (25) NOT NULL,
    dropoffTime VARCHAR(6) NOT NULL,
    vanID INT NOT NULL,
    PRIMARY KEY(rideID),
    FOREIGN KEY (vanID) REFERENCES vans(vanID),
    CHECK (availableSeats >= 0)
    );
    
CREATE TABLE scheduledUserActivity(
	confirmationID INT AUTO_INCREMENT,
    rideID INT, 
    Email VARCHAR(25),
    Primary KEY(confirmationID),
    FOREIGN KEY(rideID) REFERENCES scheduledRides(rideID),
    FOREIGN KEY(Email) REFERENCES users(Email)
    );
    

    