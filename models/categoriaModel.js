const db = require('../config/db');

const Categoria = {
  getAll: (cb) => db.query('SELECT * FROM categoria', cb),
  getById: (id, cb) => db.query('SELECT * FROM categoria WHERE idcategoria = ?', [id], cb),
  getByCiudadId: (idciudad, cb) => db.query('SELECT * FROM categoria WHERE idciudad = ?', [idciudad], cb),
  create: (data, cb) => db.query('INSERT INTO categoria (idciudad, nombrecategoria) VALUES (?, ?)', [data.idciudad, data.nombrecategoria], cb),
};

module.exports = Categoria;
