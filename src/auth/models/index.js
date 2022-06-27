const { Sequelize, DataTypes } = require('sequelize');

const  userSchema  = require('./users');
const userBoardSchema  = require('./userBoard');


const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory'
  : process.env.DATABASE_URL || 'sqlite:memory'; 


const sequelize = new Sequelize(DATABASE_URL);

const userBoardModel = userBoardSchema(sequelize,DataTypes);


module.exports = {
  db: sequelize,
  users: userSchema(sequelize,DataTypes),
  userBoardModel,
};