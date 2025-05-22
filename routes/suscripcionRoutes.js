const express = require('express');
const router = express.Router();
const Suscripcion = require('../models/suscripcionModel');

// Obtener todas las suscripciones
router.get('/', (req, res) => {
  Suscripcion.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Obtener suscripción por ID
router.get('/:id', (req, res) => {
  Suscripcion.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if(results.length === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json(results[0]);
  });
});

// Crear suscripción
router.post('/', (req, res) => {
  Suscripcion.create(req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: results.insertId });
  });
});

// Actualizar suscripción
router.put('/:id', (req, res) => {
  Suscripcion.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Suscripción actualizada correctamente' });
  });
});

// Eliminar suscripción
router.delete('/:id', (req, res) => {
  Suscripcion.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Suscripción eliminada correctamente' });
  });
});

module.exports = router;
