const Product = require('../models/ProductModel');
const { Sequelize } = require('sequelize');

const createProduct = async (req, res) => {
    try {
        const requiredFields = ['name', 'image', 'type', 'price', 'countInStock', 'description'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({
                error: `Missing required fields: ${missingFields.join(', ')}`
            });
        }
        const productData = {
            ...req.body,
            rating: req.body.rating || 0
        };

        const product = await Product.create(productData);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const updateProduct = async (req, res) => {
    try {
        const [updated] = await Product.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedProduct = await Product.findByPk(req.params.id);
            return res.status(200).json(updatedProduct);
        }
        return res.status(404).json({ error: 'Product not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.status(204).send();
        }
        return res.status(404).json({ error: 'Product not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const searchProducts = async (req, res) => {
    try {
        const { name } = req.query;
        const products = await Product.findAll({
            where: {
                name: {
                    [Sequelize.Op.like]: `%${name}%`
                }
            }
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts
};