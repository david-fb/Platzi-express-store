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

  async sendRecovery(email){
    const user = await service.findByEmail(email);

    if(!user){
      throw boom.unauthorized();
    }
    const payload = {
      sub: user.id,
    }
    const token = jwt.sign(payload, config.jwtSecretRecovery, { expiresIn: '15min'});

    await service.update(user.id, {
      recoveryToken: token
    })

    const link = `http://myfrontend.com/recovery?token=${token}`

    const info = {
      from: `David Basto 👨‍💻" ${config.nmEmail}`, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Restablecer contraseña", // Subject line
      html: `<b>Link para restablecer contraseña ${link}</b>`, // html body
    }
    const rta = await this.sendMail(info);
    return rta;
  }

  async sendMail(mail){

    const transporter = nodemailer.createTransport({
      host: config.nmSMTP,
      port: 465, //default port 587
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.nmEmail, // generated ethereal user, testAccount.user
        pass: config.nmPassword, // generated ethereal password, testAccount.pass
      },
    });

    await transporter.sendMail(mail);

    return { message: 'mail sent'};
  }
}

module.exports = AuthService;
