const session = require("express-session")

const sessionMiddleware = session({
  secret: "contraseñaqueosdelagana",
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: "none",
    maxAge: 60 * 60 * 24 * 1000,
    //secure: true
  },
})

module.exports = sessionMiddleware
