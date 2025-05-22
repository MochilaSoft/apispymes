const db = require('../config/db');

const Suscripcion = {
  getAll: (cb) => db.query('SELECT * FROM suscripcion', cb),

  getById: (id, cb) => db.query('SELECT * FROM suscripcion WHERE idsuscripcion = ?', [id], cb),

  create: (data, cb) => {
    const sql = 'INSERT INTO suscripcion (nombre, descripcion, valor) VALUES (?, ?, ?)';
    const params = [data.nombre, data.descripcion || null, data.valor];
    db.query(sql, params, cb);
  },

  update: (id, data, cb) => {
    const sql = 'UPDATE suscripcion SET nombre = ?, descripcion = ?, valor = ? WHERE idsuscripcion = ?';
    const params = [data.nombre, data.descripcion || null, data.valor, id];
    db.query(sql, params, cb);
  },

  delete: (id, cb) => db.query('DELETE FROM suscripcion WHERE idsuscripcion = ?', [id], cb),
};

module.exports = Suscripcion;
