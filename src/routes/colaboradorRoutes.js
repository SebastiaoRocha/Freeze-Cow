const express = require('express');

const router = express.Router();

const { colaboradorController } = require('../controllers/colaboradorController');

router.get("/", colaboradorController.listarColaborador);

router.post("/", colaboradorController.cadastrarColaborador);

router.put("/:ID_Colaborador", colaboradorController.atualizarColaborador);

router.delete("/:ID_Colaborador", colaboradorController.deletarColaborador);

module.exports = {rotasColaborador: router};

