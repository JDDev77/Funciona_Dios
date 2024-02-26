const alquilerController = require("../controllers/alquileres.controller")
const express = require("express")
const router = express.Router()
const morgan = require("morgan")
const fs = require("fs")
const sessionMiddleware = require("../middlewares/session.mw")
const cookieParserMiddleware = require("../middlewares/cookie-parser.mw")
const { requireLogin, requireAdmin } = require("../middlewares/login.mw")

router.use(
  morgan("combined", {
    stream: fs.createWriteStream("./logs/access.log", { flags: "a" }),
  })
)

router.use(cookieParserMiddleware)
router.use(sessionMiddleware)

router.get("/", alquilerController.findAllAlquileres)

router.get("/verificar-cookies", (req, res) => {
  // Verificar si el usuario está autenticado utilizando la sesión
  if (req.session.user) {
    res.send(`Bienvenido, ${req.session.user.username}!`)
  } else {
    res.redirect("/login") // Redirigir si el usuario no está autenticado
  }
})

router.get("/:nif", alquilerController.findAlquilerByNIF)

router.post("/", requireAdmin, alquilerController.createAlquiler)

router.put("/:nif", requireAdmin, alquilerController.updateAlquiler)

router.delete("/:nif", requireAdmin, alquilerController.deleteAlquiler)

router.get("/:nif/edit", requireAdmin, alquilerController.renderEditPage)

router.get("/:nif/show", alquilerController.renderShowPage)

router.get(
  "/create/newAlquiler",
  requireAdmin,
  alquilerController.renderCreateAlquilerPage
)

router.get(
  "/add-to-cart/:nif",
  requireLogin,
  alquilerController.agregarAlquileresCarrito
)

router.get(
 "/delete/remove-from-cart/:nif",
  requireLogin,
  alquilerController.removeAlquileresCarrito
)

router.get("/ver/carrito", requireLogin, alquilerController.renderCartPage)

router.get("*", alquilerController.renderErrorPage)

module.exports = router
