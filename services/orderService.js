const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService  {

  constructor() {

  }

  async create(data){
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find() {
    return [];
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    });
    if(!order){
      throw boom.notFound('order not found');
    }
    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    await order.update(changes);
    return order;
  }

  async delete(id) {
    const order = await this.findOne(id);
    order.destroy()
    return { rta: true };
  }

}

module.exports = OrderService;
