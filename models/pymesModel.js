const db = require('../config/db');

const Pymes = {
  getAll: (cb) => db.query('SELECT * FROM pymes', cb),

  getById: (id, cb) => db.query('SELECT * FROM pymes WHERE idpyme = ?', [id], cb),

  getByCategoriaId: (idcategoria, cb) => 
    db.query('SELECT * FROM pymes WHERE idcategoria = ?', [idcategoria], cb),

  getByUsuarioId: (idusuario, cb) => 
    db.query('SELECT * FROM pymes WHERE idusuario = ?', [idusuario], cb),

  create: (data, cb) => {
    const sql = `INSERT INTO pymes 
      (idcategoria, idusuario, nombrepymes, whatsapp, urlfacebook, urlinstagram, coordenadas, estatus, calificacion, imagen)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      data.idcategoria,
      data.idusuario,
      data.nombrepymes,
      data.whatsapp || null,
      data.urlfacebook || null,
      data.urlinstagram || null,
      data.coordenadas || null,
      data.estatus || null,
      data.calificacion || null,
      data.imagen // asumo es obligatorio, pasar cadena vacía si no hay imagen
    ];
    db.query(sql, params, cb);
  },

  update: (id, data, cb) => {
    const sql = `UPDATE pymes SET 
      idcategoria = ?, idusuario = ?, nombrepymes = ?, whatsapp = ?, urlfacebook = ?, urlinstagram = ?, coordenadas = ?, estatus = ?, calificacion = ?, imagen = ?
      WHERE idpyme = ?`;
    const params = [
      data.idcategoria,
      data.idusuario,
      data.nombrepymes,
      data.whatsapp || null,
      data.urlfacebook || null,
      data.urlinstagram || null,
      data.coordenadas || null,
      data.estatus || null,
      data.calificacion || null,
      data.imagen,
      id
    ];
    db.query(sql, params, cb);
  },

  delete: (id, cb) => db.query('DELETE FROM pymes WHERE idpyme = ?', [id], cb),
};

module.exports = Pymes;
