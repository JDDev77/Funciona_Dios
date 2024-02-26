const AppError = require("../AppError")

const verificar = (req, res, next) => {
  if (req.session && req.session.user) {
    next()
  } else {
    return next(new AppError("No tienes permiso para acceder", 401))
  }
}

module.exports = verificar
