const express = require('express');

const router = express.Router();

const { produtoController } = require('../controllers/produtoController');

router.get("/", produtoController.listarProduto);

router.post("/", produtoController.cadastrarProduto);

router.put("/:ID_Cliente", produtoController.atualizarProduto);

router.delete("/:ID_Cliente", produtoController.deletarProduto);

module.exports = {rotasProduto: router};