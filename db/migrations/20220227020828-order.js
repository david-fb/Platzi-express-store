'use strict';
const { DataTypes, Sequelize } = require('sequelize');
const { ORDER_TABLE } = require('./../models/orderModel');
const { CUSTOMER_TABLE } = require('./../models/customerModel');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      customerId: {
        field: 'customer_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: CUSTOMER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'paid',
        validate: {
          isIn: [['paid', 'shipped', 'delivered']]
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE);
  }
};
