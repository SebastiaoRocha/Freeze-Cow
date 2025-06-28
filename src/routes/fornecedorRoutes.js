const express = require('express');

const router = express.Router();

const { fornecedorController } = require('../controllers/fornecedorController');

router.get("/", fornecedorController.listarFornecedor);

router.post("/", fornecedorController.cadastrarFornecedor);

router.put("/", fornecedorController.atualizarFornecedor);

router.delete("/", fornecedorController.deletarFornecedor);

module.exports = {rotasFornecedor: router};

