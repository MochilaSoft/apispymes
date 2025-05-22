const express = require('express');
const router = express.Router();
const Pais = require('../models/paisModel');

// Obtener todos los países
router.get('/', (req, res) => {
  Pais.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Obtener un país por ID
router.get('/:id', (req, res) => {
  Pais.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

// Crear un nuevo país
router.post('/', (req, res) => {
  Pais.create(req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: results.insertId });
  });
});

module.exports = router;
