const { pedidoModel } = require('../models/pedidoModel');
const { Op} = require('sequelize');
const {parseDateBd} = require('../utils/dateUtils');

const pedidoController = {
    listarPedido: (req,res) => {
        res.send('Listando pedido!');
    },

    cadastrarPedido: (req,res) => {
        res.send('Cadastrando pedido!');
    },

    atualizarPedido: (req,res) => {
        res.send('Atualizando pedido!');
    },

    deletarPedido: (req,res) => {
        res.send('Deletando pedido!');
    }
    
};

module.exports = { pedidoController };