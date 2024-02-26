const Moto = require("../models/motos.model") // Asegúrate de que la ruta al modelo es correcta
const mongoConn = require("../config/mongoDB.config")
const wrapAsync = require("../utils/functions")

exports.getAllMotos = async (req, res) => {
  try {
    const motos = await Moto.find()
    res.json(motos)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
// Controlador para crear una nueva moto
exports.createMoto = wrapAsync(async (req, res, next) => {
  const nuevaMoto = new Moto(req.body) // Usa 'Moto' para referenciar el modelo
  await nuevaMoto.save()
  res.status(201).json({ message: "Moto creada con éxito", moto: nuevaMoto })
  // No es necesario abrir y cerrar la conexión de MongoDB manualmente si usas una conexión persistente
})

// Controlador para eliminar una moto por ID
exports.deleteMoto = wrapAsync(async (req, res, next) => {
  const { id } = req.params // Obtén el ID de la URL
  const motoEliminada = await Moto.findByIdAndDelete(id) // Usa 'Moto' para referenciar el modelo
  if (!motoEliminada) {
    return res.status(404).json({ message: "Moto no encontrada" })
  }
  res.json({ message: "Moto eliminada con éxito" })
  // No es necesario cerrar la conexión a la base de datos aquí
})

// Controlador para obtener los detalles de una moto específica por su ID
exports.getMotoById = async (req, res) => {
  try {
    const motoDetalle = await Moto.findById(req.params.id) // Corregido para usar 'Moto' y 'motoDetalle'
    if (!motoDetalle) {
      return res.status(404).json({ message: "Moto no encontrada" })
    }
    res.json(motoDetalle) // Devuelve la moto encontrada
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la moto", error: error })
  }
}

exports.updateMoto = async (req, res) => {
  try {
    const { id } = req.params
    const motoActualizada = await Moto.findByIdAndUpdate(id, req.body, {
      new: true,
    }) // { new: true } devuelve el documento actualizado
    if (!motoActualizada) {
      return res.status(404).json({ message: "Moto no encontrada" })
    }
    res.json({ message: "Moto actualizada con éxito", moto: motoActualizada })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar la moto", error: error })
  }
}
