const express = require('express');
const router = express.Router();
const UsuarioSuscripcion = require('../models/usuarioSuscripcionModel');

// Obtener todas las suscripciones de usuarios
router.get('/', (req, res) => {
  UsuarioSuscripcion.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Obtener suscripción usuario por ID
router.get('/:id', (req, res) => {
  UsuarioSuscripcion.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if(results.length === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json(results[0]);
  });
});

// Obtener suscripciones por usuario
router.get('/usuario/:idusuario', (req, res) => {
  UsuarioSuscripcion.getByUsuarioId(req.params.idusuario, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Obtener suscripciones por suscripción
router.get('/suscripcion/:idsuscripcion', (req, res) => {
  UsuarioSuscripcion.getBySuscripcionId(req.params.idsuscripcion, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Crear suscripción para usuario
router.post('/', (req, res) => {
  UsuarioSuscripcion.create(req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: results.insertId });
  });
});

// Eliminar suscripción de usuario
router.delete('/:id', (req, res) => {
  UsuarioSuscripcion.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Suscripción de usuario eliminada correctamente' });
  });
});

module.exports = router;
