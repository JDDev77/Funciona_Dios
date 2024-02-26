
const requireLogin = (req,res,next) => {
    if(req.session.usLoginLogued){
        next()
    }else{
        res.status(401).json({"err":"Usuario no logueado"})
    }
}

const requireAdmin = (req,res,next) => 
{
    if(req.session.usLoginLogued && req.session.usLoginLogued.profile == "ADMIN"){
        next()
    }else{
        res.status(401).json({"err":"Usuario sin permisos de administrador"})
    }
}

module.exports = {requireLogin, requireAdmin}