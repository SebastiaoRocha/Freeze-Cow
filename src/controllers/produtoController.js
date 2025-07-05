const { produtoModel } = require('../models/produtoModel');
const { Op} = require('sequelize');
const {parseDateBd} = require('../utils/dateUtils');
const { unidadeModel } = require('../models/unidadeModel');

const produtoController = {
    listarProduto: async (req,res) => {
        try {

            let {ID_Produto, Nome_Produto,ID_Unidade_FK} = req.query;

            let conditions = {};

            if(ID_Produto){
                conditions.ID_Produto = ID_Produto;
            }

            if(Nome_Produto){
                conditions.Nome_Produto = Nome_Produto;
            }

            if(ID_Unidade_FK){
                conditions.ID_Unidade_FK = ID_Unidade_FK;
            }

            let produtos = await produtoModel.findAll({
                where: conditions
            });

            return res.status(200).json(produtos);

        } catch (error) {

            console.error(`Erro ao listar produtos: `, error);
            return res.status(500).json({ message: "Erro ao listar produtos!" });

        }
    },

    cadastrarProduto: async (req,res) => {
        try {

            const { ID_Unidade_FK, Nome_Produto, Qtd_Kilo_Produto, Num_Lote_Produto, Data_Validade_Produto, Liberado_Produto, Valor_Compra_Produto, Valor_Venda_Produto } = req.body;
            // Validação para garantir que todos os campos obrigatórios sejam fornecidos.
            if (!ID_Unidade_FK || !Nome_Produto || !Qtd_Kilo_Produto || !Num_Lote_Produto || !Data_Validade_Produto || !Valor_Compra_Produto || !Valor_Venda_Produto) {
                return res.status(400).json({ message: "Campos obrigatórios não inseridos!" });
            }
            // Faz uma busca no banco de dados para verificar se já existe usuario cadastrado com esses dados.
            let produto = await produtoModel.findOne({
                where: {
                    Num_Lote_Produto
                }
            });

            if (produto) {
                return res.status(409).json({ message: "Produto já cadastrado!" });
            }

            await produtoModel.create({ ID_Unidade_FK, Nome_Produto, Qtd_Kilo_Produto, Num_Lote_Produto, Data_Validade_Produto, Liberado_Produto, Valor_Compra_Produto, Valor_Venda_Produto });

            return res.status(201).json({ message: "Produto cadastrado com sucesso!" });

        } catch (error) {
            console.error("Erro ao cadastrar produto!");
            return res.status(500).json({ message: "Erro ao cadastrar produto!" });
        }
    },

    atualizarProduto:async (req,res) => {
        try {
            const { ID_Produto } = req.params;
            const { ID_Unidade_FK, Nome_Produto, Qtd_Kilo_Produto, Num_Lote_Produto, Data_Validade_Produto, Liberado_Produto, Valor_Compra_Produto, Valor_Venda_Produto } = req.body;

            let produto = await produtoModel.findByPk(ID_Produto);

            if (!produto) {
                return res.status(404).json({ message: "Produto não encontrado!" });
            }

            if (Num_Lote_Produto) {
                let produto = await produtoModel.findOne({
                    where: {
                        Num_Lote_Produto
                    }
                });

                if (produto) {
                    return res.status(409).json({ message: "Número de lote já cadastrados!" });
                }

            }

            let dadosAtualizados = { ID_Unidade_FK, Nome_Produto, Qtd_Kilo_Produto, Num_Lote_Produto, Data_Validade_Produto, Liberado_Produto, Valor_Compra_Produto, Valor_Venda_Produto };

            await produtoModel.update(dadosAtualizados, { where: { ID_Produto } });

            produto = await produtoModel.findByPk(ID_Produto);

            return res.status(200).json({ message: "Produto atualizado com sucesso: ", Produto: produto });

        } catch (error) {
            console.error("Erro ao atualizar produto!");
            return res.status(500).json({ message: "Erro ao atualizar produto!" });
        }
    },

    deletarProduto: async (req,res) => {
         try {
            
            const { ID_Produto } = req.params;
    
            let produto = await produtoModel.findByPk(ID_Produto);
    
            if(!produto){
                return res.status(404).json({message: "Produto não encontrado!"});
            }
    
            let Nome_Produto = produto.Nome_Produto;

            let result = await produtoModel.destroy({where: {ID_Produto}});

            if(result > 0){
                return res.status(200).json({message: `${Nome_Produto} foi excluido com sucesso!`});
            }else{
                return res.status(404).json({message: "Erro ao excluir produto!"});
            }

        } catch (error) {
            console.error("Erro ao excluir produto", error);
            return res.status(500).json({message: "Erro ao excluir produto!"});
        }     
    }
    
};

module.exports = { produtoController };