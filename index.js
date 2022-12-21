const express = require ("express");
const conectarDB = require ("./config/db");
const usuarioRouters = require ("./routers/usuarioRouters.js");
const authRouters = require ("./routers/authRouters.js");
const categoriaRouters = require ("./routers/categoriaRouters.js");
const productoRouters = require ("./routers/productoRouters.js");
const cors = require ("cors")
//conectar a la base de datos
conectarDB();

const app = express ();
//habilitar los cors
app.use(cors());
//habilitar express.json
app.use(express.json({extended:true}));
app.use("/api/usuarios", usuarioRouters);
app.use("/api/auth", authRouters);
app.use("/api/categoria", categoriaRouters);
app.use("/api/producto", productoRouters);

app.listen(4000,()=> {
    console.log("Servidor corriendo en el puerto 4000");
});