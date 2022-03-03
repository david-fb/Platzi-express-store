const bcrypt = require('bcrypt');

const saltRounds = 10;
const password = "admin";

bcrypt.hash(password, saltRounds, (err, hash)=>{
  console.log(hash);
});

//Otra forma
const hashPassword = async () => {
  const saltRounds = 10;
  const password = "admin";
  const hash = await bcrypt.hash(password, saltRounds);
  console.log(hash);
}

hashPassword();
