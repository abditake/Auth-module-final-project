'use strict';


module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Signup', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};