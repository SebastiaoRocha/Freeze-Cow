const { fornecedorModel } = require('../models/fornecedorModel');
const { Op} = require('sequelize');
const {parseDateBd} = require('../utils/dateUtils');

const fornecedorController = {
    listarFornecedor: (req,res) => {
        res.send('Listando fornecedores!');
    },

    cadastrarFornecedor: (req,res) => {
        res.send('Cadastrando fornecedor!');
    },

    atualizarFornecedor: (req,res) => {
        res.send('Atualizando fornecedor!');
    },

    deletarFornecedor: (req,res) => {
        res.send('Deletando fornecedor!');
    }
    
};

module.exports = { fornecedorController };