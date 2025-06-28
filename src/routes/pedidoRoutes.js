const express = require('express');

const router = express.Router();

const { pedidoController } = require('../controllers/pedidoController');

router.get("/", pedidoController.listarPedido);

router.post("/", pedidoController.cadastrarPedido);

router.put("/", pedidoController.atualizarPedido);

router.delete("/", pedidoController.deletarPedido);

module.exports = {rotasPedido: router};

