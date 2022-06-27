'use strict';

const { start } = require('./src/server');
const { db } = require('./src/auth/models');

db.sync().then(() => {
  start(process.env.PORT || 3001);
});
