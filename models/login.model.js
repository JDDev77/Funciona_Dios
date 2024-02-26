const { json } = require("body-parser")
const mongoose = require("mongoose") //npm i mongoose

const usLoginSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    profile: {
        type: String,
        required: true,
        enum: ["ADMIN","USER"]
    }
})

const usLogin = mongoose.model("Usuarios_Login", usLoginSchema)

//Auxiliar para Login
usLogin.findByUsername = async function(username_param, result){
    const userFound = await usLogin.findOne({ username: username_param})
    if(userFound){
        result(userFound,null)
    }else{
        result(null, {"err":"No hay usuarios con ese username"})
        
    }
}

module.exports = usLogin