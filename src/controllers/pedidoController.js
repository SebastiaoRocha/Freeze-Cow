const { pedidoModel } = require('../models/pedidoModel');
const { Op} = require('sequelize');
const {clienteModel} = require('../models/clienteModel');

const pedidoController = {
    listarPedido: async (req,res) => {
        try {

            let {ID_Pedido, ID_FK_Cliente, data_Pedido} = req.query;

            let conditions = {};

            if(ID_Pedido){
                conditions.ID_Pedido = ID_Pedido;
            }

            if(ID_FK_Cliente){
                conditions.ID_FK_Cliente = ID_FK_Cliente;
            }

            if(data_Pedido){
                conditions.data_Pedido = data_Pedido;
            }

            let pedidos = await pedidoModel.findAll({
                where: conditions,
                include:{
                    model: clienteModel,
                    as: 'pedidoCliente',
                    attributes: ['nome_Cliente','cpf_Cliente', 'telefone_Cliente']
                }
            });

            return res.status(200).json(pedidos);

        } catch (error) {

            console.error(`Erro ao listar pedidos: `, error);
            return res.status(500).json({ message: "Erro ao listar pedidos!" });

        }
    },

    cadastrarPedido: async (req,res) => {
        try {

            const { ID_FK_Cliente } = req.body;

            await pedidoModel.create({ ID_FK_Cliente });

            return res.status(201).json({ message: "Pedido cadastrado com sucesso!" });

        } catch (error) {
            console.error("Erro ao cadastrar pedido!", error);
            return res.status(500).json({ message: "Erro ao cadastrar pedido!" });
        }
    },

    //Não atualiza

    deletarPedido: async (req,res) => {
        try {
            
            const { ID_Pedido } = req.params;
            console.log(ID_Pedido)
            let pedido = await pedidoModel.findByPk(ID_Pedido);
    
            if(!pedido){
                return res.status(404).json({message: "Pedido não encontrado!"});
            }
    
            let id_Pedido = pedido.ID_Pedido;
            
            let result = await pedidoModel.destroy({where: {ID_Pedido}});

            if(result > 0){
                return res.status(200).json({message: `Pedido de ID: ${id_Pedido} foi excluido com sucesso!`});
            }else{
                return res.status(404).json({message: "Erro ao excluir pedido!"});
            }

        } catch (error) {
            console.error("Erro ao excluir pedido", error);
            return res.status(500).json({message: "Erro ao excluir pedido!"});
        }     
    }
    
};

module.exports = { pedidoController };