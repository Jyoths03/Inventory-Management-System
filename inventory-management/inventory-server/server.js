const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
app.use(bodyParser.json());

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/yourdbname', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// User Schema (for authentication)
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// Product Schema (for inventory management)
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
});

const InventoryProduct = mongoose.model('Product', ProductSchema);

// Order Schema (for customer orders)
const OrderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, default: 'Pending' },
});

const Order = mongoose.model('Order', OrderSchema);

// User Registration Route
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'User registration failed' });
    }
});

// User Login Route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// Product Routes

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await InventoryProduct.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});

// Create a new product
app.post('/api/products', async (req, res) => {
    const { name, quantity } = req.body;
    const newProduct = new InventoryProduct({ name, quantity });

    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error adding product' });
    }
});

// Update product by ID
app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    try {
        const updatedProduct = await InventoryProduct.findByIdAndUpdate(
            id,
            { name, quantity },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
    }
});

// Delete product by ID
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await InventoryProduct.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
    }
});

// Order Routes

// Get all orders
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching orders' });
    }
});

// Create a new order
app.post('/api/orders', async (req, res) => {
    const { customerName, product, quantity, price, date, time } = req.body;

    const newOrder = new Order({ customerName, product, quantity, price, date, time });

    try {
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: 'Error adding order' });
    }
});

// Update order by ID
app.put('/api/orders/:id', async (req, res) => {
    const { id } = req.params;
    const { customerName, product, quantity, price, date, time, status } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { customerName, product, quantity, price, date, time, status },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: 'Error updating order' });
    }
});

// Delete order by ID
app.delete('/api/orders/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting order' });
    }
});

// Get orders by customer name
app.get('/api/orders/customer/:customerName', async (req, res) => {
    const { customerName } = req.params;

    try {
        const orders = await Order.find({ customerName });
        if (!orders.length) {
            return res.status(404).json({ message: 'No orders found for this customer.' });
        }
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching orders by customer name' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
