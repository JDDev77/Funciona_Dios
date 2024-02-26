const usLogin = require("../models/login.model")
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

  const usuarios = [
    {
      username: "admin",
      password: "admin",
      profile: "ADMIN"
    },
    {
      username: "usu",
      password: "usu",
      profile: "USER",
    },
  ]

  await usLogin
    .insertMany(usuarios)
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
