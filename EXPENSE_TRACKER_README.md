# Expense Tracker API

A RESTful API for tracking expenses built with Node.js, Express, and PostgreSQL via Sequelize.

## 📋 Features

- Create, read, update, and delete expenses
- Store expense details including amount, category, description, and date
- PostgreSQL database with Sequelize ORM
- CORS enabled for cross-origin requests
- Environment-based configuration
- Automatic database synchronization on startup

## 🏗️ Project Structure

```
expense-tracker-api/
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

## 📡 API Endpoints

### Status Check

**GET /** - Check API status
```bash
curl http://localhost:3000/
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

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Sequelize** - ORM for PostgreSQL
- **PostgreSQL** - Relational database
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing
- **nodemon** - Development auto-restart utility

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

## 🚧 Future Enhancements

- User authentication and authorization
- Expense categories management
- Search and filter capabilities
- Pagination for large datasets
- Budget tracking
- Analytics and reporting
- Data export functionality

## 📄 License

MIT
