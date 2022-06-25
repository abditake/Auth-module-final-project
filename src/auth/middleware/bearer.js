'use strict';

const { users } = require('../models/users');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login');
  } else {
    try {
      let token = req.headers.authorization.split(' ').pop();
      console.log('bearer auth token ', token);
      let validUser = await users.authenticateBearer(token);
      if (validUser){
        req.user = validUser;
        next();
      }
    } catch(e) {
      next(e.message);
    }
  }
};
