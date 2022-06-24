'use strict';



const { start } = require('./src/server');
const { sequelize } = require('./src/models');
const server = require('./src/server.js');
const { db } = require('./src/auth/models');

db.sync().then(() => {
  app.start(process.env.PORT || 3001);
});


