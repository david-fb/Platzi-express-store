const Joi= require('joi');

const token = Joi.string();
const newPassword = Joi.string().min(8);
const email = Joi.string().email();
const recoveryUri = Joi.string().uri();
const password = Joi.string();

const changePasswordSchema = Joi.object({
  token: token.required(),
  newPassword: newPassword.required()
});

const recoverySchema = Joi.object({
  email: email.required(),
  recoveryUri: recoveryUri.required(),
});

const loginSchema = Joi.object({
  email: email.required(),
  password: password.required()
})

module.exports = { changePasswordSchema, recoverySchema, loginSchema }
