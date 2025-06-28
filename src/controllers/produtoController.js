const { produtoModel } = require('../models/produtoModel');
const { Op} = require('sequelize');
const {parseDateBd} = require('../utils/dateUtils');

const produtoController = {
    listarProduto: (req,res) => {
        res.send('Listando produto!');
    },

    cadastrarProduto: (req,res) => {
        res.send('Cadastrando produto!');
    },

    atualizarProduto: (req,res) => {
        res.send('Atualizando produto!');
    },

    deletarProduto: (req,res) => {
        res.send('Deletando produto!');
    }
    
};

module.exports = { produtoController };