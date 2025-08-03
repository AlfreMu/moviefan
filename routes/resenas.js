const express = require('express');
const router = express.Router();
const {
  listarResenas,
  obtenerResenaPorId,
  crearResena,
  editarResena,
  eliminarResena
} = require('../controllers/resenasController');

// GET /resenas
router.get('/', listarResenas);
router.get('/:id', obtenerResenaPorId);
router.post('/', crearResena);
router.put('/:id', editarResena);
router.delete('/:id', eliminarResena);

module.exports = router;
