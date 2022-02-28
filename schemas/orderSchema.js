const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const state = Joi.string().valid('paid', 'shipped', 'delivered')

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

module.exports = { getOrderSchema, createOrderSchema, updateOrderSchema };
