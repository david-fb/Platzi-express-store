'use strict';

const { UserSchema, USER_TABLE } = require('./../models/userModel');


module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'recovery_token', UserSchema.recoveryToken)
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token')

  }
};
