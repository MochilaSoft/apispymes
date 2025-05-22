const express = require('express');
const router = express.Router();
const Pymes = require('../models/pymesModel');

// Obtener todas las pymes
router.get('/', (req, res) => {
  Pymes.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Obtener pyme por ID
router.get('/:id', (req, res) => {
  Pymes.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if(results.length === 0) return res.status(404).json({ message: "No encontrado" });
    res.json(results[0]);
  });
});

// Obtener pymes por categoria
router.get('/categoria/:idcategoria', (req, res) => {
  Pymes.getByCategoriaId(req.params.idcategoria, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Obtener pymes por usuario
router.get('/usuario/:idusuario', (req, res) => {
  Pymes.getByUsuarioId(req.params.idusuario, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Crear una nueva pyme
router.post('/', (req, res) => {
  // Aquí podrías validar que imagen venga en req.body.imagen
  Pymes.create(req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: results.insertId });
  });
});

// Actualizar una pyme
router.put('/:id', (req, res) => {
  Pymes.update(req.params.id, req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Actualizado correctamente' });
  });
});

// Eliminar una pyme
router.delete('/:id', (req, res) => {
  Pymes.delete(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Eliminado correctamente' });
  });
});

module.exports = router;
