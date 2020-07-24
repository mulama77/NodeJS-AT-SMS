# NodeJS-AT-SMS
NodeJS AfricasTalking SMS

### Getting started
```bash
# Clone the repo
git clone https://github.com/mulama77/NodeJS-AT-SMS.git
```
### Installing nodejs packages
```bash
# Navigate to NodeJS-AT-SMS/
cd NodeJS-AT-SMS
#Then install node packages
npm install
```
### Start the API
```bash
# Before starting the API, ensure port 3000 is not being used.
# incase the port is being used, run the below command on linux
kill -9 $(lsof -t -i:3000)
# Then navigate to NodeJS-AT-SMS/src/
# Then start the listener
nodemon index.js
# Thats it, the api is ready
```

### Accessing Application
Component         | URL                                      | Credentials
---               | ---                                      | ---
API (backend)     |  http://localhost:3000      | 

**Use any rest client application i.e. postman or install curl. (Below example uses curl)**
The below request will invoke the when the correct parameters are used.
**N/B Please ensure a valid Safaricom/Airtel/Telkom phone number is used.**
```bash
#request POST application/x-www-form-urlencoded
curl -d "linkId=2783f200-cdc0-4dbb-a2ea-0d59d16edd24&text=JOIN&to=8220&id=2f46432d-1c91-4d76-b64e-082d26fb4b8e&date=2020-07-24+15%3A39%3A15&from=%2B25471xxxxxxx" -H "Content-Type: application/x-www-form-urlencoded" -X POST 'http://localhost:3000'

#N/B The application has already been deployed in the below dev server ip: 3.122.233.128

#response
Dear customer, your xxxxxx account has been created successfully. Your one-time password is xxxxx
```

## Licensing
This project is licensed under Apache-2.0 License.
