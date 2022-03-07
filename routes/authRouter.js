const express = require('express');
const passport = require('passport');
const AuthService = require('../services/authService');
const service = new AuthService();
const router = express.Router();

router.post('/login',
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
  async (req, res, next)=>{
  try {
    const { email } = req.body;
    res.json(await service.sendMail(email));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
