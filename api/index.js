const express = require('express')
const app = express()
const dotenv = require("dotenv")
const mongoose=require('mongoose')

// create mongo db connection
dotenv.config() // inicializando env que va a guardar la url para que no se vea db ni pass
mongoose.connect(process.env.MONGO_URL,{ // conexion a db usando mongoose y dotenv
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log("conectado a la database"))
.catch((err) => console.log("error en la conexion "+ err))


// backend server
app.listen(8800,() => {
    console.log("backend server running")
})