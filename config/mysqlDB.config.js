const mysql = require("mysql")
const fs = require("fs")

/*const dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mysqlDBAlquileres",
})/*

/*const dbConn = mysql.createConnection({
    host:"az9000-mysql-juandev.mysql.database.azure.com",
    user:"juandev",
    password:"Kerim1234!",
    port: 3306,
    ssl: {ca: fs.readFileSync()},
    database:"mysqlDBAlquileres"
})*/

const dbConn = mysql.createConnection({
    host:"az900-mysql-juandev.mysql.database.azure.com",
    user:"juandev",
    password:"Kerim1234!",
    database:"mysqldbalquileres",
    ssl: {ca: fs.readFileSync("./certificados/DigiCertGlobalRootCA.crt.pem")},
})

dbConn.establecerConexion = async () => {
  await dbConn.connect((err) => {
    if (err) {
      console.error("Error conectando con MySQL:", err)
      process.exit(1)
    } else {
      console.log("Conectado con MySQL Azure")
    }
  })
}

dbConn.crearEstructura = async () => {
  const sql = `CREATE DATABASE IF NOT EXISTS mysqlDBAlquileres  USE mysqlDBAlquileres 
    CREATE TABLE IF NOT EXISTS alquileres(
        NIF CHAR(9) NOT NULL,
        precio DECIMAL(10,2),
        marca VARCHAR(255),
        modelo VARCHAR(255),
        fecha_recogida VARCHAR(255),
        fecha_devolucion VARCHAR(255),
        URL VARCHAR(255),
        PRIMARY KEY (NIF)
    ) `

  sql.split(" ").forEach(async (q) => {
    if (q.trim().length !== 0) {
      dbConn.query(q, (err, res) => {
        if (err) {
          console.log(err)
        }
      })
    }
  })
}

module.exports = dbConn
