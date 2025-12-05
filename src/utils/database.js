const { Sequelize } = require('sequelize');
require('dotenv').config();

// Validate required environment variables
if (!process.env.DATABASE_URL) {
  console.error('✗ ERROR: DATABASE_URL environment variable is not set');
  console.error('  Please create a .env file based on .env.example');
  process.exit(1);
}

// Initialize Sequelize with DATABASE_URL from environment
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Set to console.log to see SQL queries
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connection established successfully');
  } catch (error) {
    console.error('✗ Unable to connect to the database:', error.message);
  }
};

module.exports = { sequelize, testConnection };
