const Expense = require('../models/Expense');

// Create a new expense
exports.createExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    
    const expense = await Expense.create({
      amount,
      category,
      description,
      date: date || new Date()
    });
    
    res.status(201).json({
      success: true,
      data: expense
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      order: [['date', 'DESC']]
    });
    
    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get a single expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);
    
    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: expense
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update an expense
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, description, date } = req.body;
    
    const expense = await Expense.findByPk(id);
    
    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found'
      });
    }
    
    await expense.update({
      amount: amount !== undefined ? amount : expense.amount,
      category: category !== undefined ? category : expense.category,
      description: description !== undefined ? description : expense.description,
      date: date !== undefined ? date : expense.date
    });
    
    res.status(200).json({
      success: true,
      data: expense
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);
    
    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found'
      });
    }
    
    await expense.destroy();
    
    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
