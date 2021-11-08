const express = require('express')
const app = express()
const dotenv = require("dotenv")
const mongoose=require('mongoose')
const newHandRoute = require("./routes/hands")

// create mongo db connection
dotenv.config() // inicializando env que va a guardar la url para que no se vea db ni pass
mongoose.connect(process.env.MONGO_URL,{ // conexion a db usando mongoose y dotenv
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log("conectado a la database"))
.catch((err) => console.log("error en la conexion "+ err))

app.use(express.json()) // obligas a que express acepte json como argumento de la route que va para db

//permitir que se hagan api request desde el frontend sin header
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Headers","*")
    next()
})

app.use("",newHandRoute) // definiendo ruta de creacion de mano


// backend server
app.listen(8800,() => {
    console.log("backend server running")
})