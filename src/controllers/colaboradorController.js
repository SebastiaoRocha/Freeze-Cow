const { colaboradorModel } = require('../models/colaboradorModel');
const { Op} = require('sequelize');
const {parseDateBd} = require('../utils/dateUtils');

const colaboradorController = {
    listarColaborador: (req,res) => {
        res.send('Listando colaboradores!');
    },

    cadastrarColaborador: (req,res) => {
        res.send('Cadastrando colaborador!');
    },

    atualizarColaborador: (req,res) => {
        res.send('Atualizando colaborador!');
    },

    deletarColaborador: (req,res) => {
        res.send('Deletando colaborador!');
    }
    
};

module.exports = { colaboradorController };