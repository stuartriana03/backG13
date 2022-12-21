const Usuario = require ("../models/usuario.js");
const bcryptjs = require ("bcryptjs");

exports.crearUsuario = async(req, res) => {
    //console.log(req.body);
    const {password, email} = req.body;    

    try{
        //Revisar que sea un umico correo
        let usuario = await Usuario.findOne({email});

        if (usuario){
            return res.status(400).json({msg:"El usuario ya existe"});
        }
        //crear nuevo usuario
        usuario = new Usuario(req.body);

        //hash (encriptar)
        usuario.password = await bcryptjs.hash(password,10);

        //Guardar usuario en la BD
        const usuarioAlmacenado = await usuario.save();
        res.json(usuarioAlmacenado);

    }catch(error){  
        console.log(error);
    }
};