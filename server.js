const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

const corsOptions = {
    origin: 'http://127.0.0.1:8080',
};

app.use(cors(corsOptions)); // Habilita o CORS para todas as rotas

// Configuração do pool de conexão com o banco de dados
const pool = new Pool({
    user: 'gabi',
    host: 'db', // Usando o nome do serviço do contêiner do banco de dados
    database: 'limpeza',
    password: 'gabi',
    port: 5432,
});

// Middleware para analisar o corpo das requisições
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Adiciona suporte para JSON

// Rota para lidar com o envio do formulário de contato
app.post('/submit-form', (req, res) => {
    // Extrai os dados do corpo da requisição
    const { nome, email, telefone } = req.body;

    // Verifica se os dados foram recebidos corretamente
    if (!nome || !email || !telefone) {
        return res.status(400).send('Por favor, preencha todos os campos do formulário.');
    }

    // Query SQL para inserir os dados no banco de dados
    const query = 'INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3)';

    // Valores a serem inseridos
    const values = [nome, email, telefone];

    // Executar a query SQL
    pool.query(query, values, (error, result) => {
        if (error) {
            console.error('Erro ao inserir dados no banco de dados:', error);
            res.status(500).send('Erro ao enviar o formulário. Por favor, tente novamente mais tarde.');
        } else {
            console.log('Dados inseridos com sucesso no banco de dados.');
            console.log('Dados recebidos:', { nome, email, telefone });
            res.send('Obrigado por enviar o formulário!');
        }
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});
