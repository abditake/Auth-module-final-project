const { Sequelize, DataTypes } = require('sequelize');

const  userSchema  = require('./users');
const userBoardSchema  = require('./userBoard');




// const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory'
  : process.env.DATABASE_URL || 'sqlite:memory'; 

// const DATABASE_CONFIG = new Sequelize(DATABASE_URL, {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });


const sequelize = new Sequelize(DATABASE_URL, DataTypes);

const userBoardModel = userBoardSchema(sequelize,DataTypes);



module.exports = {
  db: sequelize,
  users: userSchema(sequelize,DataTypes),
  userBoardModel,
};