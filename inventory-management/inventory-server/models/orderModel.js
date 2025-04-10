const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }, // Ensure price is a number
    date: { type: Date, required: true },   // Ensure date is of type Date
    time: { type: String, required: true },  // Store time as a string or you can use Date type
});

module.exports = mongoose.model('Order', orderSchema);


