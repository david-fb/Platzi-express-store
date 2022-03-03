const boom = require('@hapi/boom');
//const getConnection = require('../libs/postgres');
const { models } = require('../libs/sequelize')

class UserService {

  constructor(){

  }

  async create(data){
    const newUser = await models.User.create(data);
    delete newUser.dataValues.password;
    return newUser;
  }

  async find(){
    const users = await models.User.findAll({
      include: ['customer'],
    });
    for(let user of users){
      delete user.dataValues.password;
    }
    return users;
  }

  async findOne(id){
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('user not found');
    }
    delete user.dataValues.password;
    return user;
  }

  async update(id, changes){
    const user = await this.findOne(id);
    const response = await user.update(changes);
    return response;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }

}

module.exports = UserService;
