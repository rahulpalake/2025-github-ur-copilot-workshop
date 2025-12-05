// API Configuration
const API_URL = window.location.origin + '/api/expenses';

// State Management
let expenses = [];
let categoryChart = null;
let trendChart = null;

// Category Icons Map
const categoryIcons = {
    'Food': '🍔',
    'Transportation': '🚗',
    'Entertainment': '🎬',
    'Shopping': '🛍️',
    'Healthcare': '🏥',
    'Education': '📚',
    'Bills': '💡',
    'Other': '📦'
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    setDefaultDate();
});

// Initialize Application
async function initializeApp() {
    await loadExpenses();
    updateDashboard();
    initializeCharts();
}

// Setup Event Listeners
function setupEventListeners() {
    // Add Expense Form
    document.getElementById('expenseForm').addEventListener('submit', handleAddExpense);
    
    // Edit Expense Form
    document.getElementById('editExpenseForm').addEventListener('submit', handleEditExpense);
    
    // Modal Controls
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('cancelEdit').addEventListener('click', closeModal);
    
    // Filter Controls
    document.getElementById('filterCategory').addEventListener('change', filterExpenses);
    document.getElementById('refreshBtn').addEventListener('click', () => {
        loadExpenses();
        showToast('Data refreshed successfully', 'success');
    });
    
    // Close modal on outside click
    document.getElementById('editModal').addEventListener('click', (e) => {
        if (e.target.id === 'editModal') {
            closeModal();
        }
    });
}

// Set Default Date to Today
function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
}

// Load Expenses from API
async function loadExpenses() {
    try {
        showLoading();
        const response = await fetch(API_URL);
        const result = await response.json();
        
        if (result.success) {
            expenses = result.data;
            renderExpenses(expenses);
            updateDashboard();
            updateCharts();
        } else {
            showToast('Failed to load expenses', 'error');
        }
    } catch (error) {
        console.error('Error loading expenses:', error);
        showToast('Error loading expenses. Please try again.', 'error');
        renderEmptyState();
    }
}

// Add New Expense
async function handleAddExpense(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const expenseData = {
        amount: parseFloat(formData.get('amount')),
        category: formData.get('category'),
        description: formData.get('description'),
        date: formData.get('date')
    };
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expenseData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('Expense added successfully!', 'success');
            e.target.reset();
            setDefaultDate();
            await loadExpenses();
        } else {
            showToast('Failed to add expense: ' + result.error, 'error');
        }
    } catch (error) {
        console.error('Error adding expense:', error);
        showToast('Error adding expense. Please try again.', 'error');
    }
}

// Edit Expense
function editExpense(expense) {
    document.getElementById('editId').value = expense.id;
    document.getElementById('editAmount').value = expense.amount;
    document.getElementById('editCategory').value = expense.category;
    document.getElementById('editDescription').value = expense.description;
    document.getElementById('editDate').value = new Date(expense.date).toISOString().split('T')[0];
    
    openModal();
}

// Handle Edit Expense Submit
async function handleEditExpense(e) {
    e.preventDefault();
    
    const id = document.getElementById('editId').value;
    const formData = new FormData(e.target);
    const expenseData = {
        amount: parseFloat(formData.get('amount')),
        category: formData.get('category'),
        description: formData.get('description'),
        date: formData.get('date')
    };
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expenseData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('Expense updated successfully!', 'success');
            closeModal();
            await loadExpenses();
        } else {
            showToast('Failed to update expense: ' + result.error, 'error');
        }
    } catch (error) {
        console.error('Error updating expense:', error);
        showToast('Error updating expense. Please try again.', 'error');
    }
}

// Delete Expense
async function deleteExpense(id) {
    if (!confirm('Are you sure you want to delete this expense?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('Expense deleted successfully!', 'success');
            await loadExpenses();
        } else {
            showToast('Failed to delete expense: ' + result.error, 'error');
        }
    } catch (error) {
        console.error('Error deleting expense:', error);
        showToast('Error deleting expense. Please try again.', 'error');
    }
}

// Render Expenses List
function renderExpenses(expensesToRender) {
    const expensesList = document.getElementById('expensesList');
    
    if (expensesToRender.length === 0) {
        renderEmptyState();
        return;
    }
    
    expensesList.innerHTML = ''; // Clear existing content
    
    expensesToRender.forEach(expense => {
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';
        
        // Category icon
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'expense-category';
        categoryDiv.textContent = categoryIcons[expense.category] || '📦';
        
        // Expense details
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'expense-details';
        
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'expense-description';
        descriptionDiv.textContent = expense.description;
        
        const metaDiv = document.createElement('div');
        metaDiv.className = 'expense-meta';
        metaDiv.innerHTML = `
            <span><i class="fas fa-tag"></i> ${escapeHtml(expense.category)}</span>
            <span><i class="fas fa-calendar"></i> ${formatDate(expense.date)}</span>
        `;
        
        detailsDiv.appendChild(descriptionDiv);
        detailsDiv.appendChild(metaDiv);
        
        // Amount
        const amountDiv = document.createElement('div');
        amountDiv.className = 'expense-amount';
        amountDiv.textContent = `$${parseFloat(expense.amount).toFixed(2)}`;
        
        // Actions
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'expense-actions';
        
        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-edit';
        editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
        editBtn.addEventListener('click', () => editExpense(expense));
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Delete';
        deleteBtn.addEventListener('click', () => deleteExpense(expense.id));
        
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);
        
        // Append all elements
        expenseItem.appendChild(categoryDiv);
        expenseItem.appendChild(detailsDiv);
        expenseItem.appendChild(amountDiv);
        expenseItem.appendChild(actionsDiv);
        
        expensesList.appendChild(expenseItem);
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Render Empty State
function renderEmptyState() {
    const expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-inbox"></i>
            <h3>No expenses found</h3>
            <p>Start tracking your expenses by adding your first transaction above!</p>
        </div>
    `;
}

// Show Loading State
function showLoading() {
    const expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Loading expenses...</p>
        </div>
    `;
}

// Filter Expenses by Category
function filterExpenses() {
    const selectedCategory = document.getElementById('filterCategory').value;
    
    if (selectedCategory === '') {
        renderExpenses(expenses);
    } else {
        const filtered = expenses.filter(expense => expense.category === selectedCategory);
        renderExpenses(filtered);
    }
}

// Update Dashboard Summary
function updateDashboard() {
    const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    const count = expenses.length;
    const average = count > 0 ? total / count : 0;
    
    document.getElementById('totalExpenses').textContent = `$${total.toFixed(2)}`;
    document.getElementById('totalTransactions').textContent = count;
    document.getElementById('averageExpense').textContent = `$${average.toFixed(2)}`;
}

// Initialize Charts
function initializeCharts() {
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    const trendCtx = document.getElementById('trendChart').getContext('2d');
    
    // Category Chart (Pie Chart)
    categoryChart = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    '#4f46e5',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444',
                    '#8b5cf6',
                    '#06b6d4',
                    '#ec4899',
                    '#6b7280'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            return `${label}: $${value.toFixed(2)}`;
                        }
                    }
                }
            }
        }
    });
    
    // Trend Chart (Bar Chart)
    trendChart = new Chart(trendCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Expenses',
                data: [],
                backgroundColor: 'rgba(79, 70, 229, 0.8)',
                borderColor: 'rgba(79, 70, 229, 1)',
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Total: $${context.parsed.y.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });
    
    updateCharts();
}

// Update Charts with Current Data
function updateCharts() {
    if (!categoryChart || !trendChart) return;
    
    // Update Category Chart
    const categoryData = {};
    expenses.forEach(expense => {
        const category = expense.category;
        const amount = parseFloat(expense.amount);
        categoryData[category] = (categoryData[category] || 0) + amount;
    });
    
    const categories = Object.keys(categoryData);
    const amounts = Object.values(categoryData);
    
    categoryChart.data.labels = categories;
    categoryChart.data.datasets[0].data = amounts;
    categoryChart.update();
    
    // Update Trend Chart (Last 7 days)
    const last7Days = getLast7Days();
    const trendData = {};
    
    last7Days.forEach(date => {
        trendData[date] = 0;
    });
    
    expenses.forEach(expense => {
        const expenseDate = formatDate(expense.date);
        if (trendData.hasOwnProperty(expenseDate)) {
            trendData[expenseDate] += parseFloat(expense.amount);
        }
    });
    
    trendChart.data.labels = Object.keys(trendData);
    trendChart.data.datasets[0].data = Object.values(trendData);
    trendChart.update();
}

// Get Last 7 Days
function getLast7Days() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(formatDate(date.toISOString()));
    }
    return days;
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

// Modal Controls
function openModal() {
    document.getElementById('editModal').classList.add('active');
}

function closeModal() {
    document.getElementById('editModal').classList.remove('active');
}

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
