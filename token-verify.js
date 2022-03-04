const jwt = require('jsonwebtoken');

const secret = 'myDog';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY0NjQyNDY4OH0.TCTZDiB6iu38s3LRRA9heEq4wSDdS8AIuQwcKV6g6j0';

function verifyToken(token, secret){
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
