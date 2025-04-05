// setupDatabase.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/db.sqlite');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    senha TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS mensagens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    texto TEXT,
    FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
  )`);

  console.log("Banco de dados criado com sucesso!");
});

db.close();
