const { Op} = require('sequelize');
const { clienteModel } = require('../models/clienteModel');

const clienteController = {
    listarCliente: async (req,res) => {
        try {

            let {ID_Cliente, nome_Cliente} = req.query;

            let conditions = {};

            if(ID_Cliente){
                conditions.ID_Cliente = ID_Cliente;
            }

            if(nome_Cliente){
                conditions.nome_Cliente = nome_Cliente;
            }

            let clientes = await clienteModel.findAll({
                where: conditions
            });

            return res.status(200).json(clientes);

        } catch (error) {

            console.error(`Erro ao listar clientes: `, error);
            return res.status(500).json({ message: "Erro ao listar clientes!" });

        }
        
    },

    cadastrarCliente: async (req,res) => {
        try {

            const { ID_FK_Unidade, nome_Cliente, cpf_Cliente, endereco_Cliente, telefone_Cliente } = req.body;
            // Validação para garantir que todos os campos obrigatórios sejam fornecidos.
            if (!ID_FK_Unidade || !nome_Cliente || !cpf_Cliente || !endereco_Cliente) {
                return res.status(400).json({ message: "Campos obrigatórios não inseridos!" });
            }
            // Faz uma busca no banco de dados para verificar se já existe usuario cadastrado com esses dados.
            let cliente = await clienteModel.findOne({
                where: {
                    [Op.or]: [
                        { cpf_Cliente },
                        //{ endereco_Cliente }
                    ]
                }
            });

            if (cliente) {
                return res.status(409).json({ message: "Cliente já cadastrado!" });
            }

            await clienteModel.create({ ID_FK_Unidade, nome_Cliente, cpf_Cliente, endereco_Cliente, telefone_Cliente });

            return res.status(201).json({ message: "Cliente cadastrado com sucesso!" });

        } catch (error) {
            console.error("Erro ao cadastrar cliente!");
            return res.status(500).json({ message: "Erro ao cadastrar cliente!" });
        }
    },

    atualizarCliente: async (req,res) => {
        try {
            const { ID_Cliente } = req.params;
            const { ID_FK_Unidade, nome_Cliente, cpf_Cliente, endereco_Cliente, telefone_Cliente } = req.body;



            let cliente = await clienteModel.findByPk(ID_Cliente);

            if (!cliente) {
                return res.status(404).json({ message: "Cliente não encontrado!" });
            }

            if (cpf_Cliente || endereco_Cliente) {
                let cliente = await clienteModel.findOne({
                    where: {
                        [Op.or]: [
                            { cpf_Cliente },
                            { endereco_Cliente }
                        ]
                    }
                });

                if (cliente) {
                    return res.status(409).json({ message: "CPF ou Endereço já cadastrados!" });
                }

            }

            let dadosAtualizados = { ID_FK_Unidade, nome_Cliente, cpf_Cliente, endereco_Cliente, telefone_Cliente };

            await clienteModel.update(dadosAtualizados, { where: { ID_Cliente } });

            cliente = await clienteModel.findByPk(ID_Cliente);

            return res.status(200).json({ message: "Cliente atualizado com sucesso: ", Cliente: cliente });

        } catch (error) {
            console.error("Erro ao atualizar cliente!");
            return res.status(500).json({ message: "Erro ao atualizar cliente!" });
        }
    },

    deletarCliente: async (req,res) => {
        try {
            
            const { ID_Cliente } = req.params;
    
            let cliente = await clienteModel.findByPk(ID_Cliente);
    
            if(!cliente){
                return res.status(404).json({message: "Cliente não encontrado!"});
            }
    
            let nome_Cliente = cliente.nome_Cliente;

            let result = await clienteModel.destroy({where: {ID_Cliente}});

            if(result > 0){
                return res.status(200).json({message: `${nome_Cliente} foi excluido com sucesso!`});
            }else{
                return res.status(404).json({message: "Erro ao excluir cliente!"});
            }

        } catch (error) {
            console.error("Erro ao excluir cliente", error);
            return res.status(500).json({message: "Erro ao excluir cliente!"});
        }     
    
    }
    
};

module.exports = { clienteController };
