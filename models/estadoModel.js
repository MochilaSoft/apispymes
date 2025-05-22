const db = require('../config/db');

const Estado = {
  getAll: (cb) => db.query('SELECT * FROM estado', cb),
  getById: (id, cb) => db.query('SELECT * FROM estado WHERE idestado = ?', [id], cb),
  getByPaisId: (idpais, cb) => db.query('SELECT * FROM estado WHERE idpais = ?', [idpais], cb),
  create: (data, cb) => db.query('INSERT INTO estado (idpais, nombreestado) VALUES (?, ?)', [data.idpais, data.nombreestado], cb),
};

module.exports = Estado;
