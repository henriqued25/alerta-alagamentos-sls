const express = require("express");
const router = express.Router();
// const userController = require('../controllers/userController');

// Por enquanto, apenas para evitar o erro:
router.get("/", (req, res) => res.send("Rota de usuarios funcionando!"));

module.exports = router;
