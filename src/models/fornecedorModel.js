const { sequelize } = require('../config/db'); 
const { DataTypes } = require('sequelize');

const fornecedorModel = sequelize.define("Fornecedores", {
    ID_Fornecedor:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeFornecedor:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cnpjFornecedor:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    enderecoFornecedor:{
        type: DataTypes.STRING,
        allowNull: false
    },
    telefoneFornecedor:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'Fornecedores',
    timestamps: false
});

module.exports = {fornecedorModel};