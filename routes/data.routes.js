
const datosController = require("../controllers/data.controller");
const express = require("express");
const router = express.Router();
const morgan = require("morgan");
const fs = require("fs");
const verificar = require("../middlewares/verificar.mw");
const AppError = require("../AppError");
const errorHandler = require("../middlewares/errorHandler.mw");
const sessionMiddleware = require("../middlewares/session.mw");
const cookieParserMiddleware = require("../middlewares/cookie-parser.mw");
const { requireLogin, requireAdmin } = require("../middlewares/login.mw")
const basicAuth = require("../middlewares/basicAuth.mw")

  morgan("combined", {
    stream: fs.createWriteStream("./logs/access.log", { flags: "a" }),
  })


router.use(cookieParserMiddleware)
router.use(sessionMiddleware)

router.get("/index", datosController.renderIndexPage)
router.get("/area-personal",requireAdmin, datosController.renderAreaPersonalPage)

router.get("/", datosController.renderLogin)
router.post("/", datosController.login)

router.get("/reg", datosController.registerLogin)
router.post("/reg", datosController.createUserLogin)

router.get("/logout", datosController.logout)

router.get("/main", datosController.renderMain)
/*router.use((req, res, next) => {
    throw new AppError("Ruta no existente", 404) 
}) */

router.get("/auth/google", datosController.passportAuthenticate)
router.get("/auth/google/callback", datosController.passportCallback)
router.get("/auth/google/protected", datosController.passportSuccess)
router.get("/auth/google/failure", datosController.passportFailure)
router.get("/auth/google/logout", datosController.passportLogout)
module.exports = router;