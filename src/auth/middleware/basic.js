'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { 
    next('invalid Login'); 
  }

  try {
    let basic = await req.headers.authorization.split(' ').pop();
    let encoded = base64.encode(basic);
    let [ username, pass ] = base64.decode(encoded).split(':');

    req.user = await users.authenticateBasic(username, pass);
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

};

