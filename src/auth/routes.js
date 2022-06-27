'use strict';
const express = require('express');
const authRoutes = express.Router();

const { users } = require('./models');
const basicAuth = require('./middleware/basic.js');
const bearerAuth = require('./middleware/bearer.js');
const permissions = require('./middleware/acl.js');


authRoutes.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRoutes.post('/signin', basicAuth, (req, res, next) => {
  
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});

authRoutes.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  console.log('users', req.user);
  let users = await users.findAll({});
  let payload = {
    results: users,
    token: req.user.token,
  };
  res.send(payload);
});

authRoutes.get('/hello', basicAuth, (req, res, next) => {
  let { name } = req.query;
  console.log('auth proof', req.user.username);
  res.status(200).send(`Greetings ${name}! this route is now secured by Basic AUth!!!`);
});

authRoutes.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area');
});

authRoutes.get('/read', bearerAuth, permissions('read'), (req, res, next) => {
  res.status(200).send('OK! I have read permissions');
});

authRoutes.get('/create', bearerAuth, permissions('create'), (req, res, next) => {
  res.status(200).send('OK! I have create permissions');
});

authRoutes.get('/update', bearerAuth, permissions('update'), (req, res, next) => {
  res.status(200).send('OK! I have update permissions');
});

authRoutes.get('/delete', bearerAuth, permissions('delete'), (req, res, next) => {
  res.status(200).send('OK! I have delete permissions');
});

module.exports = authRoutes;