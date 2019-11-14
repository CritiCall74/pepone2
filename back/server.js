require('dotenv').config();
// Require express and create an instance of it
var express = require('express');
var app = express();
app.use(express.json());

var cors = require('cors')
app.use(cors());

var axios = require('axios');

var authData = {
  acces_token: null,
  refresh_token: null,
}

function btoa(str) {
  if (Buffer.byteLength(str) !== str.length)
    throw new Error('bad string!');
  return Buffer.from(str, 'binary').toString('base64');
}

function auth() {
  var data = {
    "username": process.env.N2GO_USERNAME,
    "password": process.env.N2GO_PASSWORD,
    "grant_type": "https://nl2go.com/jwt"
  };
  var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa(process.env.N2GO_AUTH_KEY),    
  }
  return axios.post('https://api.newsletter2go.com/oauth/v2/token', data, {headers})
  .then(function(res) {
    authData = {
      acces_token: res.data.access_token,
      refresh_token: res.data.refresh_token,
    };
  })
  .catch(function(res) {
    console.error(res);
    throw('Error while authentifying to newsletter2go using Auth0');
  })
}

function checkAuth() {
  if (!authData.acces_token) {
    console.log('Refreshing acces token...');
    return new Promise(async function(resolve, reject) {
      await auth();
      resolve();
    });
  }
}

// Root
app.get('/', function (req, res) {
  res.send('Back-end application up and running!');
});

// Register a new email
app.post('/register', async function (req, res) {
  try {
    await checkAuth();
  }
  catch (err) {
    res.status(500).send(err);
    return;
  }

  var data = Object.assign({
    "email": "",
    "phone": "",
    "gender": "",
    "first_name": "",
    "last_name": "",
    "is_unsubscribed": false,
    "is_blacklisted": false,
  }, req.body);
  var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + authData.acces_token,    
  }
  axios.post('https://api.newsletter2go.com/recipients', data, {headers})
  .then(function(response) {
    res.send(req.body);
  })
  .catch(function(response) {
    console.error(response);
    res.status(500).send('Error while registering new user to newsletter2go account');
  })
});

// Change the 404 message modifying the middleware
app.use(function(req, res, next) {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// start the server in the port 3000 !
app.listen(3000, function () {
  console.log('Back-end app listening on port 3000.');
});
