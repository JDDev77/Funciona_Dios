const mongoose = require("mongoose")

const motosSchema = new mongoose.Schema({
    marca:{
        type:String,
        required:true,
    },
    modelo:{
        type:String,
        required:true
    },
    precio:{
        type:String,
        required:true
    },
    fecha_recogida:{
        type:Date,
        required:true
    },
    fecha_devolucion:{
        type:Date,
        required:true
    }
})

const motos = mongoose.model("Motos", motosSchema)
module.exports = motos