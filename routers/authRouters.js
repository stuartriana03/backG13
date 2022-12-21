const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.post("/", 
    authController.autenticarUsuario
);
router.get("/", authMiddleware, authController.usuarioAutenticado);


module.exports = router;