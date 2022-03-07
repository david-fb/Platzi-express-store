const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
};

class User extends Model {
  static associate(models){
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId',
    });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false, //para que no se creen los campos created_at y update_at de forma automatica
      hooks: {
        beforeCreate: async (user) => {
          const password = await bcrypt.hash(user.password, 10);
          user.password = password;
        },
      },
      defaultScope: { //para excluir un atributo
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword:{ attributes: {}, }
      },
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }
