const express = require('express');
const router = express.Router();
const generator = require('generate-password');
const mysqlConnection  = require('../database.js');
const credentials = {
  apiKey: '1beae2de765b0af4ff5d412f8d5863d6119ad9a23e6f3f4cdf236bcc1bd55413',         // use your sandbox app API key for development in the test environment
  username: 'sandbox',      // use 'sandbox' for development in the test environment
};
const africastalking = require('africastalking')(credentials);
// Initialize a service e.g. SMS
const sms = africastalking.SMS

// GET all users
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM users', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
      res.json(err);
    }
  });  
});

// GET a user
router.get('/:from', (req, res) => {
  const { from } = req.params; 
  mysqlConnection.query('SELECT * FROM users WHERE PhoneNumber = ?', [from], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
      res.json(err);
    }
  });
});


// INSERT a user
router.post('/', (req, res) => {
  const {from, text, networkCode, to} = req.body;
  
  if(text.toUpperCase().trim() !== 'JOIN'){
    
      // Use the service
      const options = {
        to: [from],
        message: "Invalid keyword '"+text+"' received"
      }
      // Send message and capture the response or error
      sms.send(options)
        .then( response => {
            console.log(response);
            res.json(response);
        })
        .catch( error => {
            console.log(error);
            res.json(response);
        });

  }else{

  var password = generator.generate({
    	length: 5,
    	numbers: true
	});
	
  const query = `
    SET @from = ?;
    SET @password = ?;
    CALL usersAdd(@from, @password);
  `;
  mysqlConnection.query(query, [from, password], (err, rows, fields) => {
    if(!err) {
      // Use the service
      const options = {
        to: [from],
        message: "Dear customer, your JamboBet account has been created successfully. Your one-time password is "+password
      }
      // Send message and capture the response or error
      sms.send(options)
        .then( response => {
            console.log(response);
            res.json(response);
        })
        .catch( error => {
            console.log(error);
	    res.json(response);
        });

    } else {
      console.log(err);

        // Use the service
        const options = {
          to: [from],
          message: "Dear Customer, you already have an existing JamboBet account."
      }
      // Send message and capture the response or error
      sms.send(options)
          .then( response => {
              console.log(err);
              res.json(err);
          })
          .catch( error => {
              console.log(error);
	      res.json(err);
          });

    }
  });

  }

});

//update a user
router.put('/:from', (req, res) => {
  const { email } = req.body;
  const { from } = req.params;
  const query = `
    SET @from = ?;
    CALL usersEdit(@from);
  `;
  mysqlConnection.query(query, [from], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'users Updated'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
