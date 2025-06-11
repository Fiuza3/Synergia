const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');

// Rotas para agendamentos
router.get('/', agendamentoController.getAll);
router.get('/data/:data', agendamentoController.getByDate);
router.post('/', agendamentoController.create);
router.put('/:id', agendamentoController.update);
router.delete('/:id', agendamentoController.delete);

module.exports = router;