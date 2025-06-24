// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/cadastro", userController.cadastro); // Rota para cadastrar um novo usuário
router.post("/login", userController.login); // Rota para login de usuário 
router.get("/", userController.getAllUsers); // GET todos os usuários
router.get("/:id", userController.getUserById); // GET usuário por ID
router.delete("/:id", userController.deleteUser); // DELETE usuário

module.exports = router;
