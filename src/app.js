const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize, testConnection } = require('./utils/database');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Status ping route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Expense Tracker API is running',
    timestamp: new Date().toISOString()
  });
});

// Mount expense routes
app.use('/api/expenses', expenseRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();
    
    // Sync Sequelize models (creates tables if they don't exist)
    await sequelize.sync({ alter: false });
    console.log('✓ Database models synchronized');
    
    // Start listening
    app.listen(PORT, () => {
      console.log(`✓ Server is running on port ${PORT}`);
      console.log(`✓ API available at http://localhost:${PORT}`);
      console.log(`✓ Status endpoint: http://localhost:${PORT}/`);
      console.log(`✓ Expenses endpoint: http://localhost:${PORT}/api/expenses`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
