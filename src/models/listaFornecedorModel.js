const { sequelize } = require('../config/bd');
const { DataTypes } = require('sequelize');

const { fornecedorModel } = require('./fornecedorModel');
const { unidadeModel } = require('./unidadeModel');

const listaFornecedorModel = sequelize.define('listaFornecedores',{
    ID_Fornecedor_Lista_Fornecedor:{
        type: DataTypes.INTEGER,
        references:{
            model: fornecedorModel,
            key: 'ID_Fornecedor'
        },
        allowNull: false
    },
    ID_Unidade_Lista_Fornecedor:{
        type: DataTypes.INTEGER,
        references:{
            model: unidadeModel,
            key: 'ID_Unidade'
        },
        allowNull: false
    }
},{
    tableName: 'listaFornecedores',
    timestamps: false
});

unidadeModel.hasMany(listaFornecedorModel, {foreignKey: 'ID_Fornecedor_Lista_Fornecedor', as: 'Unidades'});
unidadeModel.belongsTo(listaFornecedorModel, {foreignKey: 'ID_Unidade_Lista_Fornecedor', as: 'Fornecedores'});
listaFornecedorModel.belongsTo(unidadeModel, {foreignKey: 'ID_Fornecedor_Lista_Fornecedor', as: 'Unidades'});
listaFornecedorModel.belongsTo(fornecedorModel, {foreignKey: 'ID_Unidade_Lista_Fornecedor', as: 'Fornecedores'});

const teste = async ()=>{
    let result = await listaFornecedorModel.findAll();

    console.log(result);
};

teste();

// module.exports = {listaFornecedorModel};