const dbConn = require("../config/mysqlDB.config")

const Alquiler = function (alquiler) {
    this.nif = alquiler.nif,
    this.precio = alquiler.precio,
    this.marca = alquiler.marca,
    this.modelo = alquiler.modelo,
    this.fecha_recogida = alquiler.fecha_recogida,
    this.fecha_devolucion = alquiler.fecha_devolucion
    this.URL = alquiler.URL
}

Alquiler.findAll = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM alquileres"
    dbConn.query(sql, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

Alquiler.findByNIF = (nif) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM alquileres WHERE nif = ?"
    dbConn.query(sql, nif, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

Alquiler.create = (newAlquiler) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO alquileres SET ?"
    dbConn.query(sql, newAlquiler, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

Alquiler.update = (nif, alquilerToUpdate) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE alquileres SET ? WHERE NIF = ?"
    console.log("SQL Query:", sql)
    console.log("Data to Update:", alquilerToUpdate)
    console.log("NIF:", nif)

    dbConn.query(sql, [alquilerToUpdate, nif], (err, res) => {
      if (err) {
        console.error("Error in SQL Query:", err)
        reject(err)
      } else {
        console.log("Update Result:", res)
        resolve(res)
      }
    })
  })
}

Alquiler.delete = (nif) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM alquileres WHERE nif = ?"
    dbConn.query(sql, nif, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

module.exports = Alquiler
