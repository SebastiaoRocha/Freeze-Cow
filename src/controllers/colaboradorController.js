const { unidadeModel } = require('../models/unidadeModel');
const { Op} = require('sequelize');
const {parseDateBd} = require('../utils/dateUtils');

const unidadeController = {
    listarUnidade: (req,res) => {
        res.send('Listando Unidade!');
    },

    cadastrarUnidade: (req,res) => {
        res.send('Cadastrando Unidade!');
    },

    atualizarUnidade: (req,res) => {
        res.send('Atualizando Unidade!');
    },

    deletarUnidade: (req,res) => {
        res.send('Deletando Unidade!');
    }
    
};

module.exports = { unidadeController };