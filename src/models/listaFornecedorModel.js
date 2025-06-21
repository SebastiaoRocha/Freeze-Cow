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

fornecedorModel.hasMany(listaFornecedorModel, {foreignKey: 'id_Fornecedor_Lista_Fornecedor', as: 'Fornecedores'});
listaFornecedorModel.belongsTo(fornecedorModel, {foreignKey: 'id_Fornecedor_Lista_Fornecedor', as: 'Fornecedores'});

unidadeModel.hasMany(listaFornecedorModel, {foreignKey: 'id_Unidade_Lista_Fornecedor', as: 'Unidades'});
listaFornecedorModel.belongsTo(unidadeModel, {foreignKey: 'id_Unidade_Lista_Fornecedor', as: 'Unidades'});

module.exports = {listaFornecedorModel};