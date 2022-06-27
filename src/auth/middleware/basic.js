'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { 
    next('Not Authorized'); 
  }

  try {
    let authStr = req.headers.authorization.split(' ')[1];
    let decodedAuthStr = base64.decode(authStr);
    let [username,pass] = decodedAuthStr.split(':');

    req.user = await users.authenticateBasic(username,pass);
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

};

