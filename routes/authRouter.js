const express = require('express');
const passport = require('passport');
const AuthService = require('../services/authService');
const service = new AuthService();
const router = express.Router();

const validatorHanlder = require('../middlewares/validatorHandler');
const { changePasswordSchema, recoverySchema, loginSchema } = require('../schemas/authSchema');

router.post('/login',
  validatorHanlder(loginSchema, 'body'),
  passport.authenticate('local', {session: false}),
  (req, res, next)=>{
  try {
    const user = req.user;
    res.json(service.signToken(user));
  } catch (error) {
    next(error);
  }
});

router.post('/recovery',
  validatorHanlder(recoverySchema, 'body'),
  async (req, res, next)=>{
  try {
    const { email } = req.body;
    res.json(await service.sendRecovery(email));
  } catch (error) {
    next(error);
  }
});

router.post('/change-password',
  validatorHanlder(changePasswordSchema, 'body'),
  async (req, res, next)=>{
  try {
    const { token, newPassword } = req.body;
    res.json(await service.changePassword(token, newPassword));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
