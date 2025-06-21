const { sequelize } = require('../config/bd');
const { DataTypes } = require('sequelize');

const { pedidoModel } = require('./pedidoModel');
const { produtoModel } = require('./produtoModel');

const itensPedidoModel = sequelize.define('itens_pedidos',{
    ID_FK_Pedido:{
        type: DataTypes.INTEGER,
        references:{
            model: pedidoModel,
            key: 'ID_Pedido'
        },
        allowNull: false,
        primaryKey: true
    },
    ID_FK_Produto:{
        type: DataTypes.INTEGER,
        references:{
            model: produtoModel,
            key: 'ID_Produto'
        },
        allowNull: false,
        primaryKey: true
    },
    QTD_Kilo:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: 'itens_pedidos',
    timestamps: false
});

pedidoModel.hasMany(itensPedidoModel, {foreignKey: 'ID_FK_Pedido', as: 'Pedidos'});
itensPedidoModel.belongsTo(pedidoModel, {foreignKey: 'ID_FK_Pedido', as: 'Pedidos'});
produtoModel.hasMany(itensPedidoModel, {foreignKey: 'ID_FK_Produto', as: 'Produtos'});
itensPedidoModel.belongsTo(produtoModel, {foreignKey: 'ID_FK_Produto', as: 'Produtos'});

module.exports = {itensPedidoModel};