const express = require("express");
const app = express();
const config = require("./src/config"); // Importa as configurações gerais
const { connectDB } = require("./src/config/dbConfig"); // Importa a pool e a função de conexão

// Importa as rotas
const userRoutes = require("./src/routes/userRoutes");
const complaintRoutes = require("./src/routes/complaintRoutes");

// Conecta ao banco de dados quando a aplicação iniciar
async function startServer() {
    await connectDB(); // Garante que a conexão com o DB seja estabelecida primeiro

    // Middleware para parsear JSON no corpo das requisições
    app.use(express.json());

    // Rotas da API
    app.use("/api/users", userRoutes);
    app.use("/api/complaints", complaintRoutes);

    // Inicia o servidor usando a porta das configurações
    app.listen(config.port, () => {
        console.log(`Servidor rodando em http://localhost:${config.port}`);
        console.log(`Ambiente: ${config.environment}`);
    });
}

startServer(); // Chama a função para iniciar tudo
