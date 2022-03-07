const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const state = Joi.string().valid('paid', 'shipped', 'delivered');
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer();

const getOrderSchema = Joi.object({
  id: id.required(),
});

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  state: state.required()
});

const updateOrderSchema = Joi.object({
  customerId,
  state
});

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required()
});

const createOrderByToken = Joi.object({
  state: state.required()
})

module.exports = { getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
  addItemSchema,
  createOrderByToken
};
