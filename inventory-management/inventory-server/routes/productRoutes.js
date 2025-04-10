const express = require('express');
const router = express.Router();

// Accept the Product model as a parameter
const productRoutes = (Product) => {
  // GET all products
  router.get('/', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' });
    }
  });

  // POST a new product
  router.post('/', async (req, res) => {
    const { name, quantity, price } = req.body; // Include price if relevant

    const newProduct = new Product({ name, quantity, price });
    try {
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: 'Error adding product' });
    }
  });

  // PUT (update) a product by ID
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators
      });
      if (updatedProduct) {
        res.json(updatedProduct);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating product' });
    }
  });

  // DELETE a product by ID
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (deletedProduct) {
        res.json({ message: 'Product deleted successfully', deletedProduct });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error deleting product' });
    }
  });

  return router;
};

module.exports = productRoutes;
