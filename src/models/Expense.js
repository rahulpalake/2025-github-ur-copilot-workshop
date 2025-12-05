const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      isFloat: true
    }
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'expenses',
  timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = Expense;
