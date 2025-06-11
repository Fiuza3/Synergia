const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

// Rotas para pacientes
router.get('/', pacienteController.getAll);
router.get('/busca/:nome', pacienteController.searchByName);
router.post('/', pacienteController.create);
router.put('/:id', pacienteController.update);

module.exports = router;