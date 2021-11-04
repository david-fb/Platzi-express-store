const express = require('express');
const routerApi = require('./routes')
const app = express();
const port = 3000;

const { logErrors, errorHandler, boomErrorHandler} = require('./middlewares/errorHandler');

app.use(express.json());

app.get('/', (req, res)=>{
  res.send('Hello my express server');
});

routerApi(app)

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=>{
  console.log('Mi port: ' + port);
});
