const { sequelize } = require('../config/bd');
const { DataTypes} = require('sequelize');

const unidadeModel = sequelize.define('Unidades',{
    ID_Unidade:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nome_Unidade:{
        type: DataTypes.STRING,
        allowNull: true
    },
    Cidade_Unidade:{
        type: DataTypes.STRING,
        allowNull: true
    },
    Endereco_Unidade:{
        type: DataTypes.STRING,
        allowNull: true
    },
    Telefone_Unidade:{
        type: DataTypes.STRING,
        allowNull: false
    }
    
},{
    tableName: 'Unidades',
    timestamps: false
});

module.exports = {unidadeModel};