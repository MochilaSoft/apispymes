const express = require('express');
const router = express.Router();
const Ciudad = require('../models/ciudadModel');

// Obtener todas las ciudades
router.get('/', (req, res) => {
  Ciudad.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Obtener una ciudad por ID
router.get('/:id', (req, res) => {
  Ciudad.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

// Obtener ciudades por ID de estado
router.get('/estado/:idestado', (req, res) => {
  Ciudad.getByEstadoId(req.params.idestado, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Crear una nueva ciudad
router.post('/', (req, res) => {
  Ciudad.create(req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: results.insertId });
  });
});

module.exports = router;
