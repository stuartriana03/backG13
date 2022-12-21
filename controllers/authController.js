const Usuario = require ("../models/usuario.js");
const bcryptjs = require ("bcryptjs");
const jwt = require ("jsonwebtoken");
require("dotenv").config({path:"variables.env"});

exports.autenticarUsuario = async (req, res) => {
    const {password, email} = req.body; 
    try{
        //revisar que el correo este registrado
        let usuario = await Usuario.findOne({email});

        if (!usuario){
            return res.status(400).json({msg:"El usuario no existe"});
        }
        //Validar password
        const passwordCorrecto = await bcryptjs.compare(password,usuario.password);
        if (!passwordCorrecto){
            return res.status(404).json({msg: "Password incorrecto"});
        }
        let payload = {
            usuario:{id: usuario.id}
        };
        //res.json(payload);
        //si todo es correcto: crear y firmar un token
        jwt.sign(
            payload,
            process.env.SECRETA, 
            {
                expiresIn:'30d',  // 30 dias  
            },
            (error, token) => {
                if (error) throw error;
                //Mensaje de confirmacion
                res.json({token});
            }
        );
        //console.log("Usuario valido para ingresar")
    }catch(error){
        console.log(error);
    }
}

exports.usuarioAutenticado = async (req, res) => {
    try{
        const usuario = await Usuario.findById(req.usuario.id);
        res.json({usuario}); 
    }catch(error){
        res.status(403).json({msg:"Hubo un error"});
    }
}