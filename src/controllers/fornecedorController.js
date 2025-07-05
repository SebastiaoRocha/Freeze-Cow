const { fornecedorModel } = require('../models/fornecedorModel');
const { Op} = require('sequelize');
const {parseDateBd} = require('../utils/dateUtils');

const fornecedorController = {
    listarFornecedor: async (req,res) => {
        try {

            let {ID_Fornecedor, nome_Fornecedor} = req.query;

            let conditions = {};

            if(ID_Fornecedor){
                conditions.ID_Fornecedor = ID_Fornecedor;
            }

            if(nome_Fornecedor){
                conditions.nome_Fornecedor = nome_Fornecedor;
            }

            let fornecedores = await fornecedorModel.findAll({
                where: conditions
            });

            return res.status(200).json(fornecedores);

        } catch (error) {

            console.error(`Erro ao listar fornecedores: `, error);
            return res.status(500).json({ message: "Erro ao listar fornecedores!" });

        }
    },

    cadastrarFornecedor: async (req,res) => {
        try {

            const { Nome_Fornecedor, CNPJ_Fornecedor, Endereco_Fornecedor, Telefone_Fornecedor } = req.body;
            // Validação para garantir que todos os campos obrigatórios sejam fornecidos.
            if (!Nome_Fornecedor || !CNPJ_Fornecedor || !Endereco_Fornecedor || !Telefone_Fornecedor) {
                return res.status(400).json({ message: "Campos obrigatórios não inseridos!" });
            }
            // Faz uma busca no banco de dados para verificar se já existe usuario cadastrado com esses dados.
            let fornecedor = await fornecedorModel.findOne({
                where: {
                    [Op.or]: [
                        { CNPJ_Fornecedor },
                        { Endereco_Fornecedor }
                    ]
                }
            });

            if (fornecedor) {
                return res.status(409).json({ message: "Fornecedor já cadastrado!" });
            }

            await fornecedorModel.create({ Nome_Fornecedor, CNPJ_Fornecedor, Endereco_Fornecedor, Telefone_Fornecedor });

            return res.status(201).json({ message: "Fornecedor cadastrado com sucesso!" });

        } catch (error) {
            console.error("Erro ao cadastrar Fornecedor!");
            return res.status(500).json({ message: "Erro ao cadastrar Fornecedor!" });
        }
    },

    atualizarFornecedor: async (req,res) => {
        try {
            const { ID_Fornecedor } = req.params;
            const { Nome_Fornecedor, CNPJ_Fornecedor, Endereco_Fornecedor, Telefone_Fornecedor } = req.body;



            let fornecedor = await fornecedorModel.findByPk(ID_Fornecedor);

            if (!fornecedor) {
                return res.status(404).json({ message: "Fornecedor não encontrado!" });
            }

            if (CNPJ_Fornecedor || Endereco_Fornecedor) {
                let fornecedor = await fornecedorModel.findOne({
                    where: {
                        [Op.or]: [
                            { CNPJ_Fornecedor },
                            { Endereco_Fornecedor }
                        ]
                    }
                });

                if (fornecedor) {
                    return res.status(409).json({ message: "CNPJ ou Endereço já cadastrados!" });
                }

            }

            let dadosAtualizados = { Nome_Fornecedor, CNPJ_Fornecedor, Endereco_Fornecedor, Telefone_Fornecedor };

            await fornecedorModel.update(dadosAtualizados, { where: { ID_Fornecedor } });

            fornecedor = await fornecedorModel.findByPk(ID_Fornecedor);

            return res.status(200).json({ message: "Fornecedor atualizado com sucesso: ", Fornecedor: fornecedor });

        } catch (error) {
            console.error("Erro ao atualizar fornecedor!");
            return res.status(500).json({ message: "Erro ao atualizar fornecedor!" });
        }
    },

    deletarFornecedor: async (req,res) => {
        try {
            
            const { ID_Fornecedor } = req.params;
    
            let fornecedor = await fornecedorModel.findByPk(ID_Fornecedor);
            console.log(ID_Fornecedor);
            if(!fornecedor){
                return res.status(404).json({message: "fornecedor não encontrado!"});
            }
    
            let Nome_Fornecedor = fornecedor.Nome_Fornecedor;

            let result = await fornecedorModel.destroy({where: {ID_Fornecedor}});

            if(result > 0){
                return res.status(200).json({message: `${Nome_Fornecedor} foi excluido com sucesso!`});
            }else{
                return res.status(404).json({message: "Erro ao excluir fornecedor!"});
            }

        } catch (error) {
            console.error("Erro ao excluir fornecedor", error);
            return res.status(500).json({message: "Erro ao excluir fornecedor!"});
        }     
    }
    
};

module.exports = { fornecedorController };