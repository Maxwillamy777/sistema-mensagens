// database.js
const Database = require('better-sqlite3');
const db = new Database('./data/db.sqlite');

// Cria a tabela se não existir
db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    senha TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS mensagens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    texto TEXT NOT NULL,
    FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
  );
`);

module.exports = db;