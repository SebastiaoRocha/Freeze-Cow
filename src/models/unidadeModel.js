const { sequelize } = require('../config/bd');
const { dataTypes, dataTypes, DataTypes} = require('sequelize');

const unidadeModel = sequelize.define('Unidade',{
    ID_Unidade:{
        type: DataTypes.INTEGER,
        allowNull: true
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
    tableName: 'Alunos',
    timestamps: false
});

module.exports = {alunoModel};