const { pool } = require("../config/dbConfig");


const complaintController = {

    // Método de Criação de Denúncia
    criarRegistro: async (req, res) => {
        const {
            data_alagamento,
            bairro,
            rua_avenida,
            local_ainda_alagado,
            impactos,
            observacoes
        } = req.body;

        // 1. Verifica se o token do usuário está presente e válido
        const usuario_id = req.user?.userId;
        if (!usuario_id) {
            return res.status(401).json({ message: "Usuário não autenticado." });
        }

        // 2. Validação básica
        if (!data_alagamento || !bairro || !rua_avenida) {
            return res.status(400).json({
                message: "Campos obrigatórios: data_alagamento, bairro e rua_avenida.",
            });
        }

        // 3. Converte para array se for string (para evitar erro no PostgreSQL)
        const arrImpactos = typeof impactos === "string" ? [impactos] : impactos;
        const arrObservacoes = typeof observacoes === "string" ? [observacoes] : observacoes;

        try {
            // 4. Inserção no banco
            const result = await pool.query(
                `INSERT INTO denuncias (
                    usuario_id, data_alagamento, bairro, rua_avenida,
                    local_ainda_alagado, impactos, observacoes
                ) VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *`,
                [
                    usuario_id,
                    data_alagamento,
                    bairro,
                    rua_avenida,
                    local_ainda_alagado,
                    arrImpactos,
                    arrObservacoes
                ]
            );

            res.status(201).json({
                message: "Denúncia registrada com sucesso!",
                registro: result.rows[0],
            });

        } catch (error) {
            console.error("Erro ao registrar denúncia:", error);
            res.status(500).json({
                message: "Erro interno do servidor ao registrar denúncia.",
            });
        }
    },

    // Método para Listar Todas as Denúncias
    getAllRegistros: async (req, res) => {
        try {
            const result = await pool.query(
                `SELECT d.*, u.nome AS nome_usuario
                 FROM denuncias d
                 JOIN usuarios u ON d.usuario_id = u.id
                 ORDER BY d.data_alagamento DESC`
            );
            res.status(200).json(result.rows);
        } catch (error) {
            console.error("Erro ao buscar denúncias:", error);
            res.status(500).json({
                message: "Erro interno do servidor ao buscar denúncias.",
            });
        }
    },

    // Método para Buscar Denúncia por ID
    getRegistroById: async (req, res) => {
        const { id } = req.params;

        try {
            const result = await pool.query(
                `SELECT d.*, u.nome AS nome_usuario
                 FROM denuncias d
                 JOIN usuarios u ON d.usuario_id = u.id
                 WHERE d.id = $1`,
                [id]
            );

            if (result.rows.length > 0) {
                res.status(200).json(result.rows[0]);
            } else {
                res.status(404).json({ message: "Denúncia não encontrada." });
            }
        } catch (error) {
            console.error("Erro ao buscar denúncia por ID:", error);
            res.status(500).json({
                message: "Erro interno do servidor ao buscar denúncia.",
            });
        }
    },

    // Método para Deletar uma Denúncia
    deleteRegistro: async (req, res) => {
        const { id } = req.params;

        try {
            const result = await pool.query(
                "DELETE FROM denuncias WHERE id = $1 RETURNING id",
                [id]
            );

            if (result.rows.length > 0) {
                res.status(204).send(); // Nenhum conteúdo, mas sucesso
            } else {
                res.status(404).json({ message: "Denúncia não encontrada." });
            }
        } catch (error) {
            console.error("Erro ao deletar denúncia:", error);
            res.status(500).json({
                message: "Erro interno do servidor ao deletar denúncia.",
            });
        }
    }

};

module.exports = complaintController;
