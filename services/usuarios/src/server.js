import "core-js/stable";
import "regenerator-runtime/runtime";

import express from 'express';
import cors from 'cors';
import router from './routes';
import admin from 'firebase-admin';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerSpec={
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'Microservicios de usuarios',
          version: '0.1.0',
          description: 'Api creada para reto backend developer'
        },
        servers: [{
          url: 'https://usuarios-dot-microservicios-348814.ue.r.appspot.com/',
        }],
    },
    apis: [__dirname+'/documentation/*.yaml'],
}

var firebaseAccount=require('./firebase.json');
admin.initializeApp({
    credential: admin.credential.cert(firebaseAccount)
})

const {json,urlencoded} = express;
const app=express()
const port=process.env.PORT || 4000;
const corsOptions = {
    origin:'*',
    optionsSuccessStatus: 200
}

app.use(json());
app.use(urlencoded({extended:false}));
app.use(cors(corsOptions));
app.use('/usuarios',router);
app.get('/',(_,res)=>{
    res.send('Servicio de usuarios')
});

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerJSDoc(swaggerSpec),{explorer:true}));
app.listen(port,()=>{
    console.log("Servidor iniciado en el puerto: "+port);
})