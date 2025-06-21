const { sequelize } = require('../config/bd');
const { DataTypes } = require('sequelize');

const { fornecedorModel } = require('./fornecedorModel');
const { unidadeModel } = require('./unidadeModel');

const listaFornecedorModel = sequelize.define('lista_Fornecedores',{
    id_Fornecedor_Lista_Fornecedor:{
        type: DataTypes.INTEGER,
        references:{
            model: fornecedorModel,
            key: 'ID_Fornecedor'
        },
        allowNull: false,
        primaryKey: true
    },
    id_Unidade_Lista_Fornecedor:{
        type: DataTypes.INTEGER,
        references:{
            model: unidadeModel,
            key: 'ID_Unidade'
        },
        allowNull: false,
        primaryKey: true
    }
},{
    tableName: 'lista_Fornecedores',
    timestamps: false
});

unidadeModel.hasMany(listaFornecedorModel, {foreignKey: 'id_Fornecedor_Lista_Fornecedor', as: 'Unidades'});
unidadeModel.belongsTo(listaFornecedorModel, {foreignKey: 'id_Unidade_Lista_Fornecedor', as: 'Fornecedores'});
listaFornecedorModel.belongsTo(unidadeModel, {foreignKey: 'id_Fornecedor_Lista_Fornecedor', as: 'Unidades'});
listaFornecedorModel.belongsTo(fornecedorModel, {foreignKey: 'id_Unidade_Lista_Fornecedor', as: 'Fornecedores'});

module.exports = {listaFornecedorModel};