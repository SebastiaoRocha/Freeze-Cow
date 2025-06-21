const { sequelize } = require('../config/bd');
const { DataTypes, ForeignKeyConstraintError } = require('sequelize');

const { unidadeModel } = require('./unidadeModel');

const colaboradorModel = sequelize.define('Colaboradores', {
    ID_Colaborador:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ID_FK_Unidade:{
        type: DataTypes.INTEGER,
        references:{
            model: unidadeModel,
            key: 'ID_Unidade'
        },
        allowNull: false
    },
    nome_Colaborador:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cargoColaborador:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nivel_Acesso_Colaborador:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    telefone_Colaborador:{
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    tableName: 'Colaboradores',
    timestamps: false
});

unidadeModel.hasMany(colaboradorModel, {foreignKey: 'ID_FK_Unidade', as: 'Unidades'});
colaboradorModel.belongsTo(unidadeModel, {foreignKey: 'ID_FK_Unidade', as: 'Unidades'});

module.exports = { colaboradorModel };