const dbConn = require("../config/mysqlDB.config")

const ejecutar = async()=>{
    await dbConn.crearEstructura()

    const alquileres = [
        {   
            nif: "12345678A",
            precio: 30,
            marca:"Renault",
            modelo:"Megane",
            fecha_recogida:"2023/12/12",
            fecha_devolucion:"2023/12/13",
            URL: "https://cdn.autobild.es/sites/navi.axelspringer.es/public/bdc/dc/fotos/renault-captur-2020_11.jpg?tf=1200x"
        },
        {   
            nif: "12345675B",
            precio: 50,
            marca:"Mercedes",
            modelo:"Clase A",
            fecha_recogida:"2023/12/12",
            fecha_devolucion:"2023/12/13",
            URL: "https://grupocadimar.com/wp-content/uploads/2022/02/mercedes_clase_a_005_1920x1600c-1024x576.jpeg"
        },
        {   
            nif: "12345676C",
            precio: 40,
            marca:"Volvo",
            modelo:"Rio",
            fecha_recogida: "2023/12/12",
            fecha_devolucion:"2023/12/13",
            URL: "https://www.diariomotor.com/imagenes/2018/06/volvo-s60-2019-20-750x563.webp"
        },
    ]

    try{
        const sql = "insert into alquileres set ?"
        alquileres.map(async(a)=>{
            await dbConn.query(sql,a,(err,res)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log(res)
                }
            })
        })
    }catch(error){
        console.log(error)
    }  
}

ejecutar()