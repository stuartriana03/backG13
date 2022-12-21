const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");
const categoriaController = require("../controllers/categoriaController.js");

router.get("/home", categoriaController.leerCategoriaHome);

router.get("/" ,  authMiddleware, categoriaController.leerCategoria );

router.get("/:id" ,  authMiddleware, categoriaController.leerCategoriaId );

router.post("/" ,  authMiddleware, categoriaController.crearCategoria );

router.put("/:id" ,  authMiddleware, categoriaController.actualizarCategoria );

router.delete("/:id", authMiddleware, categoriaController.borrarCategoria );

module.exports = router;