const express = require('express');
const passport = require('passport');

const { createOrderByToken } = require('../schemas/orderSchema');
const validatorHandler = require('../middlewares/validatorHandler');

const OrderService = require('../services/orderService');
const service = new OrderService();

const CustomerService = require('../services/customerService');
const customerService = new CustomerService();

const UserService = require('../services/userService');
const userService = new UserService();

const router = express.Router();

router.get('/',
  passport.authenticate('jwt', { session:false }),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const userRole = req.user.role;
      if(userRole === 'customer') {
        const customerData = await customerService.findByUserId(userId);
        delete customerData.dataValues.user.dataValues.password;
        delete customerData.dataValues.user.dataValues.recoveryToken;
        return res.status(200).json(customerData);
      }
      const userData = await userService.findOne(userId);
      delete userData.dataValues.password;
      delete userData.dataValues.recoveryToken;
      res.status(200).json(userData);
    } catch (error) {
      next(error)
    }
  }
);

router.get('/my-orders',
  passport.authenticate('jwt', { session:false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(await service.findByUser(user.sub));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/place-order',
  passport.authenticate('jwt', { session:false }),
  validatorHandler(createOrderByToken, 'body'),
  async (req, res ,next) => {
    try {
      const customer = await customerService.findByUserId(req.user.sub);
      const body = req.body;
      const data = {
        customerId: customer.id,
        state: body.state
      }
      res.json(await service.create(data))
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
