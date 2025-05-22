const db = require('../config/db');

const Usuarios = {
  getAll: (cb) => db.query('SELECT * FROM usuarios', cb),

  getById: (id, cb) => db.query('SELECT * FROM usuarios WHERE idusuario = ?', [id], cb),

  getByEmail: (email, cb) => db.query('SELECT * FROM usuarios WHERE email = ?', [email], cb),

  create: (data, cb) => {
    const sql = `INSERT INTO usuarios 
      (nombre, apellido, email, telefono, password, cedula_dni, foto)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      data.nombre,
      data.apellido,
      data.email,
      data.telefono || null,
      data.password,
      data.cedula_dni || null,
      data.foto || null
    ];
    db.query(sql, params, cb);
  },

  update: (id, data, cb) => {
    const sql = `UPDATE usuarios SET 
      nombre = ?, apellido = ?, email = ?, telefono = ?, password = ?, cedula_dni = ?, foto = ?
      WHERE idusuario = ?`;
    const params = [
      data.nombre,
      data.apellido,
      data.email,
      data.telefono || null,
      data.password,
      data.cedula_dni || null,
      data.foto || null,
      id
    ];
    db.query(sql, params, cb);
  },

  delete: (id, cb) => db.query('DELETE FROM usuarios WHERE idusuario = ?', [id], cb),
};

module.exports = Usuarios;
