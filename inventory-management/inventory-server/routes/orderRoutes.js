const express = require('express');
const Order = require('../models/orderModel');
const router = express.Router();

router.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).json({ error: 'Error fetching orders' });
    }
});

router.get('/api/orders/customer/:customerName', async (req, res) => {
    try {
        const { customerName } = req.params;
        console.log(`Received request for customer: ${customerName}`);
        const orders = await Order.find({ customerName });

        if (!orders.length) {
            return res.status(404).json({ message: 'No orders found for this customer' });
        }
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders by customer name:', error.message);
        res.status(500).json({ error: 'Error fetching orders by customer name' });
    }
});
// Update an Order
router.put('/api/orders/:id', async (req, res) => {
    const { id } = req.params;
    const { customerName, product, quantity, price, date, time } = req.body;

    // Check if all necessary fields are provided
    if (!customerName || !product || !quantity || !price || !date || !time) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Find and update the order by ID
        const updatedOrder = await Order.findByIdAndUpdate(
            id, 
            { customerName, product, quantity, price, date, time }, 
            { new: true } // Ensures that the updated order is returned
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Send the updated order as the response
        res.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error.message);
        res.status(500).json({ error: 'Error updating order' });
    }
});
// Delete an Order
router.delete('/api/orders/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the order by ID
        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Send a success message
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error.message);
        res.status(500).json({ error: 'Error deleting order' });
    }
});


router.post('/api/orders', async (req, res) => {
    const { customerName, product, quantity, price, date, time } = req.body;

    if (!customerName || !product || !quantity || !price || !date || !time) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newOrder = new Order({ customerName, product, quantity, price, date, time });

    try {
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error adding order:', error.message);
        res.status(500).json({ error: 'Error adding order' });
    }
});

module.exports = router;




