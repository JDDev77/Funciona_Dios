const Alquileres = require("../models/alquileres.model")
const Usuarios = require("../models/usuarios.model")
const wrapAsync = require("../utils/functions")
const usLogin = require("../models/login.model")
const mongoConn = require("../config/mongoDB.config")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("../middlewares/auth-google.mw")
const passport = require("passport")

exports.renderIndexPage = wrapAsync(async (req, res) => {
  try {
    let alquileres
    let usuarios

    res.cookie("Pagina de inicio", "blue", { signed: true })

    alquileres = await Alquileres.findAll()
    usuarios = await Usuarios.find()
    res.render("index.ejs", {
      usuarios,
      alquileres,
      usLogin: req.session.usLoginLogued,
    })
  } catch (error) {
    console.log(error)
    res.render("error.ejs")
  }
})

exports.renderAreaPersonalPage = wrapAsync(async (req, res, next) => {
  let usuarios
  usuarios = await Usuarios.find()
  res.render("area-personal.ejs", { usuarios })
})

exports.renderCookiePage = async (req, res) => {
  res.cookie("Pagina de la cookie", "green", { signed: true })
}
exports.renderLogin = (req, res) => {
  res.render("login.ejs")
}

exports.registerLogin = (req, res) => {
  res.render("regUsu.ejs")
}
exports.renderMain = (req, res) => {
  res.render("main.ejs")
}
exports.createUserLogin = wrapAsync(async (req, res, next) => {
  try {
    await mongoConn.conectarMongoDB()
    const newUser = new usLogin(req.body)
    newUser.password = await bcrypt.hash(newUser.password, 12)
    newUser.profile = "USER"
    console.log(req.body)
    await newUser.save()
    res.redirect("/")
  } catch (error) {
    console.error("Error al crear usuario:", error)
    next(error)
  } finally {
    await mongoConn.close()
  }
})
/*
exports.login = async function(req,res){
  const { username, password } = req.body   

  const pwd_textoPlano = password
  let usLoginFoundData = null

  await usLogin.findByUsername(username,function(usLoginFound,err){
      if(err){
          res.render("loginError.ejs")
      }else{
          usLoginFoundData = usLoginFound
      }
  })

  if(usLoginFoundData){
      const validado = await bcrypt.compare(pwd_textoPlano, usLoginFoundData.password)


      if(validado){
          //CREAR TOKEN JWT
          const token = jwt.sign(
              {check:true},
              "secretJWT",
              {expiresIn:1440}
          )
          req.session.jwtToken = token
          //req.session.usLogin = usLoginFoundData
          req.session.usLoginLogued = usLoginFoundData
          console.log(req.session.usLoginLogued)
          //res.status(200).json(usLoginFoundData)
          res.redirect("/main")
      }else{
          res.render("loginError.ejs")
      }

  }

}
*/

exports.logout = (req, res) => {
  jwt.sign(req.session.jwtToken, "", { expiresIn: 1 }, (logout, err) => {
    if (err) {
    }
  })
  req.session.destroy()
  res.redirect("/")
}
exports.login = async function (req, res) {
  const { username, password } = req.body

  try {
    const usLoginFoundData = await usLogin.findOne({ username: username })

    if (!usLoginFoundData) {
      
      return res.render("login.ejs", { errorMessage: "Usuario no encontrado" })
    }

    const validado = await bcrypt.compare(password, usLoginFoundData.password)

    if (!validado) {
      
      return res.render("login.ejs", { errorMessage: "Contraseña incorrecta" })
    }

    
    const token = jwt.sign({ check: true }, "secretJWT", { expiresIn: 1440 })
    req.session.jwtToken = token
    req.session.usLoginLogued = usLoginFoundData
    res.redirect("/main")
  } catch (error) {
    console.error("Error en el proceso de login:", error)
    res.render("error.ejs", { errorMessage: "Error procesando el login" })
  }
}

exports.passportAuthenticate = passport.authenticate("google", {
  scope: ["email", "profile"],
})

exports.passportCallback = passport.authenticate("google", {
  successRedirect: "/auth/google/protected", 
  failureRedirect: "/auth/google/failure", 
})

exports.passportSuccess = async function (req, res, next) {
  console.log(req.user)
  console.log(req.user.displayName)

  let usuarioEncontrado = await usLogin.findOne({
    email: req.user.emails[0].value,
  })

  if (!usuarioEncontrado) {
    usuarioEncontrado = new usLogin({
      username: req.user.displayName,
      email: req.user.emails[0].value,
      profile: "USER",
      password: "usuario",
    })
    usuarioEncontrado.password = await bcrypt.hash(
      usuarioEncontrado.password,
      12
    )
    await usuarioEncontrado.save()
  } else {
  }

  const token = jwt.sign(
    {
      userId: usuarioEncontrado._id,
      email: usuarioEncontrado.email,
      profile: usuarioEncontrado.profile,
    },
    "secretJWT1234",
    { expiresIn: "1h" }
  )

  req.session.jwtToken = token
  req.session.usLoginLogued = usuarioEncontrado

  res.redirect("/main")
}

exports.passportFailure = function (req, res) {
  res.status(500).json({ msg: "Error de Google" })
}

exports.passportLogout = function (req, res) {
  req.session.destroy()
  res.redirect("/login")
}

