# Expense Tracker API

A full-stack Expense Tracker application with a REST API backend built with Node.js, Express, PostgreSQL via Sequelize, and an interactive frontend with real-time data visualization using Chart.js.

## 📋 Features

### Backend Features
- Create, read, update, and delete expenses
- Store expense details including amount, category, description, and date
- PostgreSQL database with Sequelize ORM
- CORS enabled for cross-origin requests
- Environment-based configuration
- Automatic database synchronization on startup

### Frontend Features
- 📊 **Interactive Dashboard** with real-time expense summaries
- 📈 **Data Visualization** with Chart.js
  - Pie/Doughnut chart showing expenses by category
  - Bar chart showing 7-day spending trends
- 💰 **Expense Management** with full CRUD operations
- 🔍 **Filter & Search** by category
- 🎨 **Modern UI** with smooth animations and responsive design
- 📱 **Mobile-Friendly** interface
- 🔔 **Toast Notifications** for user feedback
- ⚡ **Real-time Updates** after any operation

## 🏗️ Project Structure

```
expense-tracker-api/
├── public/                          # Frontend files
│   ├── css/
│   │   └── styles.css              # Application styles
│   ├── js/
│   │   └── app.js                  # Frontend logic and Chart.js integration
│   └── index.html                  # Main application page
├── src/
│   ├── controllers/
│   │   └── expenseController.js    # Business logic for expense operations
│   ├── models/
│   │   └── Expense.js              # Expense data model
│   ├── routes/
│   │   └── expenseRoutes.js        # API route definitions
│   ├── services/                    # (Reserved for business logic)
│   ├── utils/
│   │   └── database.js             # Sequelize database connection
│   └── app.js                      # Express app initialization
├── .env.example                     # Environment variables template
├── .gitignore                       # Git ignore rules
├── package.json                     # Project dependencies
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database (local or remote)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd 2025-github-ur-copilot-workshop
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file and configure your database connection:
   ```env
   PORT=3000
   DATABASE_URL=postgresql://username:password@localhost:5432/expense_tracker
   ```
   
   Replace `username`, `password`, and `expense_tracker` with your PostgreSQL credentials and database name.

4. **Create the database:**
   
   Make sure your PostgreSQL database exists:
   ```sql
   CREATE DATABASE expense_tracker;
   ```

### Running the Application

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000` (or the PORT specified in your .env file).

### Access the Application

Once the server is running:
- **Frontend Dashboard**: Open `http://localhost:3000` in your browser
- **API Status**: `http://localhost:3000/api/status`
- **API Endpoints**: `http://localhost:3000/api/expenses`

## 🎨 Frontend Features

### Dashboard
The main dashboard provides:
- **Summary Cards**: Total expenses, transaction count, and average expense
- **Category Chart**: Doughnut chart showing expense distribution by category
- **Trend Chart**: Bar chart displaying spending over the last 7 days

### Expense Management
- **Add Expenses**: Simple form with amount, category, description, and date
- **Edit Expenses**: Click edit button to modify existing expenses
- **Delete Expenses**: Remove expenses with confirmation dialog
- **Filter by Category**: Quick filter to view expenses by specific category

### Data Visualization with Chart.js
The application uses Chart.js for beautiful, interactive charts:
- **Category Distribution**: Visual breakdown of spending by category
- **7-Day Trend**: Track daily expenses over the past week
- **Real-time Updates**: Charts update automatically when data changes

## 📡 API Endpoints

### Status Check

**GET /** - Frontend Dashboard (HTML)
```bash
# Open in browser
http://localhost:3000
```

**GET /api/status** - Check API status (JSON)
```bash
curl http://localhost:3000/api/status
```

Response:
```json
{
  "status": "success",
  "message": "Expense Tracker API is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Expense Endpoints

All expense endpoints are prefixed with `/api/expenses`

#### Create Expense

**POST /api/expenses** - Create a new expense

Request body:
```json
{
  "amount": 50.99,
  "category": "Food",
  "description": "Grocery shopping",
  "date": "2024-01-15"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "amount": 50.99,
    "category": "Food",
    "description": "Grocery shopping",
    "date": "2024-01-15T00:00:00.000Z",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Get All Expenses

**GET /api/expenses** - Retrieve all expenses (sorted by date, newest first)

```bash
curl http://localhost:3000/api/expenses
```

Response:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "amount": 50.99,
      "category": "Food",
      "description": "Grocery shopping",
      "date": "2024-01-15T00:00:00.000Z",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### Get Expense by ID

**GET /api/expenses/:id** - Retrieve a specific expense

```bash
curl http://localhost:3000/api/expenses/1
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "amount": 50.99,
    "category": "Food",
    "description": "Grocery shopping",
    "date": "2024-01-15T00:00:00.000Z",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Update Expense

**PUT /api/expenses/:id** - Update an existing expense

Request body (all fields optional):
```json
{
  "amount": 55.99,
  "category": "Groceries",
  "description": "Weekly grocery shopping",
  "date": "2024-01-15"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "amount": 55.99,
    "category": "Groceries",
    "description": "Weekly grocery shopping",
    "date": "2024-01-15T00:00:00.000Z",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

#### Delete Expense

**DELETE /api/expenses/:id** - Delete an expense

```bash
curl -X DELETE http://localhost:3000/api/expenses/1
```

Response:
```json
{
  "success": true,
  "message": "Expense deleted successfully"
}
```

## 🗄️ Database Schema

### Expense Table

| Field       | Type    | Constraints                    |
|-------------|---------|--------------------------------|
| id          | INTEGER | Primary Key, Auto Increment    |
| amount      | FLOAT   | NOT NULL, >= 0                 |
| category    | STRING  | NOT NULL, Not Empty            |
| description | STRING  | NOT NULL, Not Empty            |
| date        | DATE    | NOT NULL, Default: NOW         |
| createdAt   | DATE    | Auto-generated                 |
| updatedAt   | DATE    | Auto-generated                 |

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Sequelize** - ORM for PostgreSQL
- **PostgreSQL** - Relational database
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing
- **nodemon** - Development auto-restart utility

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with animations and responsive design
- **JavaScript (ES6+)** - Frontend logic
- **Chart.js** - Data visualization library
- **Font Awesome** - Icon library

## 🔒 Database Connection

The application uses Sequelize ORM to connect to PostgreSQL. Connection configuration is managed through the `DATABASE_URL` environment variable.

On startup, the application:
1. Tests the database connection
2. Synchronizes models (creates tables if they don't exist)
3. Starts the Express server

## 📝 Notes

- The database tables are automatically created when you start the application for the first time
- All expenses are sorted by date in descending order (newest first)
- Timestamps (`createdAt`, `updatedAt`) are automatically managed by Sequelize
- CORS is enabled for all origins (configure as needed for production)
- No authentication is implemented in this version
- The frontend is a single-page application (SPA) that communicates with the API via AJAX
- Charts update in real-time as you add, edit, or delete expenses
- Category icons are displayed using emoji for better visual recognition

## 🚧 Future Enhancements

- User authentication and authorization
- Multiple user accounts with separate expense tracking
- Expense categories management (custom categories)
- Advanced search and filter capabilities (date ranges, amount ranges)
- Pagination for large datasets
- Budget tracking and alerts
- Analytics and reporting (monthly/yearly summaries)
- Data export functionality (CSV, PDF)
- Receipt image upload and storage
- Recurring expense support
- Currency conversion for international expenses

## 📄 License

MIT
