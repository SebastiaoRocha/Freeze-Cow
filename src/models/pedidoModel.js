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
    data_Pedido:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
},{
    tableName: 'Pedidos',
    timestamps: false
});

clienteModel.hasMany(pedidoModel, {foreignKey: 'id_Cliente', as: 'Clientes'});
pedidoModel.belongsTo(clienteModel, {foreignKey: 'id_Cliente', as: 'Clientes'});

module.exports = {pedidoModel};