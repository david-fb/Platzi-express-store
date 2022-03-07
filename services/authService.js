const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { config } = require('../config/config')
const jwt = require('jsonwebtoken');
const UserService = require('./userService');
const service = new UserService();
const nodemailer = require('nodemailer');

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user){
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token
    };
  }

  async sendMail(email){
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }

    const transporter = nodemailer.createTransport({
      host: config.nmSMTP,
      port: 465, //default port 587
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.nmEmail, // generated ethereal user, testAccount.user
        pass: config.nmPassword, // generated ethereal password, testAccount.pass
      },
    });

    await transporter.sendMail({
      from: `David Basto 👨‍💻" ${config.nmEmail}`, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?1", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    return { message: 'mail sent'};
  }
}

module.exports = AuthService;
