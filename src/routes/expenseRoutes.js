const express = require('express');
const router = express.Router();
const {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense
} = require('../controllers/expenseController');

// Routes
router.post('/', createExpense);           // Create new expense
router.get('/', getAllExpenses);           // Get all expenses
router.get('/:id', getExpenseById);        // Get expense by ID
router.put('/:id', updateExpense);         // Update expense
router.delete('/:id', deleteExpense);      // Delete expense

module.exports = router;
