const User = require('./UserModel')
const Product = require('./ProductModel');
const Order = require('./OrderModel');
const OrderItem = require('./OrderItemModel');

function setupAssociations() {
    // Quan hệ giữa User và Order
    User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
    Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

    // Quan hệ giữa Order và OrderItem
    Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'orderItems' });
    OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

    // Quan hệ giữa Product và OrderItem
    Product.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems' });
    OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
}


module.exports = setupAssociations;