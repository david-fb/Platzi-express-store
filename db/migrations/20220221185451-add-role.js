'use strict';

const { UserSchema, USER_TABLE } = require('./../models/userModel');


module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn(USER_TABLE, 'role', UserSchema.role)
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'role')

  }
};
