import express from 'express';
import path from 'path';

const app=express()
const port=process.env.PORT || 8080;
app.use(express.static(path.join(__dirname,'static')));
app.use('/',(_,res)=>{
    res.sendFile(path.join(__dirname+'/static/index.html'))
});

app.listen(port,()=>{
    console.log("Servidor iniciado en el puerto: "+port);
})