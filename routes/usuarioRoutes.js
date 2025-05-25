const express = require('express');
const router = express.Router();
const Usuarios = require('../models/usuarioModel');
const jwt = require('jsonwebtoken'); 
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

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Buscar usuario por email
  Usuarios.getByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });
    
    if (results.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const usuario = results[0];

    // Comparar la contraseña ingresada con la almacenada usando bcrypt
    bcrypt.compare(password, usuario.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: 'Error en el servidor' });

      if (!isMatch) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }

      // Crear token JWT (expira en 24 horas)
      const token = jwt.sign({ id: usuario.idusuario, email: usuario.email }, 'clave_secreta', { expiresIn: '24h' });

      res.json({ message: 'Login exitoso', token });
    });
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

router.put('/completar/:id', (req, res) => {
  const { nombre, apellido, email, telefono, cedula_dni } = req.body;
  
  const data = {
    nombre: nombre || '',
    apellido: apellido || '',
    email: email || '',
    telefono: telefono || '',
    cedula_dni: cedula_dni || '',
  };

  Usuarios.update(req.params.id, data, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuario actualizado correctamente' });
  });
});

router.put('/:id/foto', (req, res) => {
  const { foto } = req.body;

  if (!foto) {
    return res.status(400).json({ error: 'La foto es obligatoria' });
  }

  Usuarios.updatePhoto(req.params.id, foto, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Foto de usuario actualizada correctamente' });
  });
});



module.exports = router;
