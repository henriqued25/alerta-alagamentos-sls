const express = require("express");
const router = express.Router();
// const complaintController = require('../controllers/complaintController');

router.get("/", (req, res) => res.send("Rota de denuncias funcionando!"));

module.exports = router;
