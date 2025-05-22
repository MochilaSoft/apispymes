const db = require('../config/db');

const UsuarioSuscripcion = {
  getAll: (cb) => db.query('SELECT * FROM usuario_suscripcion', cb),

  getById: (id, cb) => db.query('SELECT * FROM usuario_suscripcion WHERE idsuscripcionusuario = ?', [id], cb),

  getByUsuarioId: (idusuario, cb) => db.query('SELECT * FROM usuario_suscripcion WHERE idusuario = ?', [idusuario], cb),

  getBySuscripcionId: (idsuscripcion, cb) => db.query('SELECT * FROM usuario_suscripcion WHERE idsuscripcion = ?', [idsuscripcion], cb),

  create: (data, cb) => {
    const sql = 'INSERT INTO usuario_suscripcion (idusuario, idsuscripcion) VALUES (?, ?)';
    const params = [data.idusuario, data.idsuscripcion];
    db.query(sql, params, cb);
  },

  delete: (id, cb) => db.query('DELETE FROM usuario_suscripcion WHERE idsuscripcionusuario = ?', [id], cb),
};

module.exports = UsuarioSuscripcion;
