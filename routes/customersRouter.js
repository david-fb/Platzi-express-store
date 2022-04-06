const express = require('express');
const passport = require('passport');

const CustomerService = require('../services/customerService');
const validationHandler = require('../middlewares/validatorHandler');
const { checkRoles } = require('../middlewares/authHandler')

const {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema
} = require('../schemas/customerSchema');

const router = express.Router();
const service = new CustomerService();

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next)=> {
  try {
    const {id} =req.params;
    res.status(200).json(await service.findByUserId(id));
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
});

router.patch('/:id',
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    res.status(201).json(await service.update(id, body));
  } catch (error) {
    next(error)
  }
});

router.delete('/:id',
  passport.authenticate('jwt', { session: false}),
  checkRoles('admin'),
  validationHandler(getCustomerSchema, 'params'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error)
    }
});

module.exports = router;
