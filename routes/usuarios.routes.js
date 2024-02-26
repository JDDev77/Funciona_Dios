const userController = require("../controllers/usuario.controller")
const express = require("express")
const router = express.Router()
const morgan = require("morgan")
const fs = require("fs")
const verificar = require("../middlewares/verificar.mw")
const sessionMiddleware = require("../middlewares/session.mw")
const cookieParserMiddleware = require("../middlewares/cookie-parser.mw")
const { requireLogin, requireAdmin } = require("../middlewares/login.mw")
const rutasProtegidasJWT = require("../middlewares/jwt.mw")

router.use(
  morgan("combined", {
    stream: fs.createWriteStream("./logs/access.log", { flags: "a" }),
  })
)

router.use(cookieParserMiddleware)
router.use(sessionMiddleware)

router.get("/", userController.findAllUsers)

router.get("/:nif", userController.findUserByUsername)

router.post("/", requireAdmin, userController.createUser)

router.patch("/:nif", requireAdmin, userController.updateUser)

router.delete("/:nif", requireAdmin, userController.deleteUser)

router.get("/editMongo/:nif", requireLogin, userController.renderEditUserPage)

router.get("/showMongo/:nif", requireLogin, userController.renderShowUserPage)

router.get(
  "/create/newMongo",
  requireAdmin,
  userController.renderCreateUserPage
)

router.get("*", userController.renderErrorPage)

module.exports = router
