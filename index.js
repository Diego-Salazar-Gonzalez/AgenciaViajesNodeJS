
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv/config';


const app = express();

//Conectar la base de datos
db.authenticate()
    .then(()=>console.log('Base de datos conectada'))
    .catch( error => console.log(error));

//Definir puerto
const port = process.env.PORT || 4000;

//Definir PUG
app.set('view engine','pug');

//Obtener el año actual
app.use((req,res,next)=>{
    const year = new Date();

    res.locals.ActualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes"
    next();
});
//agregando body parse
app.use(express.urlencoded({extended: true}))

//Definiendo la carpeta publica
app.use(express.static('public'))

//Agregar Router
app.use('/',router);


app.listen(port,()=>{
    console.log(`El Servidor esta funcionando en el puerto ${port}`)
})