import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Reports() {
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const calculateReports = (orders) => {
        // Calculate Total Orders
        const totalOrders = orders.length;

        // Calculate Total Revenue
        const totalRevenue = orders.reduce((acc, order) => acc + (order.price * order.quantity), 0);

        // Calculate Total Quantity Sold
        const totalQuantitySold = orders.reduce((acc, order) => acc + order.quantity, 0);

        // Identify Top Customers
        const customerOrders = {};
        orders.forEach(order => {
            customerOrders[order.customerName] = (customerOrders[order.customerName] || 0) + 1;
        });
        const topCustomers = Object.entries(customerOrders).sort((a, b) => b[1] - a[1]);

        // Identify Best-Selling Products
        const productSales = {};
        orders.forEach(order => {
            productSales[order.product] = (productSales[order.product] || 0) + order.quantity;
        });
        const bestSellingProducts = Object.entries(productSales).sort((a, b) => b[1] - a[1]);

        return {
            totalOrders,
            totalRevenue,
            totalQuantitySold,
            topCustomers,
            bestSellingProducts
        };
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/orders'); // Fetch all orders
                const report = calculateReports(response.data);
                setReportData(report);
            } catch (err) {
                setError('Error fetching report data');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <div>Loading reports...</div>;
    if (error) return <div>{error}</div>;

    // Inline styles
    // Updated inline styles with modern UI improvements
const styles = {
    container: {
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '40px auto',
        fontFamily: "'Roboto', sans-serif",
    },
    title: {
        fontSize: '32px',
        color: '#1e3d58',
        marginBottom: '25px',
        textAlign: 'center',
        borderBottom: '2px solid #e3f2fd',
        paddingBottom: '10px',
    },
    sectionTitle: {
        fontSize: '26px',
        color: '#1e3d58',
        marginTop: '30px',
        marginBottom: '15px',
        borderBottom: '1px solid #e3f2fd',
    },
    summary: {
        fontSize: '20px',
        color: '#333',
        margin: '10px 0',
        backgroundColor: '#f0f4f8',
        padding: '10px',
        borderRadius: '6px',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
        marginTop: '15px',
    },
    listItem: {
        padding: '15px',
        border: '1px solid #e0e0e0',
        borderRadius: '6px',
        marginBottom: '10px',
        backgroundColor: '#f7f9fc',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'box-shadow 0.2s',
    },
    listItemHover: {
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    metric: {
        fontSize: '18px',
        color: '#1976d2',
    },
};


    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Reports Page</h2>

            <h3 style={styles.sectionTitle}>Inventory Overview</h3>
            {/* Inventory overview logic could be added here */}

            <h3 style={styles.sectionTitle}>Order Summary</h3>
            <p style={styles.summary}>Total Orders: {reportData.totalOrders}</p>
            <p style={styles.summary}>Total Revenue: ${reportData.totalRevenue.toFixed(2)}</p>
            <p style={styles.summary}>Total Quantity Sold: {reportData.totalQuantitySold}</p>

            <h3 style={styles.sectionTitle}>Sales Trends</h3>
            {/* You can add charts for sales trends if necessary */}

            <h3 style={styles.sectionTitle}>Top Customers</h3>
            <ul style={styles.list}>
                {reportData.topCustomers.slice(0, 5).map(([customer, orders], index) => (
                    <li key={index} style={styles.listItem}>
                        {customer}: {orders} orders
                    </li>
                ))}
            </ul>

            <h3 style={styles.sectionTitle}>Best-Selling Products</h3>
            <ul style={styles.list}>
                {reportData.bestSellingProducts.slice(0, 5).map(([product, quantity], index) => (
                    <li key={index} style={styles.listItem}>
                        {product}: {quantity} sold
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Reports;
