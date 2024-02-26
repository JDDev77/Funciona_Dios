const mongoConn = require("../config/mongoDB.config")
const User = require("../models/usuarios.model")
const wrapAsync = require("../utils/functions")

exports.findAllUsers = wrapAsync(async (req, res, next) => {
  try {
    await mongoConn.conectarMongoDB()
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    console.error("Error al obtener usuarios:", error)
    next(error)
  } finally {
    await mongoConn.close()
  }
})

exports.findUserByUsername = wrapAsync(async (req, res, next) => {
  try {
    const { username } = req.params
    await mongoConn.conectarMongoDB()
    const user = await User.findOne({ username: username })
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ msg: "Usuario no encontrado" })
    }
  } catch (error) {
    console.error("Error al buscar usuario por nombre de usuario:", error)
    next(error)
  } finally {
    await mongoConn.close()
  }
})

exports.createUser = wrapAsync(async (req, res, next) => {
  try {
    await mongoConn.conectarMongoDB()
    const newUser = new User(req.body)
    await newUser.save()
    res.redirect("/area-personal")
  } catch (error) {
    console.error("Error al crear usuario:", error)
    next(error)
  } finally {
    await mongoConn.close()
  }
})

exports.updateUser = wrapAsync(async (req, res, next) => {
  try {
    const { nif } = req.params
    await mongoConn.conectarMongoDB()
    const userToUpdate = req.body
    await User.findOneAndUpdate({ nif: nif }, userToUpdate)
    res.redirect("/area-personal")
  } catch (error) {
    console.error("Error al actualizar usuario:", error)
    next(error)
  } finally {
    await mongoConn.close()
  }
})

exports.deleteUser = wrapAsync(async (req, res, next) => {
  try {
    const { nif } = req.params
    await mongoConn.conectarMongoDB()
    await User.findOneAndDelete({ nif: nif })
    res.redirect("/area-personal")
  } catch (error) {
    console.error("Error al eliminar usuario:", error)
    next(error)
  } finally {
    await mongoConn.close()
  }
})

exports.renderEditUserPage = wrapAsync(async (req, res, next) => {
  try {
    const { nif } = req.params
    await mongoConn.conectarMongoDB()
    const user = await User.findOne({ nif: nif })
    res.render("editMongo.ejs", { usuario: user })
  } catch (error) {
    console.error("Error al obtener datos de edición del usuario:", error)
    res.status(500).send("Error al obtener datos de edición del usuario.")
  } finally {
    await mongoConn.close()
  }
})

exports.renderShowUserPage = wrapAsync(async (req, res, next) => {
  const { nif } = req.params
  try {
    await mongoConn.conectarMongoDB()
    const user = await User.findOne({ nif: nif })
    res.render("showMongo.ejs", {
      usuario: user,
      usLogin: req.session.usLoginLogued,
    })
  } catch (error) {
    console.error("Error al obtener página del usuario:", error)
    res.status(500).send("Error al obtener página del usuario.")
  } finally {
    await mongoConn.close()
  }
})

exports.renderCreateUserPage = wrapAsync(async (req, res, next) => {
  try {
    await mongoConn.conectarMongoDB()
    res.render("newMongo.ejs")
  } catch (error) {
    console.error("Error al obtener página de creación de usuario:", error)
    res.status(500).send("Error al obtener página de creación de usuario.")
  } finally {
    await mongoConn.close()
  }
})

exports.renderErrorPage = async (req, res) => {
  res.render("error.ejs")
}
