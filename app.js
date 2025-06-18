const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Bem-vindo à sua primeira API Node.js com Express!");
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
