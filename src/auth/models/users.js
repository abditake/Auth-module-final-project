'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const SECRET = process.env.API_SECRET || 'TEST_SECRET';

const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: false },
    password: { type: DataTypes.STRING, allowNull: false },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET, { expiresIn: 500000 });
      },
      set(payload) {
        return jwt.sign(payload, SECRET,{ expiresIn: 500000 });
      },
    },
  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  // Basic AUTH: Validating strings (username, password) 
  model.authenticateBasic = async function (username, password) {
    try {
      const user = await this.findOne({ where: { username } });
      const validUser = await bcrypt.compare(password, user.password);
      if (validUser) {
        return user;
      } 
    } catch (e) {
      console.error(e);
      throw new Error('Invalid User');
    }


  };

  // Bearer AUTH: Validating a token
  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      console.log('payload', parsedToken);
      
      const user = await this.findOne({ where: { username: parsedToken.username } });
      
      console.log('model.authenticateToken', user);
      if (user) { return user;
      }
      throw new Error('User Not Found');
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return model;
};

module.exports = userSchema;
