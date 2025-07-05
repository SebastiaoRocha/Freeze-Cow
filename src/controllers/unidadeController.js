const { unidadeModel } = require('../models/unidadeModel');
const { Op} = require('sequelize');
const {parseDateBd} = require('../utils/dateUtils');

const unidadeController = {
    listarUnidade: async (req,res) => {
        try {

            let {ID_Unidade, Nome_Unidade} = req.query;

            let conditions = {};

            if(ID_Unidade){
                conditions.ID_Unidade = ID_Unidade;
            }

            if(Nome_Unidade){
                conditions.Nome_Unidade = Nome_Unidade;
            }

            let unidades = await unidadeModel.findAll({
                where: conditions
            });

            return res.status(200).json(unidades);

        } catch (error) {

            console.error(`Erro ao listar unidades: `, error);
            return res.status(500).json({ message: "Erro ao listar unidades!" });

        }
    },

    cadastrarUnidade: async (req,res) => {
        res.send('Cadastrando Unidade!');
    },

    atualizarUnidade: async (req,res) => {
        res.send('Atualizando Unidade!');
    },

    deletarUnidade: async (req,res) => {
        res.send('Deletando Unidade!');
    }
    
};

module.exports = { unidadeController };