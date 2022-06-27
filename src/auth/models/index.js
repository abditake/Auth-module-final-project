'use strict';
require('dotenv').config();
const  userBoard  = require('./userBoard');
const  userStatus = require('./status');

const { Sequelize, DataTypes } = require('sequelize');


const userSchema = require('./users');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

const userBoardModel = userBoard(sequelize, DataTypes);
const userStatusModel = userStatus(sequelize, DataTypes);


module.exports = {
  db: sequelize,
  users: userSchema(sequelize, DataTypes),
  userBoardModel,
  userStatusModel,
};
