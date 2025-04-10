import React, { useState } from 'react';
import axios from 'axios';

const Billing = () => {
    const [customerName, setCustomerName] = useState('');
    const [orders, setOrders] = useState([]);
    const [totalBill, setTotalBill] = useState(0);
    const [gstPercentage, setGstPercentage] = useState(10); // Default GST to 10%
    const [discount, setDiscount] = useState(0);
    const [error, setError] = useState('');

    const calculateTotalBill = (subtotal) => {
        const calculatedGst = subtotal * (gstPercentage / 100);
        const calculatedDiscount = subtotal * (discount / 100);
        return subtotal + calculatedGst - calculatedDiscount;
    };

    const handleFetchOrders = async () => {
        try {
            const response = await axios.get(`/api/orders/customer/${customerName}`);
            const fetchedOrders = response.data;
            setOrders(fetchedOrders);

            const subtotal = fetchedOrders.reduce((acc, order) => {
                return acc + (order.price * order.quantity);
            }, 0);

            // Calculate total bill with the new function
            const total = calculateTotalBill(subtotal);
            setTotalBill(total);
            setError('');
        } catch (err) {
            console.error('Error fetching orders by customer name:', err.message);
            setError(err.response?.data?.message || 'Error fetching orders');
            setOrders([]);
            setTotalBill(0);
        }
    };

    const handleGstChange = (e) => {
        const newGstPercentage = Number(e.target.value);
        setGstPercentage(newGstPercentage);

        // Recalculate total bill based on new GST percentage
        const subtotal = orders.reduce((acc, order) => acc + (order.price * order.quantity), 0);
        const newTotalBill = calculateTotalBill(subtotal);
        setTotalBill(newTotalBill);
    };

    const handleDiscountChange = (e) => {
        const newDiscount = Number(e.target.value);
        setDiscount(newDiscount);

        // Recalculate total bill based on new discount percentage
        const subtotal = orders.reduce((acc, order) => acc + (order.price * order.quantity), 0);
        const newTotalBill = calculateTotalBill(subtotal);
        setTotalBill(newTotalBill);
    };

    
    const styles = {
        container: {
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            maxWidth: '600px',
            margin: 'auto',
            textAlign: 'center',
        },
        title: {
            fontSize: '28px',
            color: '#333',
            marginBottom: '20px',
        },
        input: {
            padding: '10px',
            width: '80%',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginBottom: '10px',
        },
        button: {
            padding: '10px 15px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '16px',
        },
        error: {
            color: 'red',
            marginBottom: '15px',
        },
        orderList: {
            listStyleType: 'none',
            padding: 0,
            margin: '20px 0',
        },
        orderItem: {
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginBottom: '10px',
            backgroundColor: '#fff',
            textAlign: 'left',
        },
        totalBill: {
            fontSize: '20px',
            fontWeight: 'bold',
            marginTop: '15px',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Billing Page</h2>
            <input
                type="text"
                placeholder="Enter Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleFetchOrders} style={styles.button}>
                Fetch Orders
            </button>

            {error && <p style={styles.error}>{error}</p>}

            <h3>Orders:</h3>
            <ul style={styles.orderList}>
                {orders.map((order, index) => (
                    <li key={index} style={styles.orderItem}>
                        {order.product} - Quantity: {order.quantity}, Price: ${order.price.toFixed(2)}
                    </li>
                ))}
            </ul>

            <h3 style={styles.totalBill}>
                Subtotal: ${orders.reduce((acc, order) => acc + (order.price * order.quantity), 0).toFixed(2)}
            </h3>
            <h3 style={styles.totalBill}>GST (%): 
                <input
                    type="number"
                    placeholder="GST %"
                    value={gstPercentage}
                    onChange={handleGstChange}
                    style={{...styles.input, width: '30%'}}
                />
            </h3>
            <h3 style={styles.totalBill}>GST Amount: ${(orders.reduce((acc, order) => acc + (order.price * order.quantity), 0) * (gstPercentage / 100)).toFixed(2)}</h3>
            <input
                type="number"
                placeholder="Discount %"
                value={discount}
                onChange={handleDiscountChange}
                style={styles.input}
            />
            <h3 style={styles.totalBill}>Total Bill: ${totalBill.toFixed(2)}</h3>
        </div>
    );
};

export default Billing;



