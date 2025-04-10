import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Orders() {
    const [customerName, setCustomerName] = useState('');
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [orders, setOrders] = useState([]);
    const [editOrderId, setEditOrderId] = useState(null); // to track the order being edited

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error.message);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newOrder = { 
            customerName, 
            product, 
            quantity: parseInt(quantity), 
            price: parseFloat(price), 
            date, 
            time 
        };

        try {
            if (editOrderId) {
                // Update order if editOrderId is set
                await axios.put(`/api/orders/${editOrderId}`, newOrder);
                setEditOrderId(null); // Reset after update
            } else {
                // Add new order
                await axios.post('/api/orders', newOrder);
            }
            setCustomerName('');
            setProduct('');
            setQuantity('');
            setPrice('');
            setDate('');
            setTime('');
            fetchOrders();
        } catch (error) {
            console.error('Error adding/updating order:', error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/orders/${id}`);
            fetchOrders(); // Refresh the order list after deletion
        } catch (error) {
            console.error('Error deleting order:', error.message);
        }
    };

    const handleEdit = (order) => {
        setCustomerName(order.customerName);
        setProduct(order.product);
        setQuantity(order.quantity);
        setPrice(order.price);
        setDate(order.date);
        setTime(order.time);
        setEditOrderId(order._id); 
    };

   
    const styles = {
        container: {
            backgroundColor: '#f0f4f8',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            maxWidth: '800px',
            margin: '40px auto',
        },
        title: {
            fontSize: '32px',
            color: '#004d99',
            marginBottom: '25px',
            textAlign: 'center',
        },
        form: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            marginBottom: '25px',
        },
        input: {
            padding: '12px',
            border: '1px solid #c0c0c0',
            borderRadius: '6px',
            fontSize: '16px',
        },
        button: {
            gridColumn: 'span 2',
            padding: '12px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
        ordersTitle: {
            fontSize: '28px',
            color: '#333',
            marginTop: '30px',
            textAlign: 'center',
        },
        card: {
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '15px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        cardHover: {
            transform: 'scale(1.02)',
        },
        orderDetails: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
        },
        date: {
            fontStyle: 'italic',
            color: '#555',
        },
        buttonContainer: {
            display: 'flex',
            gap: '10px',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Orders Management</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Product"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    style={styles.input}
                />
                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >
                    {editOrderId ? 'Update Order' : 'Add Order'}
                </button>
            </form>

            <h3 style={styles.ordersTitle}>Existing Orders</h3>
            <ul style={{ padding: 0 }}>
                {orders.map((order) => {
                    const formattedDate = order.date ? new Date(order.date).toLocaleDateString() : 'N/A';
                    return (
                        <li
                            key={order._id}
                            style={styles.card}
                            onMouseOver={(e) => e.currentTarget.style.transform = styles.cardHover.transform}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <div style={styles.orderDetails}>
                                <strong>{order.customerName}</strong> ordered {order.quantity} of <strong>{order.product}</strong>
                                for ${order.price || 'N/A'} on <span style={styles.date}>{formattedDate}</span> at {order.time || 'N/A'}
                            </div>
                            <div style={styles.buttonContainer}>
                                <button
                                    onClick={() => handleEdit(order)}
                                    style={{ ...styles.button, backgroundColor: '#f39c12' }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(order._id)}
                                    style={{ ...styles.button, backgroundColor: '#e74c3c' }}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Orders;
