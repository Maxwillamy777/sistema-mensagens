const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const path = require('path');
app.use(express.static(path.join(__dirname, '../public')));

/* ROTA: Registrar novo usuário */

app.post('/registrar', (req, res) => {
  try {
    const senha = Math.random().toString(36).slice(-8); // senha aleatória
    db.run(`INSERT INTO usuarios (senha) VALUES (?)`, [senha], function (err) {
      if (err) {
        console.error('Erro ao registrar:', err); // LOG do erro real
        return res.status(500).send({ error: 'Erro ao registrar' });
      }
      return res.send({ id: this.lastID, senha });
    });
  } catch (err) {
    console.error('Erro interno:', err);
    return res.status(500).send({ error: 'Erro interno no servidor' });
  }
});
/* ROTA: Login */
app.post('/login', (req, res) => {
  try {
    const { id, senha } = req.body;
    db.get(`SELECT * FROM usuarios WHERE id = ? AND senha = ?`, [id, senha], (err, row) => {
      if (err) return res.status(500).send({ error: 'Erro no login' });
      if (!row) return res.status(401).send({ error: 'ID ou senha inválidos' });
      return res.send({ sucesso: true });
    });
  } catch (err) {
    console.error('Erro interno:', err);
    return res.status(500).send({ error: 'Erro interno no servidor' });
  }
});

/* ROTA: Enviar mensagem */
app.post('/mensagem', (req, res) => {
  try {
    const { id, senha, texto } = req.body;
    db.get(`SELECT * FROM usuarios WHERE id = ? AND senha = ?`, [id, senha], (err, row) => {
      if (!row) return res.status(401).send({ error: 'Não autorizado' });

      db.run(`INSERT INTO mensagens (usuario_id, texto) VALUES (?, ?)`, [id, texto], (err) => {
        if (err) return res.status(500).send({ error: 'Erro ao salvar mensagem' });
        return res.send({ sucesso: true });
      });
    });
  } catch (err) {
    console.error('Erro interno:', err);
    return res.status(500).send({ error: 'Erro interno no servidor' });
  }
});

/* ROTA: Listar mensagens de um usuário */
app.get('/mensagens/:id', (req, res) => {
  try {
    const id = req.params.id;
    db.all(`SELECT texto FROM mensagens WHERE usuario_id = ?`, [id], (err, rows) => {
      if (err) return res.status(500).send({ error: 'Erro ao buscar mensagens' });
      return res.send(rows);
    });
  } catch (err) {
    console.error('Erro interno:', err);
    return res.status(500).send({ error: 'Erro interno no servidor' });
  }
});

// PORTA para rodar localmente ou no Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});





