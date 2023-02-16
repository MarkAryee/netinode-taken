'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));


const user = require('./express/User');


const doURI = "mongodb+srv://markdb:rasengan@cluster0.ad3usrv.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(doURI, {useNewUrlParser: true, useUnifiedTopology: true}).then((result) => {
}).catch((err) => {
  console.log('there is an error');
})
console.log('something is happening here');






var S_name;
var S_id;
app.get('/add-User', (req, res) => {
    res.sendFile(path.join(__dirname,'/express/index.html'));
});

app.post('/add-Post', (req, res) => {
    S_name = req.body.Name;
    S_id = req.body.ST_ID;

  const User = new user({
    name: S_name,
    id: S_id
  });

  User.save().then((result) => {
    res.send(result)
  }).catch((err) => {
    console.log(err);
  })
});






module.exports = app;
module.exports.handler = serverless(app);
