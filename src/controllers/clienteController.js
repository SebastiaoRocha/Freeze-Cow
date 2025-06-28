const { clienteModel } = require('../models/clienteModel');
const { Op} = require('sequelize');
const {parseDateBd} = require('../utils/dateUtils');

const clienteController = {
    listarCliente: (req,res) => {
        res.send('Listando clientes!');
    },

    cadastrarCliente: (req,res) => {
        res.send('Cadastrando cliente!');
    },

    atualizarCliente: (req,res) => {
        res.send('Atualizando cliente!');
    },

    deletarCliente: (req,res) => {
        res.send('Deletando cliente!');
    }
    
};

module.exports = { clienteController };