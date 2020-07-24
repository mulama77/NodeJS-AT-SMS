USE jambobet;
/*
SHOW PROCEDURE STATUS;
DROP PROCEDURE IF EXISTS usersAdd;
DROP PROCEDURE IF EXISTS usersEdit;
*/
DELIMITER $$
CREATE PROCEDURE usersAdd (
  IN _from VARCHAR(45),
  IN _password VARCHAR(45)
)
BEGIN 
    INSERT INTO users (PhoneNumber, Password)
    VALUES (_from, _password);
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE usersEdit (
  IN _from VARCHAR(45),
  IN _password VARCHAR(45)
)
BEGIN 
    UPDATE users
    SET
    Password = _password
    WHERE PhoneNumber = _from;
END $$
DELIMITER ;
