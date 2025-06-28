
const express = require('express');

const router = express.Router();

const { clienteController } = require('../controllers/clienteController');

router.get("/", clienteController.listarCliente);

router.post("/", clienteController.cadastrarCliente);

router.put("/:ID_Cliente", clienteController.atualizarCliente);

router.delete("/:ID_Cliente", clienteController.deletarCliente);

module.exports = {rotasCliente: router};

