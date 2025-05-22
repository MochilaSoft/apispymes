const db = require('../config/db');

const Pais = {
  getAll: (cb) => db.query('SELECT * FROM pais', cb),
  getById: (id, cb) => db.query('SELECT * FROM pais WHERE idpais = ?', [id], cb),
  create: (data, cb) => db.query('INSERT INTO pais (nombrepais) VALUES (?)', [data.nombrepais], cb),
};

module.exports = Pais;
