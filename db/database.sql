CREATE DATABASE IF NOT EXISTS jambobet;

USE jambobet;

CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  PhoneNumber VARCHAR(45) DEFAULT NULL,
  Password VARCHAR(45) DEFAULT NULL,
  PRIMARY KEY(id),
  CONSTRAINT uc_phonenumber UNIQUE (PhoneNumber)
);

DESCRIBE users;

INSERT INTO users values 
  (1, '+254711111111', '54321');

SELECT * FROM users;
