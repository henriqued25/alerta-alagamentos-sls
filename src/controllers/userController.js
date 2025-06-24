const { pool } = require("../config/dbConfig");
const bcrypt = require("bcryptjs"); 
const jwt = require('jsonwebtoken'); 
const config = require('../config');

const userController = {
    // Método de Cadastro de Usuário
    cadastro: async (req, res) => {
        const { nome, email, senha } = req.body;

        // 1. Validação básica de input
        if (!nome || !email || !senha) {
            return res.status(400).json({
                message:
                    "Nome, email e senha são obrigatórios para o cadastro.",
            });
        }

        try {
            // 2. Verifica se o email já existe no banco de dados
            const existingUser = await pool.query(
                "SELECT id FROM usuarios WHERE email = $1",
                [email]
            );
            if (existingUser.rows.length > 0) {
                return res
                    .status(409)
                    .json({ message: "Email já cadastrado." });
            }

            // 3. Gera o hash da senha antes de salvar no DB
            const hashedPassword = await bcrypt.hash(senha, 10);

            // 4. Insere o novo usuário no banco de dados com a senha hasheada
            const result = await pool.query(
                "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email",
                [nome, email, hashedPassword]
            );

            // 5. Retorna a resposta de sucesso
            res.status(201).json({
                message: "Usuário cadastrado com sucesso!",
                usuario: result.rows[0],
            });

        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            res.status(500).json({
                message: "Erro interno do servidor ao cadastrar usuário.",
            });
        }
    },

    // Método de Login de Usuário
    login: async (req, res) => {
        const { email, senha } = req.body;

        // 1. Validação básica de input
        if (!email || !senha) {
            return res.status(400).json({
                message: "Email e senha são obrigatórios para o login.",
            });
        }

        try {
            // 2. Busca o usuário pelo email no banco de dados
            const result = await pool.query(
                "SELECT id, nome, email, senha FROM usuarios WHERE email = $1",
                [email]
            );
            const usuario = result.rows[0];

            // 3. Verifica se o usuário existe
            if (!usuario) {
                return res.status(401).json({
                    message: "Credenciais inválidas. Usuário não encontrado.",
                }); // Usuário não encontrado
            }

            // 4. Compara a senha fornecida com o hash armazenado no DB
            const isMatch = await bcrypt.compare(senha, usuario.senha);
            if (!isMatch) {
                return res.status(401).json({
                    message: "Credenciais inválidas. Senha incorreta.",
                }); // Senha incorreta
            }

            const payload = {
                userId: usuario.id,
                userEmail: usuario.email,
            };

            // Gera o token
            const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });

            // 5. Retornar a resposta de sucesso com o token
            const { senha: _, ...usuarioSemSenha } = usuario; // Usa destructuring para remover a senha do objeto de resposta
            res.status(200).json({
                message: "Login realizado com sucesso!",
                usuario: usuarioSemSenha,
                token: token 
            });
            
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            res.status(500).json({
                message: "Erro interno do servidor ao fazer login.",
            });
        }
    },

    // GET /api/users
    getAllUsers: async (req, res) => {
        try {
            const result = await pool.query(
                "SELECT id, nome, email FROM usuarios"
            );
            res.json(result.rows);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            res.status(500).json({
                message: "Erro interno do servidor ao buscar usuários.",
            });
        }
    },

    // GET /api/users/:id
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await pool.query(
                "SELECT id, nome, email FROM usuarios WHERE id = $1",
                [id]
            );
            if (result.rows.length > 0) {
                res.json(result.rows[0]);
            } else {
                res.status(404).json({ message: "Usuário não encontrado" });
            }
        } catch (error) {
            console.error("Erro ao buscar usuário por ID:", error);
            res.status(500).json({
                message: "Erro interno do servidor ao buscar usuário.",
            });
        }
    },

    // DELETE /api/users/:id
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await pool.query(
                "DELETE FROM usuarios WHERE id = $1 RETURNING id",
                [id]
            );

            if (result.rows.length > 0) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: "Usuário não encontrado" });
            }
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            res.status(500).json({
                message: "Erro interno do servidor ao deletar usuário.",
            });
        }
    },
};

module.exports = userController;
