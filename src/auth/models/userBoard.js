'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('UserBoard', {
    recipient: {
      type: DataTypes.STRING,
      allowNull: false ,
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};


