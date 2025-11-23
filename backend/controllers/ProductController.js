const Product = require('../models/Product');
const sampleProducts = require('../data/sampleData');

exports.getAllProducts = async () => {
  return await Product.find({});
};

exports.searchProducts = async (searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return [];
  }

  const searchFilter = {
    name: {
      $regex: searchTerm,
      $options: 'i'
    }
  };

  return await Product.find(searchFilter).limit(5);
};

exports.seedDatabase = async () => {
  try {
    const count = await Product.countDocuments();

    if (count === 0) {
      await Product.insertMany(sampleProducts);
      console.log(`✨ Seeded ${sampleProducts.length} products into the database.`);
    } else {
      console.log(`ℹ️ Database already contains ${count} products. Skipping seeding.`);
    }
  } catch (error) {
    console.error('🚨 Error seeding database:', error.message);
  }
};
