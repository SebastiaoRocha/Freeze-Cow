const express = require('express');

const router = express.Router();

const { unidadeController } = require('../controllers/unidadeController');

router.get("/", unidadeController.listarUnidade);

router.post("/", unidadeController.cadastrarUnidade);

router.put("/:ID_Unidade", unidadeController.atualizarUnidade);

router.delete("/:ID_Unidade", unidadeController.deletarUnidade);

module.exports = {rotasUnidade: router};