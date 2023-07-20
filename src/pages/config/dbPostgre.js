const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

// Configuração do pool de conexão com o PostgreSQL
const pool = new Pool({
    user: "dbarcadequestion",
    host: "localhost",
    database: "arcadequestion",
    password: "Laisc0611",
    port: 5432,
});

// Defina as rotas e endpoints do seu backend aqui

// Exemplo de rota de teste
app.get("/api/teste", (req, res) => {
    res.json({ message: "API funcionando corretamente" });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

// Rota para o login
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Consulta SQL para verificar se as credenciais estão corretas
        const query = "SELECT * FROM usuarios WHERE email = $1 AND senha = $2";
        const values = [email, password];
        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            // Credenciais corretas, enviar resposta de sucesso ao frontend
            res.json({ success: true });
        } else {
            // Credenciais incorretas, enviar mensagem de erro ao frontend
            res.json({ success: false, message: "Credenciais inválidas" });
        }
    } catch (error) {
        console.error("Erro ao realizar o login:", error);
        res.status(500).json({ success: false, message: "Erro ao realizar o login" });
    }
});

// Rota para o registro
app.post("/api/register", async (req, res) => {
    const { nome, email, password } = req.body;

    try {
        // Consulta SQL para inserir o novo usuário no banco de dados
        const query = "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)";
        const values = [nome, email, password];
        await pool.query(query, values);

        // Registro bem-sucedido, enviar resposta de sucesso ao frontend
        res.json({ success: true });
    } catch (error) {
        console.error("Erro ao realizar o registro:", error);
        res.status(500).json({ success: false, message: "Erro ao realizar o registro" });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
