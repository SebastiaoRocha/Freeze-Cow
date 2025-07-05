const { sequelize } = require('../config/bd');
const { DataTypes } = require('sequelize');

const { clienteModel } = require('./clienteModel');

const pedidoModel = sequelize.define('Pedidos',{
    ID_Pedido:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ID_FK_Cliente:{
        type: DataTypes.INTEGER,
        references:{
            model: clienteModel,
            key: 'ID_Cliente'
        },
        allowNull: false
    },
    dataPedido:{
        type: DataTypes.DATEONLY,
        allowNull: true,
        default: DataTypes.NOW
    },
},{
    tableName: 'Pedidos',
    timestamps: false
});

clienteModel.hasMany(pedidoModel, {foreignKey: 'ID_FK_Cliente', as: 'clientePedido'});
pedidoModel.belongsTo(clienteModel, {foreignKey: 'ID_FK_Cliente', as: 'pedidoCliente'});

module.exports = {pedidoModel};