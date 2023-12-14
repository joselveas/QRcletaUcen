import express from 'express';
import cors from 'cors';

import db from './database/db.js';

import router from './routes/routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/base',router);

try{
  await db.authenticate();
  console.log('Conectado a: ',db.getDatabaseName())
}catch(error){
  console.log(`Algo saló mal en: ${error}`)
}

app.get('/', (req,res)=>{
  res.send('Servidor listo')
});

//app.get('/select',router);

app.listen(8000,()=>{
  console.log('Servidor levantado en http://localhost:8000');
})

/*const mysql = require('mysql');

const Conexion = mysql.createConnection({
  host:"localhost",
  port:3030,
  user:"root",
  password:"",
  database:"QRcleta_test01"
});

Conexion.connect(function(error){
  if(error){
    throw error;
  }else{
    console.log('conectado');
  }
})

Conexion.query('SELECT * FROM User',function(error,result,field){
  if(error){
    throw error;
  }else{
    result.forEach(result => {
      console.log(result);
    });
  }
  
})

Conexion.end();
//export default Conexion;
*/