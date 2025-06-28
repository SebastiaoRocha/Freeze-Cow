const { sequelize } = require('../config/bd');
const { DataTypes} = require('sequelize');

const { unidadeModel } = require('./unidadeModel');

const clienteModel = sequelize.define('Clientes', {
    ID_Cliente:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ID_FK_Unidade:{
        type: DataTypes.INTEGER,
        references:{
            model: unidadeModel,
            key: 'ID_Unidade'
        },
        allowNull: false
    },
    nome_Cliente:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf_Cliente:{
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco_Cliente:{
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone_Cliente:{
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    tableName: 'Clientes',
    timestamps: false
});

unidadeModel.hasMany(clienteModel, {foreignKey:'ID_FK_Unidade', as: 'unidadeCliente'}); 
clienteModel.belongsTo(unidadeModel, {foreignKey:'ID_FK_Unidade', as: 'clienteUnidade'});

// const teste = async ()=>{
//     const dados = await clienteModel.findAll();

//     console.log(dados);
// }

// teste();

module.exports = {clienteModel};