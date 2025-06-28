const express = require('express');

const router = express.Router();

const { produtoController } = require('../controllers/produtoController');

router.get("/", produtoController.listarProduto);

router.post("/", produtoController.cadastrarProduto);

router.put("/", produtoController.atualizarProduto);

router.delete("/", produtoController.deletarProduto);

module.exports = {rotasProduto: router};