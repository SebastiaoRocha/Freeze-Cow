const { colaboradorModel } = require('../models/colaboradorModel');
const { Op} = require('sequelize');
const {parseDateBd} = require('../utils/dateUtils');

const colaboradorController = {
    listarColaborador: async (req,res) => {
        try {

            let {ID_Colaborador, nome_Colaborador} = req.query;

            let conditions = {};

            if(ID_Colaborador){
                conditions.ID_Colaborador = ID_Colaborador;
            }

            if(nome_Colaborador){
                conditions.nome_Colaborador = nome_Colaborador;
            }

            let colaboradores = await colaboradorModel.findAll({
                where: conditions
            });

            return res.status(200).json(colaboradores);

        } catch (error) {

            console.error(`Erro ao listar colaboradores: `, error);
            return res.status(500).json({ message: "Erro ao listar colaboradores!" });

        }
    },

    cadastrarColaborador: async (req,res) => {
        try {

            const { ID_FK_Unidade, nome_Colaborador, cargoColaborador, nivel_Acesso_Colaborador, telefone_Colaborador } = req.body;
            // Validação para garantir que todos os campos obrigatórios sejam fornecidos.
            if (!ID_FK_Unidade || !nome_Colaborador || !cargoColaborador || !nivel_Acesso_Colaborador) {
                return res.status(400).json({ message: "Campos obrigatórios não inseridos!" });
            }
            // Faz uma busca no banco de dados para verificar se já existe usuario cadastrado com esses dados.
            let colaborador = await colaboradorModel.findOne({
                where: {        
                    nome_Colaborador 
                }
            });

            if (colaborador) {
                return res.status(409).json({ message: "Colaborador já cadastrado!" });
            }

            await colaboradorModel.create({ ID_FK_Unidade, nome_Colaborador, cargoColaborador, nivel_Acesso_Colaborador, telefone_Colaborador });

            return res.status(201).json({ message: "Colaborador cadastrado com sucesso!" });

        } catch (error) {
            console.error("Erro ao cadastrar colaborador!");
            return res.status(500).json({ message: "Erro ao cadastrar colaborador!" });
        }
    },

    atualizarColaborador: async (req,res) => {
        try {
            const { ID_Colaborador } = req.params;
            const { ID_FK_Unidade, nome_Colaborador, cargoColaborador, nivel_Acesso_Colaborador, telefone_Colaborador } = req.body;

            let colaborador = await colaboradorModel.findByPk(ID_Colaborador);

            if (!colaborador) {
                return res.status(404).json({ message: "Colaborador não encontrado!" });
            }

            if (nome_Colaborador) {
                let colaborador = await colaboradorModel.findOne({
                    where: {
                        nome_Colaborador
                    }
                });

                if (colaborador) {
                    return res.status(409).json({ message: "Colaborador já cadastrados!" });
                }

            }

            let dadosAtualizados = { ID_FK_Unidade, nome_Colaborador, cargoColaborador, nivel_Acesso_Colaborador, telefone_Colaborador };

            await colaboradorModel.update(dadosAtualizados, { where: { ID_Colaborador } });

            colaborador = await colaboradorModel.findByPk(ID_Colaborador);

            return res.status(200).json({ message: "Colaborador atualizado com sucesso: ", Colaborador: colaborador });

        } catch (error) {
            console.error("Erro ao atualizar colaborador!");
            return res.status(500).json({ message: "Erro ao atualizar colaborador!" });
        }
    },

    deletarColaborador: async (req,res) => {
        res.send('Deletando colaborador!');
    }
    
};

module.exports = { colaboradorController };