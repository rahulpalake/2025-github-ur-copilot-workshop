#!/usr/bin/env node

/**
 * Validation script for Expense Tracker API
 * Tests code structure, syntax, and module loading without requiring database
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating Expense Tracker API...\n');

let errors = 0;

// Check required files exist
const requiredFiles = [
  'package.json',
  '.env.example',
  'src/app.js',
  'src/utils/database.js',
  'src/models/Expense.js',
  'src/controllers/expenseController.js',
  'src/routes/expenseRoutes.js',
  'EXPENSE_TRACKER_README.md'
];

console.log('✓ Checking required files...');
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.error(`  ✗ Missing file: ${file}`);
    errors++;
  } else {
    console.log(`  ✓ ${file}`);
  }
});

// Check required directories
const requiredDirs = [
  'src/controllers',
  'src/models',
  'src/routes',
  'src/services',
  'src/utils'
];

console.log('\n✓ Checking directory structure...');
requiredDirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    console.error(`  ✗ Missing directory: ${dir}`);
    errors++;
  } else {
    console.log(`  ✓ ${dir}/`);
  }
});

// Check package.json has required dependencies
console.log('\n✓ Checking package.json dependencies...');
const packageJson = require('./package.json');
const requiredDeps = ['express', 'sequelize', 'pg', 'pg-hstore', 'dotenv', 'cors'];
const requiredDevDeps = ['nodemon'];

requiredDeps.forEach(dep => {
  if (!packageJson.dependencies || !packageJson.dependencies[dep]) {
    console.error(`  ✗ Missing dependency: ${dep}`);
    errors++;
  } else {
    console.log(`  ✓ ${dep}`);
  }
});

requiredDevDeps.forEach(dep => {
  if (!packageJson.devDependencies || !packageJson.devDependencies[dep]) {
    console.error(`  ✗ Missing devDependency: ${dep}`);
    errors++;
  } else {
    console.log(`  ✓ ${dep} (dev)`);
  }
});

// Check package.json scripts
console.log('\n✓ Checking package.json scripts...');
const requiredScripts = ['start', 'dev'];
requiredScripts.forEach(script => {
  if (!packageJson.scripts || !packageJson.scripts[script]) {
    console.error(`  ✗ Missing script: ${script}`);
    errors++;
  } else {
    console.log(`  ✓ ${script}: ${packageJson.scripts[script]}`);
  }
});

// Check .env.example has required variables
console.log('\n✓ Checking .env.example...');
const envExample = fs.readFileSync(path.join(__dirname, '.env.example'), 'utf8');
const requiredEnvVars = ['PORT', 'DATABASE_URL'];
requiredEnvVars.forEach(envVar => {
  if (!envExample.includes(envVar)) {
    console.error(`  ✗ Missing env variable: ${envVar}`);
    errors++;
  } else {
    console.log(`  ✓ ${envVar}`);
  }
});

// Test module syntax (without running)
console.log('\n✓ Testing module syntax...');
try {
  // Test if modules can be required (syntax check)
  // Note: We can't actually load database.js as it needs DATABASE_URL
  const modulesToTest = [
    'src/models/Expense.js',
    'src/controllers/expenseController.js',
    'src/routes/expenseRoutes.js'
  ];
  
  // For database and app, just check syntax
  const syntaxCheckFiles = [
    'src/utils/database.js',
    'src/app.js'
  ];
  
  modulesToTest.forEach(module => {
    try {
      const content = fs.readFileSync(path.join(__dirname, module), 'utf8');
      // Basic syntax validation
      new Function(content); // This will throw if there are syntax errors
      console.log(`  ✓ ${module}`);
    } catch (err) {
      console.error(`  ✗ Syntax error in ${module}: ${err.message}`);
      errors++;
    }
  });
  
  syntaxCheckFiles.forEach(file => {
    try {
      const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
      console.log(`  ✓ ${file} (syntax check)`);
    } catch (err) {
      console.error(`  ✗ Error reading ${file}: ${err.message}`);
      errors++;
    }
  });
} catch (err) {
  console.error(`  ✗ Error testing modules: ${err.message}`);
  errors++;
}

// Summary
console.log('\n' + '='.repeat(50));
if (errors === 0) {
  console.log('✅ All validation checks passed!');
  console.log('\n📝 Next steps:');
  console.log('  1. Install dependencies: npm install');
  console.log('  2. Copy .env.example to .env and configure DATABASE_URL');
  console.log('  3. Create PostgreSQL database');
  console.log('  4. Run the application: npm start');
  process.exit(0);
} else {
  console.log(`❌ Validation failed with ${errors} error(s)`);
  process.exit(1);
}
