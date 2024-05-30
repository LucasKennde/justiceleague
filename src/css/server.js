const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'seu_usuario',
    password: 'sua_senha',
    database: 'projetogov' // Nome do seu banco de dados
});

// Conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem sucedida ao banco de dados');
});

// Middleware para o Express para processar JSON
app.use(express.json());

// Rota para lidar com a requisição POST do formulário
app.post('/salvar-usuario', (req, res) => {
    const { nome, email } = req.body;

    // Inserir os dados no banco de dados
    const sql = `INSERT INTO cadUser (nome, email) VALUES (?, ?)`;
    connection.query(sql, [nome, email], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados no banco de dados:', err);
            res.status(500).send('Erro interno do servidor');
            return;
        }
        console.log('Dados inseridos com sucesso:', result);
        res.send('Usuário cadastrado com sucesso');
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
