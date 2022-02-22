'use strict';

const { DataTypes } = require('sequelize');

const { CUSTOMER_TABLE } = require('./../models/customerModel');

module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      field: 'user_id',
      allowNull: null,
      type: DataTypes.INTEGER,
      unique: true,
    });
  },

  async down (queryInterface) {
    //await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
