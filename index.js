const express = require('express');
const routerApi = require('./routes')
const cors = require('cors')
const fileUpload = require('express-fileupload');
const app = express();
const port = process.env.PORT || 3000;

const { logErrors, errorHandler, boomErrorHandler ,ormErrorHandler} = require('./middlewares/errorHandler');

app.use(express.json());
app.use(fileUpload());

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
app.use(cors());

require('./utils/auth');

app.get('/', (req, res)=>{
  res.send('Hello my express server');
});

//express static para Servicio de archivos estáticos
app.use('/images', express.static(__dirname + '/uploads'));

routerApi(app)

app.use(logErrors);
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.use(errorHandler);

app.listen(port, ()=>{
  console.log(`Running on http://localhost:${port}`);
});
