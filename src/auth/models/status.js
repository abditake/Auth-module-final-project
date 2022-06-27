'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('status', {
    status: {
      type: DataTypes.ENUM,
      values:['active','inactive'],
      allowNull: false ,
      defaultValue: 'inactive'
    },
    project: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });
};
