const { sequelize } = require('../config/bd');
const { DataTypes } = require('sequelize');

const { pedidoModel } = require('./pedidoModel');
const { produtoModel } = require('./produtoModel');

const itensPedidoModel = sequelize.define('Item_Pedido',{
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
    tableName: 'Item_Pedido',
    timestamps: false
});

pedidoModel.hasMany(itensPedidoModel, {foreignKey: 'ID_FK_Pedido', as: 'Pedidos'});
itensPedidoModel.belongsTo(pedidoModel, {foreignKey: 'ID_FK_Pedido', as: 'Item'});

produtoModel.hasMany(itensPedidoModel, {foreignKey: 'ID_FK_Produto', as: 'Produtos'});
itensPedidoModel.belongsTo(produtoModel, {foreignKey: 'ID_FK_Produto', as: 'Item_Pedido'});

// const teste = async ()=>{
//     let result = await itensPedidoModel.findAll();
//     console.log(result);
// }

// teste();
module.exports = {itensPedidoModel};