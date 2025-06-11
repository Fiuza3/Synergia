const express = require('express');
const router = express.Router();
const localController = require('../controllers/localController');

// Rotas para locais
router.get('/', localController.getAll);
router.post('/', localController.create);
router.put('/:id', localController.update);
router.delete('/:id', localController.delete);

module.exports = router;