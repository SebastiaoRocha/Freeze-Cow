const express = require('express');

const router = express.Router();

const { unidadeController } = require('../controllers/unidadeController');

router.get("/", unidadeController.listarUnidade);

router.post("/", unidadeController.cadastrarUnidade);

router.put("/:ID_Cliente", unidadeController.atualizarUnidade);

router.delete("/:ID_Cliente", unidadeController.deletarUnidade);

module.exports = {rotasUnidade: router};