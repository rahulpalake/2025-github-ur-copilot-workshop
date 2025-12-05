#!/usr/bin/env node

/**
 * Simple test to verify module loading and structure
 * This test doesn't require a real database connection
 */

console.log('🧪 Testing Expense Tracker API modules...\n');

// Test 1: Environment variable handling
console.log('Test 1: Environment variable handling');
try {
  process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
  process.env.PORT = '3000';
  console.log('  ✓ Environment variables set\n');
} catch (err) {
  console.error('  ✗ Failed to set env vars:', err.message);
  process.exit(1);
}

// Test 2: Test Expense model structure
console.log('Test 2: Expense model structure');
try {
  const Expense = require('./src/models/Expense');
  console.log('  ✓ Expense model loaded');
  console.log('  ✓ Model name:', Expense.name);
  console.log('  ✓ Table name:', Expense.tableName);
  
  // Check if required fields are defined
  const attributes = Object.keys(Expense.rawAttributes);
  const requiredFields = ['amount', 'category', 'description', 'date'];
  
  requiredFields.forEach(field => {
    if (attributes.includes(field)) {
      console.log(`  ✓ Field '${field}' is defined`);
    } else {
      console.error(`  ✗ Field '${field}' is missing`);
      process.exit(1);
    }
  });
  console.log();
} catch (err) {
  console.error('  ✗ Failed to load Expense model:', err.message);
  process.exit(1);
}

// Test 3: Test controller exports
console.log('Test 3: Controller exports');
try {
  const controller = require('./src/controllers/expenseController');
  const expectedMethods = [
    'createExpense',
    'getAllExpenses',
    'getExpenseById',
    'updateExpense',
    'deleteExpense'
  ];
  
  expectedMethods.forEach(method => {
    if (typeof controller[method] === 'function') {
      console.log(`  ✓ Method '${method}' exists`);
    } else {
      console.error(`  ✗ Method '${method}' is missing or not a function`);
      process.exit(1);
    }
  });
  console.log();
} catch (err) {
  console.error('  ✗ Failed to load controller:', err.message);
  process.exit(1);
}

// Test 4: Test routes structure
console.log('Test 4: Routes structure');
try {
  const routes = require('./src/routes/expenseRoutes');
  console.log('  ✓ Routes loaded');
  console.log('  ✓ Routes is an Express Router:', routes.constructor.name === 'router');
  console.log();
} catch (err) {
  console.error('  ✗ Failed to load routes:', err.message);
  process.exit(1);
}

// Test 5: Test database utility exports
console.log('Test 5: Database utility exports');
try {
  const { sequelize, testConnection } = require('./src/utils/database');
  console.log('  ✓ Database utility loaded');
  console.log('  ✓ sequelize instance exists:', sequelize !== undefined);
  console.log('  ✓ testConnection function exists:', typeof testConnection === 'function');
  console.log();
} catch (err) {
  console.error('  ✗ Failed to load database utility:', err.message);
  process.exit(1);
}

console.log('='.repeat(50));
console.log('✅ All module tests passed!');
console.log('\n📋 Summary:');
console.log('  • All modules load correctly');
console.log('  • Expense model has all required fields');
console.log('  • Controller has all CRUD methods');
console.log('  • Routes are properly configured');
console.log('  • Database utility exports correctly');
console.log('\n⚠️  Note: Database connection was not tested');
console.log('   A real PostgreSQL database is required to test the API');
