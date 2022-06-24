const { Sequelize, DataTypes } = require('sequelize');

const userSchema = require('./user');
const UserBoardSchema = require('./userBoard');



const DATABASE_URL = 'sqlite::memory';

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  sequelize: db,
  personInterface: new modelInterface(personModel),
  foodInterface: new modelInterface(foodModel),
};