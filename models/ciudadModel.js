const db = require('../config/db');

const Ciudad = {
  getAll: (cb) => db.query('SELECT * FROM ciudad', cb),
  getById: (id, cb) => db.query('SELECT * FROM ciudad WHERE idciudad = ?', [id], cb),
  getByEstadoId: (idestado, cb) => db.query('SELECT * FROM ciudad WHERE idestado = ?', [idestado], cb),
  create: (data, cb) => db.query('INSERT INTO ciudad (idestado, nombreciudad) VALUES (?, ?)', [data.idestado, data.nombreciudad], cb),
};

module.exports = Ciudad;
