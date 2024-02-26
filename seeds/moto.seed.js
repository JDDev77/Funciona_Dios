const motos = require("../models/motos.model")
const mongoConn = require("../config/mongoDB.config")

const ejecutar = async () => {
  await mongoConn
    .conectarMongoDB()
    .then(() => {
      console.log("Conectado")
    })
    .catch((err) => {
      console.log(err)
    })

    const listaMotos = [
        {
          marca: "Harley-Davidson",
          modelo: "Iron 883",
          precio: "80",  
          fecha_recogida: new Date("2024-03-01"),
          fecha_devolucion: new Date("2024-03-10"),
        },
        {
          marca: "Yamaha",
          modelo: "MT-07",
          precio: "65",  
          fecha_recogida: new Date("2024-04-15"),
          fecha_devolucion: new Date("2024-04-20"),
        },
        {
          marca: "Ducati",
          modelo: "Monster 821",
          precio: "95",  
          fecha_recogida: new Date("2024-05-05"),
          fecha_devolucion: new Date("2024-05-12"),
        }
      ]
      
      

  await motos
    .insertMany(listaMotos)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })

  await mongoConn.close()
  process.exit()
}

ejecutar()
