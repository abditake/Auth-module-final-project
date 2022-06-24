'use strict';

// all resources

const express = require('express');
const bcrypt = require('bcrypt');
const { Users } = require('./models');
const basicAuth = require('./middleware/basic');
const bearerAuth = require('./middleware/bearer');
const acl = require('./middleware/access-control');

// express singleton

const app = express();

// json request stuff
app.use(express.json());


// Process FORM input and add to request body
app.use(express.urlencoded({ extended: true }));



const PORT = process.env.PORT || 3002;

// Routes
app.use(authRoutes);


module.exports = {
  server: app,
  start: () => app.listen(PORT, console.log('server running on', PORT)),
};







