const producto = require("../models/producto.js");
const Categoria = require ("../models/categoria");


exports.leerProductoHome = async ( req, res ) => {
    try{
        const producto1 = await producto.find();
        res.json({producto1});
    }catch(error){
        console.log(error);
    }
}
exports.leerProducto = async(req, res)=>{
    const {id} = req.params;
    const producto1 = await producto.find().where("categoriaId").equals(id);
    res.json(producto1);
}
exports.crearProducto = async(req, res)=>{
    try{
        const producto1 = new producto(req.body);
        producto1.save();
        res.json(producto1);
    }catch(error){
        console.log(error);
    }

}
exports.actualizarProducto = async(req, res)=>{
    //res.json({msg:"Ejecuto actualizar producto"});
    const {id} = req.params;
    const producto1 = await producto.findById(id);
    if(!producto1){
        return res.status(400).json({msg:"Producto no encontrado"});
    }
    producto1.nombre = req.body.nombre || producto1.nombre;
    producto1.descripcion = req.body.descripcion || producto1.descripcion;
    producto1.stock = req.body.stock || producto1.stock;
    producto1.precio = req.body.precio || producto1.precio;
    producto1.categoriaId = req.categoria || producto1.categoriaId;
    producto1.save();
    res.json({producto1});
}
exports.borrarProducto = async(req, res)=>{
    //res.json({msg:"Ejecuto borrar producto"});
    try{
        await producto.deleteOne({_id:req.params.id});
        res.json({msg:"Producto Eliminado"});
    }catch(error){
        console.log(error);
    }
}