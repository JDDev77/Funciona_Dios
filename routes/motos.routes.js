const express = require("express")
const router = express.Router()
const Moto = require("../models/motos.model")
const cors = require("cors")
const motosController = require("../controllers/motos.controller.js")

// Configuración básica de CORS
router.use(cors())

// Endpoint para obtener todas las motos
router.get("/motos", motosController.getAllMotos)
router.post("/motos", motosController.createMoto)
router.delete("/motos/:id", motosController.deleteMoto)
router.get("/motos/:id", motosController.getMotoById)
router.put("/motos/:id", motosController.updateMoto)
module.exports = router
