const express = require('express');

const router = express.Router();

const { fornecedorController } = require('../controllers/fornecedorController');

router.get("/", fornecedorController.listarFornecedor);

router.post("/", fornecedorController.cadastrarFornecedor);

router.put("/:ID_Fornecedor", fornecedorController.atualizarFornecedor);

router.delete("/:ID_Fornecedor", fornecedorController.deletarFornecedor);

module.exports = {rotasFornecedor: router};

