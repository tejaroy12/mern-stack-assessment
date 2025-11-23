const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

const dbg = (label, ...args) => {
  console.debug(`[DEBUG] ${new Date().toISOString()} - ${label}`, ...args);
};

router.get('/products', async (req, res) => {
  dbg('ENTER /products');

  try {
    const start = Date.now();
    const products = await productController.getAllProducts();
    const duration = Date.now() - start;

    dbg('Fetched products', { count: products?.length ?? 0, durationMs: duration });

    res.status(200).json(products);
  } catch (error) {
    console.error(`[ERROR] Error fetching products:`, error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get('/search', async (req, res) => {
  const searchTerm = req.query.q;
  dbg('ENTER /search', { q: searchTerm });

  try {
    const start = Date.now();
    const matchingProducts = await productController.searchProducts(searchTerm);
    const duration = Date.now() - start;

    dbg('Search completed', { results: matchingProducts.length, durationMs: duration });

    res.status(200).json(matchingProducts);
  } catch (error) {
    console.error(`[ERROR] Error searching products:`, error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
