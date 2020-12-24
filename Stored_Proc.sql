DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `addVan`(IN vanID int, numberOfSeats int)
BEGIN 
	INSERT INTO vans (vanId, numberOfSeats) 
    VALUES 
    (vanID, numberOfSeats);
END $$

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `adminDeleteRide`(IN ride_ID INT)
BEGIN
    DELETE FROM scheduledrides WHERE rideID = ride_ID;
END $$

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `allRides`()
BEGIN
	SELECT * FROM scheduledRides;
END $$

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `allUsers`()
BEGIN
	SELECT * FROM users;
END $$

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `allVans`()
BEGIN
	SELECT * FROM vans;
END $$

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `createUserAccount`(IN Email VARCHAR(25), IN passwrd VARCHAR(256), IN firstName VARCHAR(20), IN lastName VARCHAR(20), IN userRole VARCHAR(10))
BEGIN 
	INSERT INTO users (Email, passwrd, firstName, lastName, userRole) VALUES(Email, passwrd, firstName, lastName, userRole);
END $$

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteRide`(IN ride_ID INT, IN userEmail VARCHAR(25))
BEGIN
	UPDATE scheduledRides SET availableSeats = availableSeats + 1 WHERE rideID = ride_ID;
    DELETE FROM scheduledUserActivity WHERE rideID = ride_ID AND Email=userEmail;
END $$

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteUser`(IN userEmail VARCHAR(25))
BEGIN
    DELETE FROM users WHERE Email = userEmail;
END $$

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteVan`(IN van_ID INT)
BEGIN
    DELETE FROM vans WHERE vanID = van_ID;
END $$

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `scheduleNewRide`(IN pickup VARCHAR(25), IN pickuptime VARCHAR(6), IN dropoff VARCHAR(25), IN dropTime VARCHAR (6), van_ID int)
BEGIN 
	INSERT INTO scheduledRides (availableSeats, pickupPoint, pickupTime, dropoffPoint, dropoffTime, vanID) 
    VALUES 
    ((SELECT numberOfSeats from vans where vanID = van_ID), pickup, pickuptime, dropoff, dropTime, van_ID);
END $$

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `takeRide`( IN rideID INT, IN userEmail VARCHAR(25))
BEGIN 
	CALL updateSeatsAvailable(rideID);
    INSERT INTO scheduledUserActivity(rideID, Email) VALUES (rideID, userEmail);
END $$

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateSeatsAvailable`(IN ride_ID INT)
BEGIN
	UPDATE scheduledRides 
    SET availableSeats = availableSeats - 1
    WHERE rideID = ride_ID;
END $$

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `validateLogin`(IN user_name VARCHAR(25), IN pass_wrd VARCHAR(256))
BEGIN
	SELECT user_name from users where user_name = username AND pass_wrd = passwrd;
END $$