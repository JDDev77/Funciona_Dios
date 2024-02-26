function basicAuth(req,res,next){
    /*console.log("HEADERS")
    console.log(req.headers.authorization)
    console.log("--------------")*/
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Basic'){
        req.session.basicAuthToken = req.headers.authorization.split(' ')[1]
        next()
    } else {
        res.status(401).json({"err":"No existe autenticación básica"})
    }
    
}

module.exports = basicAuth