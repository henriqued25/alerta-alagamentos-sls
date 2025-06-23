const { Pool } = require("pg");
const config = require("./index"); // Importa as configurações do config/index.js

// Configuração da Pool
const pool = new Pool({
    connectionString: config.databaseUrl,

    // Configura o uso de SSL/TLS para a conexão com o PostgreSQL.
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// Função para testar a conexão
async function connectDB() {
    try {
        await pool.query("SELECT NOW()"); // Testa a conexão com uma query simples
        console.log(
            "Conexão com o banco de dados PostgreSQL estabelecida com sucesso!"
        );
    } catch (error) {
        console.error(
            "Não foi possível conectar ao banco de dados PostgreSQL:",
            error
        );
        process.exit(1); // Encerra o processo se a conexão falhar
    }
}

// Exporta a pool e a função de conexão
module.exports = {
    pool,
    connectDB,
};
