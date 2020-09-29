# CS5800-Team-4-Project

## MySQL setup

`CREATE TABLE users (`
	`username VARCHAR (25)  UNIQUE PRIMARY KEY,`
  	`passwrd VARCHAR (256) NOT NULL,`
    	`firstName VARCHAR (20) NOT NULL,`
    	`lastName VARCHAR (20) NOT NULL,`
    	`Email VARCHAR (30) NOT NULL`
`);`


`DELIMITER //`

`CREATE PROCEDURE createUserAccount (IN username VARCHAR(25), IN passwrd VARCHAR(256), IN firstName VARCHAR(20), IN lastName VARCHAR(20), IN Email VARCHAR(30))`
`BEGIN `
	`INSERT INTO users (username, passwrd, firstName, lastName, Email) VALUES(username, passwrd, firstName, lastName, Email);`
`END //`

`DELIMITER ;`

`DELIMITER //`

`CREATE PROCEDURE validateLogin (IN user_name VARCHAR(25), IN pass_wrd VARCHAR(256))`
`BEGIN`
	`SELECT user_name from users where user_name = username AND pass_wrd = passwrd;`
`END //`

`DELIMITER ;`

## Starting the React App
**In VS Code, type the commands below in the terminal**  
**to stop the development server hit CTRL + C and confirm with Y**

`cd frontend\team-4-project`  
`npm start`
