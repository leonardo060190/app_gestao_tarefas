//código javascript em app.js

//importando o framework express
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
//método post é usado para inclusão, adiciona uma nova tarefa
//O Comando INSERT INTO inseri novas linhas na tabela criada.
app.post('/tarefas', (req, res) => { 
    const tarefas = req.body;// Recebe os registros pelo corpo da requisição 
    const sql = 'INSERT INTO tarefas SET ?';
    connection.query(sql, tarefas, (error, result) => {
        if (error) throw error;
        res.status(201).json({ id: result.insertId, ...tarefas });//statuscode indica Created e adicionou mais um registro
    });
});

// READ
//método get ele retorna todos os registros de uma tabela.
//SELECT para buscar os registros inseridos na tabela. 
//Podemos recuperar todos os registros de uma tabela usando um asterisco(*) em uma consulta SELECT.
app.get('/tarefas', (req, res) => {
    const sql = 'SELECT * FROM tarefas ';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.json(results);//retorna o resultado
    });
});

//método get ele retorna todos os registros de uma tabela.
//SELECT para buscar os registros inseridos na tabela. 
//O WHERE é usada em casos de consulta para ajudar a especificar os dados que serão consultados e manipulados.
//Aqui ele faz a consulta somente no ('id') informado. 
app.get('/tarefas/:id', (req, res) => {
    const id = req.params.id; // Resebe o id do registro a ser exibido
    const sql = 'SELECT * FROM tarefas WHERE id = ?';
    connection.query(sql, id, (error, results) => {
        if (error) throw error;
        res.json(results[0]);//retorna o resultado
    });
});

// UPDATE
//método put é usado para alteração. id indica o registro a ser alterado
// Update: atualiza os registros presentes nas tabelas SQL. 
// Assim, utilizaremos o comando UPDATE para fazer alterações nos dados presentes nas tabelas.
//O WHERE é usada em casos de consulta para ajudar a especificar os dados que serão consultados e manipulados.
//Aqui ele faz a alteração dos registros, somente no ('id') informado.
app.put('/tarefas/:id', (req, res) => {
    const id = req.params.id;//Resebe o id do registro a ser alterado
    const tarefaAtualizada = req.body;// Recebe os registros pelo corpo da requisição 
    const sql = 'UPDATE tarefas SET ? WHERE id = ?';
    connection.query(sql, [tarefaAtualizada, id], (error) => {
        if (error) throw error;
        res.status(204).end();
    });
});

// DELETE
// Delete: remove ou deleta os registros das tabelas SQL. 
// Aqui vai remover apenas os registros específicos que atendem a uma 
// determinada condição usando O WHERE .
// aqui ele vai deletar somente o registro indicado pelo ('id').
app.delete('/tarefas/:id', (req, res) => {
    const id = req.params.id;//Resebe o id do registro a ser deletado
    const sql = 'DELETE FROM tarefas WHERE id = ?';
    connection.query(sql, id, (error) => {
        if (error) throw error;
        res.status(204).end();
    });
});


// tabela do banco de dados 'PESSOAS'
// CREATE
//método post é usado para inclusão, adiciona uma nova tarefa
//O Comando INSERT INTO inseri novas linhas na tabela especificada.
app.post('/pessoas', (req, res) => {
    const pessoas = req.body;// Recebe os registros pelo corpo da requisição 
    const sql = 'INSERT * INTO pessoas SET ?';
    connection.query(sql, pessoas, (error, result) => {
        if (error) throw error;
        res.status(201).json({ id: result.insertId, ...pessoas });//statuscode indica Created e adicionou mais um registro
    });
});

// READ
//método get ele retorna todos os registros de uma tabela.
//SELECT para buscar os registros inseridos na tabela. 
//Podemos recuperar todos os registros de uma tabela usando um asterisco(*) em uma consulta SELECT.
app.get('/pessoas', (req, res) => {
    const sql = 'SELECT * FROM pessoas ';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.json(results);//retorna o resultado
    });
});

//método get ele retorna todos os registros de uma tabela.
//SELECT para buscar os registros inseridos na tabela. 
//O WHERE é usada em casos de consulta para ajudar a especificar os dados que serão consultados e manipulados.
//Aqui ele faz a consulta somente no ('id') informado. 
app.get('/pessoas/:id', (req, res) => {
    const id = req.params.id;//Resebe o id do registro a ser deletado
    const sql = 'SELECT * FROM pessoas WHERE id = ?';
    connection.query(sql, id, (error, results) => {
        if (error) throw error;
        res.json(results[0]);//retorna o resultado
    });
});

// UPDATE
//método put é usado para alteração. id indica o registro a ser alterado
// Update: atualiza os registros presentes nas tabelas SQL. 
// Assim, utilizaremos o comando UPDATE para fazer alterações nos dados presentes nas tabelas.
//O WHERE é usada em casos de consulta para ajudar a especificar os dados que serão consultados e manipulados.
//Aqui vai fazer a alteraçao dos registros somente no ('id') que foi informado.
app.put('/pessoas/:id', (req, res) => {
    const id = req.params.id;//Resebe o id do registro a ser alterado
    const alteraRegistro = req.body;// Recebe os registros pelo corpo da requisição 
    const sql = 'UPDATE pessoas SET ? WHERE id = ?';
    connection.query(sql, [alteraRegistro, id], (error) => {
        if (error) throw error;
        res.status(204).end();
    });
});

// DELETE
// Delete: remove ou deleta os registros das tabelas SQL. 
//Aqui vai remover apenas os registros específicos que atendem a uma 
// determinada condição usando O WHERE .
// aqui ele vai deletar somente os registros indicados pelo ('id').
app.delete('/pessoas/:id', (req, res) => {
    const id = req.params.id;//Resebe o id do registro a ser deletado
    const sql = 'DELETE FROM pessoas WHERE id = ?';
    connection.query(sql, id, (error) => {
        if (error) throw error;
        res.status(204).end();
    });
});

//método get ele retorna todos os registros de uma tabela.
//SELECT para buscar os registros inseridos na tabela.
//O FROM, que indica a(s) tabela(s) dos quais recuperar dados.
//ORDER BY organiza os resultados de acordo com uma ou mais colunas da tabela,
//podendo definir a ordem do resultados como crescente ou decrescente.
//Aqui o get lista as pessoas pela condição que foi informada no select e organiza pelo nome
app.get('/Lista_pessoas', (req, res) => {
    const sql = 'SELECT pessoas.nome, pessoas.data_nascimento, pessoas.telefone  FROM pessoas order by nome ';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.json(results);//retorna o resultado
    });
});

//método get ele retorna todos os registros de uma tabela.
//SELECT para buscar os registros inseridos na tabela.
//O FROM, que indica a(s) tabela(s) dos quais recuperar dados.
//ORDER BY organiza os resultados de acordo com uma ou mais colunas da tabela,
//podendo definir a ordem do resultados como crescente ou decrescente.
//'AS' é usado para atribuir um novo nome temporariamente a uma coluna de tabela.
//Ele facilita a apresentação dos resultados da consulta e permite que o desenvolvedor rotule os resultados com mais precisão, 
//sem renomear permanentemente as colunas da tabela.
//O INNER JOIN seleciona registros que possuem valores correspondentes em ambas as tabelas.
//busca as tarefas pelo status exibindo e organizando pelo id das pessoas que foram cadastradas,
//mostrando o nome da pessoa que esta na tabela pessoas e tambem as tarefas relacionada a pessoa que esta na tabela tarefas.
app.get('/Lista_tarefas/:status', (req, res) => {
    const status = req.params.status;//Resebe o status do registro a ser exibido
    const sql = `SELECT pessoas.nome AS Responsável, tarefas.titulo, tarefas.descricao, tarefas.data_criacao, tarefas.data_conclusao, tarefas.status  FROM tarefas INNER JOIN pessoas  ON tarefas.id_pessoas = pessoas.id  where status = ? ORDER BY Responsável `;
    connection.query(sql, status, (error, results) => {
        if (error) throw error;
        res.json(results);//retorna o resultado
    });
});

//método get ele retorna todos os registros de uma tabela.
//SELECT para buscar os registros inseridos na tabela.
//O FROM, que indica a(s) tabela(s) dos quais recuperar dados.
//ORDER BY organiza os resultados de acordo com uma ou mais colunas da tabela,
//podendo definir a ordem do resultados como crescente ou decrescente.
//'AS' é usado para atribuir um novo nome temporariamente a uma coluna de tabela.
//Ele facilita a apresentação dos resultados da consulta e permite que o desenvolvedor rotule os resultados com mais precisão, 
//sem renomear permanentemente as colunas da tabela.
//O INNER JOIN seleciona registros que possuem valores correspondentes em ambas as tabelas.
// Busca os registros que estão na tabela pessoas e na tabela tarefas e exibi os resultados juntando as duas tabelas
//que estão referenciadas pelo id da pessoa e o id da chave estrangeira fazendo a comparação entre os dois id.
app.get('/pessoas_tarefas/:id', (req, res) => {
    const id = req.params.id;//Resebe o id do registro a ser exibido
    const sql = `SELECT p.id AS Código, p.nome, p.telefone, t.id AS código_Tarefa, t.titulo, t.descricao, t.data_criacao, t.data_conclusao, t.status FROM pessoas AS p INNER JOIN tarefas AS t ON t.id_pessoas = p.id  where p.id = ? `;
    connection.query(sql, id, (error, results) => {
        if (error) throw error;
        res.json(results);//retorna o resultado
    });
});



// Configurando o servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
