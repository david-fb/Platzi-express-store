const faker = require('faker');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize')
class ProductsService {
  constructor(){
    this.products = [];
    this.generate();
  }

  async generate(){
    const limit = 100
    for(let index = 0; index < limit; index++){
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      })
    }
  }

  async create(data){
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query){
    const options = {
      include: ['category']
    }
    const { limit, offset } = query;
    if(limit && offset){
      options.limit = parseInt(limit);
      options.offset = parseInt(offset);
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id){
    const product = await models.Product.findByPk(id, {
      include: ['category']
    });
    if(!product){
      throw boom.notFound('Product not found');
    }
    if(product.isBlock){
      throw boom.conflict('Product is block');
    }
    return product
  }

  async update(id, changes){
    const product = await this.findOne(id);
    const response = await product.update(changes);
    return response;
  }

  async delete(id){
    const product = await this.findOne(id);
    product.destroy();
    return { rta: true}
  }
}

module.exports = ProductsService
