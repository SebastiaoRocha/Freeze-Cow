const express = require('express');

const router = express.Router();

const { pedidoController } = require('../controllers/pedidoController');

router.get("/", pedidoController.listarPedido);

router.post("/", pedidoController.cadastrarPedido);

router.put("/:ID_Cliente", pedidoController.atualizarPedido);

router.delete("/:ID_Cliente", pedidoController.deletarPedido);

module.exports = {rotasPedido: router};

