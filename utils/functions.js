// Selecciona el botón
//const miBoton = document.getElementById('sweet');

// Agrega un evento onclick al botón
/*miBoton.addEventListener('click', function() {
  // Muestra un SweetAlert
  Swal.fire({
    title: "Good job!",
    text: "You clicked the button!",
    icon: "success"
  });
});*/


function wrapAsync(fn){
    return function(req,res,next){
        fn(req,res,next).catch(e => next(e))
    }
}

module.exports = wrapAsync

