
'use strict';

// Start up DB Server
const { db, userBoardModel } = require('./src/auth/models/index.js');

const PORT = process.env.PORT || 3002;

db.sync()
  .then(() => {
    userBoardModel.create({
      recipient:'New Staff', 
      sender: 'Micheal', 
      message:'Welcome to the company! This is our Sql message board. As you climb the ranks in our company we will change your role, giving you access to more and more features.',})
    // Start the web server
    require('./src/server.js').startup(PORT);
  });


