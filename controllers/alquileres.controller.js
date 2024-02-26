const Alquiler = require("../models/alquileres.model")
const wrapAsync = require("../utils/functions")
//const swal = require('sweetalert2')
let cart = []
let precioCompra = 0
let cant = 0
exports.findAllAlquileres = wrapAsync(async (req, res, next) => {
  try {
    const alquileres = await Alquiler.findAll()
    res.status(200).json(alquileres)
  } catch (error) {
    console.error("Error al obtener alquileres:", error)
    next(error)
  }
})

exports.findAlquilerByNIF = wrapAsync(async (req, res, next) => {
  try {
    const { nif } = req.params
    const alquiler = await Alquiler.findByNIF(nif)
    if (alquiler.length > 0) {
      res.status(200).json(alquiler)
    } else {
      res.status(404).json({ msg: "Alquiler no encontrado" })
    }
  } catch (error) {
    console.error("Error al buscar alquiler por NIF:", error)
    next(error)
  }
})

exports.createAlquiler = wrapAsync(async (req, res, next) => {
  try {
    const { nif, precio, marca, modelo, fechaRecogida, fechaDevolucion, URL } =
      req.body
    const newAlquiler = {
      nif,
      precio,
      marca,
      modelo,
      fecha_recogida: fechaRecogida,
      fecha_devolucion: fechaDevolucion,
      URL,
    }
    await Alquiler.create(newAlquiler)
    res.redirect("/index")
  } catch (error) {
    console.error("Error al crear alquiler:", error)
    next(error)
  }
})

exports.updateAlquiler = wrapAsync(async (req, res, next) => {
  try {
    const alquilerToUpdate = {
      precio: req.body.precio,
      marca: req.body.marca,
      modelo: req.body.modelo,
      fecha_recogida: req.body.fecha_recogida,
      fecha_devolucion: req.body.fecha_devolucion,
      url: req.body.URL,
    }
    const { nif } = req.params
    await Alquiler.update(nif, alquilerToUpdate)
    res.redirect("/index")
  } catch (error) {
    console.error("Error al actualizar alquiler:", error)
    next(error)
  }
})

exports.deleteAlquiler = wrapAsync(async (req, res, next) => {
  try {
    const { nif } = req.params
    await Alquiler.delete(nif)
    res.redirect("/index")
  } catch (error) {
    console.error("Error al eliminar alquiler:", error)
    next(error)
  }
})

exports.renderEditPage = async (req, res) => {
  try {
    const { nif } = req.params
    const alquiler = await Alquiler.findByNIF(nif)

    res.render("edit.ejs", { alquiler: alquiler[0] })
  } catch (error) {
    console.log(error)
    res.status(500).send("Error al obtener datos de edición.")
  }
}

exports.renderShowPage = async (req, res) => {
  try {
    const { nif } = req.params
    const alquiler = await Alquiler.findByNIF(nif)

    res.render("show.ejs", {
      alquiler: alquiler[0],
      usLogin: req.session.usLoginLogued,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send("Error al obtener datos de edición.")
  }
}

exports.renderCreateAlquilerPage = async (req, res) => {
  try {
    res.render("new.ejs")
  } catch (error) {
    console.log(error)
    res.status(500).send("Error al obtener pagina de creación.")
  }
}

exports.renderErrorPage = async (req, res) => {
  res.render("error.ejs")
}

exports.agregarAlquileresCarrito = async (req, res) => {
  const { nif } = req.params
  const selectedItem = await Alquiler.findByNIF(nif)

  if (selectedItem) {
    // Check if the item is already in the cart
    const index = cart.findIndex((item) => item.NIF === nif)
    if (index !== -1) {
      // If the item is already in the cart, increment its quantity
      cart[index].cantidad++
    } else {
      // If the item is not in the cart, add it with quantity 1
      let result = Object.values(JSON.parse(JSON.stringify(selectedItem)))
      result[0].cantidad = 1
      cart.push(result[0])
    }
    /*swal.fire({
      title: "Success",
      text: "Se agregó correctamente",
      icon: "success"
    });*/
    // Update total purchase price
    precioCompra += selectedItem[0].precio
    res.render("agregedCart.ejs")
   
  } else {
    res.status(404).send("Producto no encontrado")
  }
}

exports.removeAlquileresCarrito = async (req, res) => {
  const { nif } = req.params
  const selectedItem = await Alquiler.findByNIF(nif)

  if (selectedItem) {
    const index = cart.findIndex((item) => item.NIF === nif)
    if (index !== -1) {
      // If the item is in the cart, decrement its quantity
      const removedItem = cart.splice(index, 1)[0]
      precioCompra -= removedItem.precio * removedItem.cantidad
    }
    res.render("cart.ejs", { cart, precioCompra })
  }
}

exports.renderCartPage = async (req, res) => {
  res.render("cart.ejs", { cart, precioCompra, cant })
}
