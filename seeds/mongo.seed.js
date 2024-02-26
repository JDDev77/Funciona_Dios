const Usuario = require("../models/usuarios.model")
const mongoConn = require("../config/mongoDB.config")

const ejecutar = async()=>{
    await mongoConn.conectarMongoDB()
    .then(()=>{
        console.log("Conectado")
    })
    .catch((err)=>{
        console.log(err)
    })

    const usuarios = [
        {   
            nif:"12345678M",
            nombre:"Alejandro",
            apellidos:"Izquierdo Huesca",
            fechaNac: "2003/11/26"
        },
        {   
            nif:"12345678A",
            nombre:"Kerim",
            apellidos:"Esquembre Kucukalic",
            fechaNac: "2003/12/26"
        },
        {   
            nif:"12345678B",
            nombre:"Samuel",
            apellidos:"Sanjuan Sarrión",
            fechaNac: "2003/10/26"
        },
        {   
            nif:"12345678C",
            nombre:"Juan David",
            apellidos:"Íñiguez Rodríguez",
            fechaNac: "2002/11/26"
        },
    ]

    await Usuario.insertMany(usuarios)
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })

    await mongoConn.close()
    process.exit()
}

ejecutar()