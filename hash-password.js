const bcrypt = require('bcrypt');

const saltRounds = 10;
const password = "admin";

bcrypt.hash(password, saltRounds, (err, hash)=>{
  console.log(hash);
});
