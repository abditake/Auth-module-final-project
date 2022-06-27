'use strict';

const express = require('express');
const authRouter = express.Router();

const basicAuth = require('../auth/middleware/basic');
const bearerAuth = require('../auth/middleware/bearer.js');
const {
  handleSignin,
  handleSignup,
  handleGetUsers,
  handleSecret,
} = require('../router/handler');

authRouter.post('/signup', handleSignup);
authRouter.post('/signin', basicAuth, handleSignin);
authRouter.get('/users', bearerAuth, handleGetUsers);
authRouter.get('/secret', bearerAuth, handleSecret);

module.exports = authRouter;