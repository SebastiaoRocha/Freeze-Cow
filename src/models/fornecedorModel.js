const { sequelize } = require('../config/db'); 
const { DataTypes } = require('sequelize');

const fornecedorModel = sequelize.define("Fornecedores", {
    ID_Fornecedor:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nome_Fornecedor:{
        type: DataTypes.STRING,
        allowNull: false
    },
    CNPJ_Fornecedor:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Endereco_Fornecedor:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Telefone_Fornecedor:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'Fornecedores',
    timestamps: false
});

module.exports = {fornecedorModel};