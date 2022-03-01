'use strict';

const { DataTypes } = require('sequelize');

const { ORDER_TABLE } = require('./../models/orderModel');

module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn(ORDER_TABLE, 'state', {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'paid',
      validate: {
        isIn: [['paid', 'shipped', 'delivered']]
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(ORDER_TABLE, 'state')
  }
};
