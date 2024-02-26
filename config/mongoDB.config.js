const mongoose = require("mongoose")
const mongoConn = mongoose.createConnection()
const url = "mongodb+srv://kerimskmbre:djvslgt86f_gsl@drive.5bi9dvg.mongodb.net/?retryWrites=true&w=majority&appName=DRIVE"

mongoConn.conectarMongoDB = async()=>{
    return mongoose.connect(url)
}

mongoConn.establecerConexion = async()=>{
    try{
        await mongoConn.conectarMongoDB()
        .then(()=>{
            console.log("Conectado con MongoDB")
        })
        .catch((err)=>{
            console.log("Error 1 conectando con MongoDB: " + err)
            process.exit(0)
        })
    }catch(error){
        console.log("Error 2 conectando con MongoDB: " + error) 
        process.exit(0)
    }
}

module.exports = mongoConn