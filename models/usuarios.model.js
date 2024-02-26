const mongoose = require("mongoose") //npm i mongoose

const usuarioSchema = new mongoose.Schema({
    nif:{
        type:String,
        required:true,
        min:8
    },
    nombre:{
        type:String,
        required:true
    },
    apellidos:{
        type:String,
        required:true
    },
    fechaNac:{
        type:String,
        required:true
    }
})

const Usuario = mongoose.model("Usuarios", usuarioSchema)
module.exports = Usuario