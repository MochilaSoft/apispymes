const express = require('express');
const router = express.Router();
const Categoria = require('../models/categoriaModel');

// Obtener todas las categorías
router.get('/', (req, res) => {
  Categoria.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Obtener una categoría por ID
router.get('/:id', (req, res) => {
  Categoria.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

// Obtener categorías por ID de ciudad
router.get('/ciudad/:idciudad', (req, res) => {
  Categoria.getByCiudadId(req.params.idciudad, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Crear una nueva categoría
router.post('/', (req, res) => {
  Categoria.create(req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: results.insertId });
  });
});

module.exports = router;
