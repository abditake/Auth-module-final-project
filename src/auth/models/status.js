'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('status', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        project: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM,
            values: ['active', 'inactive'],
            allowNull: false,
            defaultValue: 'inactive'
        },
    });
};
