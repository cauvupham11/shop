const Order = require('../models/OrderModel');
const OrderItem = require('../models/OrderItemModel');
const Product = require('../models/ProductModel');
const { syncIndexes } = require('mongoose');
const { Op } = require('sequelize');

const createOrder = async (req, res) => {
    // nhận 2 đối tượng
    //     { "userId": 1,
    //   "orderItems": [
    //     { "productId": 101, "amount": 2 },
    //     { "productId": 202, "amount": 1 }
    //   ]
    // }
    const { userId, phoneNumber, address, orderItems } = req.body;
    try {
        // 1. Tạo Order trước
        const newOrder = await Order.create({ userId, phoneNumber, address });
        const orderId = newOrder.id

        // 2. Tạo danh OrderItem với vòng for 
        const listOrderItemsToCreate = [];

        for (let i = 0; i < orderItems.length; i++) {
            const { productId, amount } = orderItems[i];
            listOrderItemsToCreate.push({
                orderId: orderId,
                productId: productId,
                amount: amount
            })
        }

        await OrderItem.bulkCreate(listOrderItemsToCreate)
        res.status(201).json(newOrder);
        return
    } catch (error) {
        res.status(400).json({ error: error.message });
        return
    }
}

const getAllOrdersByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
        const orders = await Order.findAll({
            where: { userId: userId },
            // include: [
            //     {
            //         model: OrderItem,
            //         as: 'orderItems',  // Sử dụng tên alias đã đặt trong quan hệ
            //         include: [
            //             {
            //                 model: Product,
            //                 as: 'product'
            //             }
            //         ]
            //     }
            // ]
        });

        res.status(200).json(orders);
        return;
    } catch (error) {
        res.status(500).json({ error: error.message });
        return;
    }
};
const getAllOrder = async (req, res) => {
    try {
        const { from, to } = req.query; // ?from=2024-01-01&to=2024-01-31
        console.log(`from: ${from}, to: ${to}`);

        const whereClause = {};

        if (from && to) {
            whereClause.createdAt = {
                [Op.between]: [new Date(from), new Date(to)]
            };
        }

        const orders = await Order.findAll({
            where: whereClause,
            // include: [
            //     {
            //         model: OrderItem,
            //         as: 'orderItems',
            //         include: [
            //             {
            //                 model: Product,
            //                 as: 'product'
            //             }
            //         ]
            //     }
            // ]
        });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getDetailOrderByOrderId = async (req, res) => {
    const { orderId } = req.params;
    console.log(orderId);

    try {
        const orders = await Order.findOne({
            where: { id: orderId },
            include: [
                {
                    model: OrderItem,
                    as: 'orderItems',
                    include: [
                        {
                            model: Product,
                            as: 'product'
                        }
                    ]
                }
            ]
        });

        res.status(200).json(orders);
        return;
    } catch (error) {
        res.status(500).json({ error: error.message });
        return;
    }
}
// const getAllOrder = async (req, res) => {
//     try {
//         const orders = await Order.findAll({
//             include: [
//                 {
//                     model: OrderItem,
//                     as: 'orderItems',
//                     include: [
//                         {
//                             model: Product,
//                             as: 'product'
//                         }
//                     ]
//                 }
//             ]
//         });

//         res.status(200).json(orders);
//         return;
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//         return;
//     }
// };

module.exports = {
    createOrder,
    getAllOrdersByUserId,
    getAllOrder,
    getDetailOrderByOrderId
}