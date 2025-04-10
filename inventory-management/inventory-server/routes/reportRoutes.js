const express = require('express');
const Order = require('../models/orderModel'); // Import the Order model
const Product = require('../models/productModel'); // Import the Product model

const router = express.Router();

// Route to get all report data
router.get('/api/reports', async (req, res) => {
  try {
    // Total Orders
    const totalOrders = await Order.countDocuments();

    // Total Revenue and Total Quantity Sold
    const orders = await Order.find();
    let totalRevenue = 0;
    let totalQuantitySold = 0;

    orders.forEach(order => {
      totalRevenue += order.price * order.quantity;
      totalQuantitySold += order.quantity;
    });

    // Sales Trends (you can modify this to group by date)
    const salesTrends = await Order.aggregate([
      { $group: { _id: { $dayOfMonth: "$date" }, totalSales: { $sum: "$quantity" } } },
    ]);

    // Top Customers
    const topCustomers = await Order.aggregate([
      { $group: { _id: "$customerName", totalOrders: { $sum: 1 } } },
      { $sort: { totalOrders: -1 } },
      { $limit: 5 }
    ]);

    // Best-Selling Products
    const bestSellingProducts = await Order.aggregate([
      { $group: { _id: "$product", totalSold: { $sum: "$quantity" } } },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      totalOrders,
      totalRevenue,
      totalQuantitySold,
      salesTrends,
      topCustomers,
      bestSellingProducts
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching report data' });
  }
});

module.exports = router;


