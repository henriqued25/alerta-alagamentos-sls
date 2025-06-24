const express = require("express");
const router = express.Router();
const complaintController = require('../controllers/complaintController');

const verificarToken = require("../middlewares/authMiddleware");


// POST: Cadastrar nova denúncia (usuário precisa estar autenticado)
router.post("/", verificarToken, complaintController.criarRegistro);

// GET: Listar todas as denúncias
router.get("/", complaintController.getAllRegistros);

// GET: Buscar denúncia por ID
router.get("/:id", complaintController.getRegistroById);

// DELETE: Deletar denúncia por ID
router.delete("/:id", complaintController.deleteRegistro);

module.exports = router;
