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
        try {

            const { Nome_Unidade, Cidade_Unidade, Endereco_Unidade, Telefone_Unidade } = req.body;
            // Validação para garantir que todos os campos obrigatórios sejam fornecidos.
            if (!Nome_Unidade || !Cidade_Unidade || !Endereco_Unidade) {
                return res.status(400).json({ message: "Campos obrigatórios não inseridos!" });
            }
            // Faz uma busca no banco de dados para verificar se já existe usuario cadastrado com esses dados.
            let unidade = await unidadeModel.findOne({
                where: {
                    [Op.or]: [
                        { Nome_Unidade },
                        { Endereco_Unidade }
                    ]
                }
            });

            if (unidade) {
                return res.status(409).json({ message: "Unidade já cadastrado!" });
            }

            await unidadeModel.create({ Nome_Unidade, Cidade_Unidade, Endereco_Unidade, Telefone_Unidade });

            return res.status(201).json({ message: "Unidade cadastrada com sucesso!" });

        } catch (error) {
            console.error("Erro ao cadastrar unidade!");
            return res.status(500).json({ message: "Erro ao cadastrar unidade!" });
        }
    },

    atualizarUnidade: async (req,res) => {
        try {
            const { ID_Unidade } = req.params;
            const { Nome_Unidade, Cidade_Unidade, Endereco_Unidade, Telefone_Unidade } = req.body;

            let unidade = await unidadeModel.findByPk(ID_Unidade);

            if (!unidade) {
                return res.status(404).json({ message: "Unidade não encontrada!" });
            }

            if (Nome_Unidade || Endereco_Unidade) {
                let unidade = await unidadeModel.findOne({
                    where: {
                        [Op.or]: [
                            { Nome_Unidade },
                            { Endereco_Unidade }
                        ]
                    }
                });

                if (unidade) {
                    return res.status(409).json({ message: "Nome ou Endereço já cadastrados!" });
                }

            }

            let dadosAtualizados = { Nome_Unidade, Cidade_Unidade, Endereco_Unidade, Telefone_Unidade };

            await unidadeModel.update(dadosAtualizados, { where: { ID_Unidade } });

            unidade = await unidadeModel.findByPk(ID_Unidade);

            return res.status(200).json({ message: "Unidade atualizada com sucesso: ", Unidade: unidade });

        } catch (error) {
            console.error("Erro ao atualizar unidade!");
            return res.status(500).json({ message: "Erro ao atualizar unidade!" });
        }
    },

    deletarUnidade: async (req,res) => { try {
            
            const { ID_Unidade } = req.params;
    
            let unidade = await unidadeModel.findByPk(ID_Unidade);
    
            if(!unidade){
                return res.status(404).json({message: "Unidade não encontrada!"});
            }
    
            let Nome_Unidade = unidade.Nome_Unidade;

            let result = await unidadeModel.destroy({where: {ID_Unidade}});

            if(result > 0){
                return res.status(200).json({message: `${Nome_Unidade} foi excluida com sucesso!`});
            }else{
                return res.status(404).json({message: "Erro ao excluir unidade!"});
            }

        } catch (error) {
            console.error("Erro ao excluir unidade", error);
            return res.status(500).json({message: "Erro ao excluir unidade!"});
        }     
    }
    
};

module.exports = { unidadeController };