const { User, UserSchema } = require('./userModel');

function setupModel(sequelize){
  User.init(UserSchema, User.config(sequelize));
}

module.exports = setupModel;
