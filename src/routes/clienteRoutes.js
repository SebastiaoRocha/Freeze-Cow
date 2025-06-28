const express = require('express');

const router = express.Router();

const { clienteController } = require('../controllers/clienteController');

router.get("/", clienteController.listarCliente);

router.post("/", clienteController.cadastrarCliente);

router.put("/", clienteController.atualizarCliente);

router.delete("/", clienteController.deletarCliente);

module.exports = {rotasCliente: router};

