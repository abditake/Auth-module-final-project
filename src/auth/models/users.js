'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const SECRET = process.env.API_SECRET || 'TEST_SECRET';

const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
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
    role: { 
      type: DataTypes.ENUM,
      values: ['user', 'writer', 'editor', 'admin'], 
      defaultValue: 'user', 
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ['read'],
          writer: ['read', 'create'],
          editor: ['read', 'create', 'update'],
          admin: ['read', 'create', 'update', 'delete'],
        };
        return acl[this.role];
      },
    },
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
