const express = require('express');

const router = express.Router();

const { unidadeController } = require('../controllers/unidadeController');

router.get("/", unidadeController.listarUnidade);

router.post("/", unidadeController.cadastrarUnidade);

router.put("/", unidadeController.atualizarUnidade);

router.delete("/", unidadeController.deletarUnidade);

module.exports = {rotasUnidade: router};