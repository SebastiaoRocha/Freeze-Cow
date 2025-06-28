const express = require('express');

const router = express.Router();

const { colaboradorController } = require('../controllers/colaboradorController');

router.get("/", colaboradorController.listarColaborador);

router.post("/", colaboradorController.cadastrarColaborador);

router.put("/", colaboradorController.atualizarColaborador);

router.delete("/", colaboradorController.deletarColaborador);

module.exports = {rotasColaborador: router};

