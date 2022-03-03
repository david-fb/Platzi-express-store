const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  async find() {
    const customers = await models.Customer.findAll({
      include: ['user']
    });
    // for(let customer of customers){
    //   delete customer.dataValues.user.dataValues.password;
    // }
    return customers;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id, {
      include: ['user']
    });
    if(!customer) {
      throw boom.notFound('customer not found');
    }
    //delete customer.dataValues.user.dataValues.password;
    return customer;
  }

  async create(data) {
    const newCustomer = await await models.Customer.create(data,{
      include: ['user']
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async update(id, changes){
    const model = await this.findOne(id);
    const customer = await model.update(changes);
    return customer;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }
}

module.exports = CustomerService;
