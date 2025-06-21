const { sequelize } = require('../config/bd');
const { DataTypes } = require('sequelize');

const { unidadeModel } = require('./unidadeModel');

const produtoModel = sequelize.define('Produtos', {
    ID_Produto:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ID_Unidade_FK:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Nome_Produto:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Qtd_Kilo_Produto:{
        type: DataTypes.DECIMAL(6,3),
        allowNull: false
    },
    Num_Lote_Produto:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Data_Validade_Produto:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Liberado_Produto:{
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    Valor_Compra_Produto:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    Valor_Venda_Produto:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }
},{
    tableName: 'Produtos',
    timestamps: false
});

unidadeModel.hasMany(produtoModel, {foreignKey: 'ID_Unidade_FK', as: 'Unidades'});
produtoModel.belongsTo(unidadeModel, {foreignKey: 'ID_Unidade_FK', as: 'Unidades'});

// const teste = async ()=> {
//     let result = await produtoModel.findAll();
//     console.log(result);
// }

// teste();
module.exports = { produtoModel };
