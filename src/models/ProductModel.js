const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    countInStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: true, 
        defaultValue: 0,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    timestamps: true, 
});

module.exports = Product;