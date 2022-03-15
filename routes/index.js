const express = require('express');


const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');
const orderRouter = require('./orderRouter');
const customersRouter = require('./customersRouter');
const authRouter = require('./authRouter');
const profileRouter = require('./profileRouter');
const fileRouter = require('./fileRouter');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/orders', orderRouter);
  router.use('/customers', customersRouter)
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
  router.use('/file', fileRouter);
}

module.exports = routerApi;
