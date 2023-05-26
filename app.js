//código javascript em app.js
const express = require('express');
const app = express();
const mysql = require('mysql2');

//faz a conversão de JSON para javascript
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurando o express para aceitar JSON
app.use(express.json());
// Conexão com o banco de dados
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gestao_tarefas',
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Conectado!');
});

// tabela do banco de dados 'TAREFAS'
// CREATE
app.post('/tarefas', (req, res) => {
    const tarefas = req.body;
    const sql = 'INSERT INTO tarefas SET ?';
    connection.query(sql, tarefas, (error, result) => {
        if (error) throw error;
        res.status(201).json({ id: result.insertId, ...tarefas });
    });
});

// READ
app.get('/tarefas', (req, res) => {
    const sql = 'SELECT * FROM tarefas ';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/tarefas/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM tarefas WHERE id = ?';
    connection.query(sql, id, (error, results) => {
        if (error) throw error;
        res.json(results[0]);
    });
});

// UPDATE
app.put('/tarefas/:id', (req, res) => {
    const id = req.params.id;
    const newtask = req.body;
    const sql = 'UPDATE tarefas SET ? WHERE id = ?';
    connection.query(sql, [newtask, id], (error) => {
        if (error) throw error;
        res.status(204).end();
    });
});

// DELETE
app.delete('/tarefas/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM tarefas WHERE id = ?';
    connection.query(sql, id, (error) => {
        if (error) throw error;
        res.status(204).end();
    });
});


// tabela do banco de dados 'PESSOAS'
// CREATE
app.post('/pessoas', (req, res) => {
    const pessoas = req.body;
    const sql = 'INSERT INTO pessoas SET ?';
    connection.query(sql, pessoas, (error, result) => {
        if (error) throw error;
        res.status(201).json({ id: result.insertId, ...pessoas });
    });
});

// READ
app.get('/pessoas', (req, res) => {
    const sql = 'SELECT * FROM pessoas ';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/pessoas/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM pessoas WHERE id = ?';
    connection.query(sql, id, (error, results) => {
        if (error) throw error;
        res.json(results[0]);
    });
});

// UPDATE
app.put('/pessoas/:id', (req, res) => {
    const id = req.params.id;
    const nova_pessoa = req.body;
    const sql = 'UPDATE pessoas SET ? WHERE id = ?';
    connection.query(sql, [nova_pessoa, id], (error) => {
        if (error) throw error;
        res.status(204).end();
    });
});

// DELETE
app.delete('/pessoas/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM pessoas WHERE id = ?';
    connection.query(sql, id, (error) => {
        if (error) throw error;
        res.status(204).end();
    });
});

//lista as pessoas cadastradas e organiza pelo nome
app.get('/Lista_pessoas', (req, res) => {
    const sql = 'SELECT pessoas.nome, pessoas.data_nascimento, pessoas.telefone  FROM pessoas order by nome ';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

//busca as tarefas pelo status e exibe en ordem pelo id das pessoas que foram cadastradas
app.get('/Lista_tarefas/:status', (req, res) => {
    const status = req.params.status;
    const sql = `SELECT pessoas.nome AS Responsável, tarefas.titulo, tarefas.descricao, tarefas.data_criacao, tarefas.data_conclusao, tarefas.status  FROM tarefas INNER JOIN pessoas  ON tarefas.id_pessoas = pessoas.id where status = ? ORDER BY Responsável `;
    connection.query(sql, status, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// get para exibir todas as tarefas de uma pessoa especifica
app.get('/pessoas_tarefas/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT p.id AS Código, p.nome, p.telefone, t.id AS código_Tarefa, t.titulo, t.descricao, t.status, t.data_criacao, t.data_conclusao FROM pessoas AS p INNER JOIN tarefas AS t ON t.id_pessoas = p.id  where p.id = ? `;
    connection.query(sql, id, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});



// Configurando o servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
