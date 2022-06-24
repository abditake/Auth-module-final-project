const { Sequelize, DataTypes } = require('sequelize');

const userSchema = require('./message-board-user');
const msgBoardSchema = require('./userBoard');




const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const DATABASE_CONFIG = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

const msgBoardModel = new msgBoardSchema(sequelize, DataTypes);


module.exports = {
  sequelize: db,
  users: userSchema(sequelize,DataTypes),
  msgBoardModel,
};