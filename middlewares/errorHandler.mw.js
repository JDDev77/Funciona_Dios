const logger = require("../logger")

function errorHandler(err,req,res,next){
    const { status = 500, message = "FALLO GENERAL "} = err
    logger.error.error(status + " " + message)
    //res.status(status).send(message)
    res.render("error.ejs", {message, status})
   
}

module.exports = errorHandler