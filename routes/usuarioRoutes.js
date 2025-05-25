const express = require('express');
const router = express.Router();
const Usuarios = require('../models/usuarioModel');

// Obtener todos los usuarios
router.get('/', (req, res) => {
  Usuarios.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Obtener usuario por ID
router.get('/:id', (req, res) => {
  Usuarios.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if(results.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(results[0]);
  });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const { email, password, confirmPassword, nombre, apellido, telefono, cedula_dni, foto } = req.body;

  // Validar que las contraseñas coincidan
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Las contraseñas no coinciden' });
  }

  // Asegurar valores por defecto para los campos NOT NULL
  const data = {
    email,
    password,
    nombre: nombre || '',
    apellido: apellido || '',
    telefono: telefono || '',
    cedula_dni: cedula_dni || '',
    foto: foto || ''
  };

  Usuarios.create(data, (err, results) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Email o cédula ya existe' });
      }
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ id: results.insertId });
  });
});


// Actualizar usuario
router.put('/:id', (req, res) => {
  Usuarios.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuario actualizado correctamente' });
  });
});

// Eliminar usuario
router.delete('/:id', (req, res) => {
  Usuarios.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

module.exports = router;
