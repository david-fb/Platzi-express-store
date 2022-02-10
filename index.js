const express = require('express');
const routerApi = require('./routes')
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;

const { logErrors, errorHandler, boomErrorHandler} = require('./middlewares/errorHandler');

app.use(express.json());

const whitelist = ['http://localhost:8080', 'http://127.0.0.1:5500'];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin){
      callback(null, true)
    }else{
      callback(new Error('not authorized'))
    }
  }
}
app.use(cors(options));

app.get('/', (req, res)=>{
  res.send('Hello my express server');
});

routerApi(app)

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=>{
  console.log(`Running on http://localhost:${port}`);
});
