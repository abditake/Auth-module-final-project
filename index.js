
'use strict';

// Start up DB Server
const { db } = require('./src/auth/models/index.js');

const PORT = process.env.PORT || 3002;

db.sync()
  .then(() => {

    // Start the web server
    require('./src/server.js').startup(PORT);
  });


