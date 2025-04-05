// sistema-mensagens-api/setupDatabase.js
const db = require('./database');

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

console.log('Tabelas garantidas no banco de dados');
