const express = require('express');
const router = express.Router();
const Estado = require('../models/estadoModel');

// Obtener todos los estados
router.get('/', (req, res) => {
  Estado.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Obtener un estado por ID
router.get('/:id', (req, res) => {
  Estado.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

// Obtener estados por ID de país
router.get('/pais/:idpais', (req, res) => {
  Estado.getByPaisId(req.params.idpais, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Crear un nuevo estado
router.post('/', (req, res) => {
  Estado.create(req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: results.insertId });
  });
});

module.exports = router;
