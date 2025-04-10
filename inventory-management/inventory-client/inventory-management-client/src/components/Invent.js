import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Inventory() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(null); // Keeps track of the product being edited
  const [editName, setEditName] = useState('');
  const [editQuantity, setEditQuantity] = useState('');

  // Fetch existing products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products'); // Ensure this URL is correct
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  // Handle form submission for adding a product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !quantity) {
      alert("Please fill in both fields");
      return;
    }

    try {
      const newProduct = { name, quantity: parseInt(quantity) }; // Ensure quantity is an integer
      await axios.post('/api/products', newProduct);
      setName(''); // Clear input
      setQuantity(''); // Clear input
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error('Error adding product:', error);
      alert("Error adding product, please try again.");
    }
  };

  // Handle delete product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts(); // Refresh product list after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
      alert("Error deleting product, please try again.");
    }
  };

  // Handle edit product submission
  const handleUpdate = async (id) => {
    if (!editName || !editQuantity) {
      alert("Please fill in both fields");
      return;
    }

    try {
      const updatedProduct = { name: editName, quantity: parseInt(editQuantity) };
      await axios.put(`/api/products/${id}`, updatedProduct);
      setEditMode(null); // Exit edit mode
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error('Error updating product:', error);
      alert("Error updating product, please try again.");
    }
  };

  // Inline styles
  const styles = {
    container: {
      backgroundColor: '#f4f4f4',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '28px',
      color: '#333',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
    },
    input: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      width: '200px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#333',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    productsTitle: {
      fontSize: '24px',
      color: '#333',
      marginTop: '30px',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
    },
    listItem: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      marginBottom: '10px',
      backgroundColor: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    editForm: {
      display: 'flex',
      gap: '5px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Inventory Page</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <button type="submit" style={styles.button}>Add Product</button>
      </form>

      <h3 style={styles.productsTitle}>Existing Products</h3>
      <ul style={styles.list}>
        {products.map((product) => (
          <li key={product._id} style={styles.listItem}>
            {editMode === product._id ? (
              <div style={styles.editForm}>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Edit name"
                  style={styles.input}
                />
                <input
                  type="number"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(e.target.value)}
                  placeholder="Edit quantity"
                  style={styles.input}
                />
                <button style={styles.button} onClick={() => handleUpdate(product._id)}>Save</button>
                <button style={styles.button} onClick={() => setEditMode(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <span>{product.name}: <strong>{product.quantity}</strong></span>
                <div>
                  <button style={styles.button} onClick={() => {
                    setEditMode(product._id);
                    setEditName(product.name);
                    setEditQuantity(product.quantity);
                  }}>Edit</button>
                  <button style={styles.button} onClick={() => handleDelete(product._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inventory;


