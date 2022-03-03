const bcrypt = require('bcrypt');

const password = "admin";
const hashedPassword = "$2b$10$Qq2KxXeKcqgr51mTYQV0kejuzvD/hcJMz/0YAW2jYvj1yGy.BX4Wm";

bcrypt.compare(password, hashedPassword, (err, res)=>{
  console.log(res);
});
