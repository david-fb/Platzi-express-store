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
    return users;
  }

  async findOne(id){
    const user = await models.User.scope("withPassword").findByPk(id);
    if(!user){
      throw boom.notFound('user not found');
    }
    //delete user.dataValues.password; //para eliminar un atributo del objeto
    return user;
  }

  async findByEmail(email){
    const user = await models.User.scope("withPassword").findOne({
      where: { email }
    });
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
