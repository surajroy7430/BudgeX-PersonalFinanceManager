# BudgeX - A Personal Finance Manager

## Introduction

Budgex is a personal finance manager that helps users seamlessly track their income and expenses with visual insights. It simplifies budgeting by allowing users to add, delete and export financial transactions, and monitor their financial health through intuitive charts and dashboards. The app is built with modern React architecture and uses Firebase for real-time data management and authentication — making money tracking simple and secure.

## Project Type

- Frontend

## Deployed App

- Frontend: [https://budgexfinance.onrender.com](https://budgexfinance.onrender.com)
- Backend: Not Applicable – Used Firebase
- Database: Firebase Firestore

## Directory Structure

```pgsql
. 📂 BudgeX - Personal-Finance-Manager
└── 📂 public/
│ ├── 📄 auth-bg-img.jpg
│ ├── 📄 large-logo.png
│ ├── 📄 logo-text.png
│ ├── 📄 small-logo.png
└── 📂 src/
│ ├── 📄 App.jsx
│ ├── 📄 index.css
│ ├── 📄 main.jsx
│ └── 📂 Auth/
│ ├──── 📄 LoginPage.jsx
│ ├──── 📄 SignupPage.jsx
│ └── 📂 Cards/
│ └──── 📂 dashboard/
│ ├────── 📄 BalanceCard.jsx
│ ├────── 📄 TransactionInfoCard.jsx
│ └── 📂 app/
│ ├──── 📄 store.js
│ └── 📂 charts/
│ ├──── 📄 CustomLegend.jsx
│ ├──── 📄 CustomTooltip.jsx
│ ├──── 📄 FinancialAreaChart.jsx
│ ├──── 📄 FinancialBarChart.jsx
│ ├──── 📄 FinancialPieChart.jsx
│ ├──── 📄 FinancialTypeOverviewChart.jsx
│ └── 📂 components/
│ ├──── 📄 app-sidebar.jsx
│ └──── 📂 dashboard/
│ ├────── 📄 dashboard-logo.jsx
│ ├────── 📄 ExpenseTransactions.jsx
│ ├────── 📄 ExpensesOverview.jsx
│ ├────── 📄 FinancialOverview.jsx
│ ├────── 📄 IncomeOverview.jsx
│ ├────── 📄 IncomeTransactions.jsx
│ ├────── 📄 RecentTransactions.jsx
│ └──── 📂 expenses/
│ ├────── 📄 AddExpense.jsx
│ ├────── 📄 ExpenseForm.jsx
│ ├────── 📄 ExpensesList.jsx
│ └──── 📂 income/
│ ├────── 📄 AddIncome.jsx
│ ├────── 📄 IncomeForm.jsx
│ ├────── 📄 IncomeList.jsx
│ ├──── 📄 login-form.jsx
│ ├──── 📄 nav-main.jsx
│ ├──── 📄 nav-user.jsx
│ ├──── 📄 signup-form.jsx
│ ├──── 📄 theme-appearance.jsx
│ ├──── 📄 theme-toggler.jsx
│ ├──── 📄 transaction-form.jsx
│ └──── 📂 ui/"All ShadCN comps"
│ └── 📂 constants/
│ ├──── 📄 index.js
│ └── 📂 context/
│ ├──── 📄 AuthContext.jsx
│ ├──── 📄 ThemeContext.jsx
│ ├──── 📄 UserInfoContext.jsx
│ └── 📂 features/
│ └──── 📂 expenses/
│ ├────── 📄 expenseSlice.js
│ └──── 📂 income/
│ ├────── 📄 incomeSlice.js
│ └── 📂 firebase/
│ ├──── 📄 firebaseConfig.js
│ └── 📂 hooks/
│ ├──── 📄 useMobile.js
│ └── 📂 layouts/
│ ├──── 📄 DashboardLayout.jsx
│ ├──── 📄 Header.jsx
│ └── 📂 pages/
│ ├──── 📄 ExpensePage.jsx
│ ├──── 📄 HomePage.jsx
│ ├──── 📄 IncomePage.jsx
│ └──── 📂 extras/
│ ├────── 📄 Appearance.jsx
│ ├────── 📄 ErrorPage.jsx
│ ├────── 📄 LandingPage.jsx
│ └── 📂 routes/
│ ├──── 📄 AppRoutes.jsx
│ ├──── 📄 PrivateRoute.jsx
│ ├──── 📄 PublicRoute.jsx
├── 📄 index.html
├── 📄 components.json
├── 📄 jsconfig.json
├── 📄 package.json
└── 📄 vite.config.js
```

## Video Walkthrough of the Project

> A quick demo showcasing core features, dashboard, and UI interactions. [Watch here](https://youtu.be/Bq7OZgKVfEM)

## Video Walkthrough of the Codebase

> A walkthrough explaining the folder structure, Redux logic, and Firebase integration. [Watch here]()

## Features

- User authentication with Firebase
- Add, delete income and expenses
- Dynamic visualizations with Recharts (Pie, Bar, Area charts)
- Filter transactions by date (7, 30, 90 days)
- Light/Dark mode using ShadCN + Tailwind ThemeContext
- View recent transactions
- Download data as xlsx
- Fully responsive UI

## Design Decisions & Assumptions

- Firebase used as BaaS to eliminate backend complexity
- Redux Toolkit chosen for state management to ensure scalability
- Chart and Card components made reusable and filterable by date
- App supports only authenticated users, no guest access
- Prioritized clean UI/UX using ShadCN and Lucide icons
- Optimized to work best on modern browsers

## Installation & Getting Started

#### 1. Clone the repository:

```git
git clone https://github.com/surajroy7430/BudgeX-PersonalFinanceManager.git

cd BudgeX-PersonalFinanceManager
```

> make folder name `lowercase` if install shows error

#### 2. Install dependencies:

```base
npm install
```

#### 3. Set up Firebase & Environment Variables:

- Create a `.env.local` file and add your Firebase credentials:

```base
VITE_API_KEY=
VITE_APP_ID=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGE_SENDER_ID=
VITE_MEASUREMENT_ID=
```

#### 4. Run the application:

```base
npm run dev
```

## Usage

#### Dashboard

- Check `Financial Overview` - for all transactions
- Check `Recent Transactions` - for all transactions
- Last 5 transactions for income/expenses
- View Pie chart for income & Bar chart for expense

#### Income & Expenses

- View Area chart by time range **(3 Months, 30 Days, 7 Days)**
- Add Income / Add Expense / Download _(excel file)_

#### Appearance

- Change theme preference by selecting between Light and Dark mode

## Screenshot

![Dashboard](https://i.ibb.co/tT90JWJf/dashboard1.jpg)
![Recent Income](https://i.ibb.co/YFN2PvxV/dashboard2.jpg)
![Income Chart](https://i.ibb.co/4Rvy6sGd/income-chart.jpg)
![Recent Expenses](https://i.ibb.co/4RhkkJ3T/dashboard3.jpg)
![Expense Chart](https://i.ibb.co/qFg4nKcT/expense-chart.jpg)
![Appearnce](https://i.ibb.co/8ng9hH58/appearance.jpg)
![Add Transaction](https://i.ibb.co/zHL0SBBn/add-transactions.jpg)
![Exported Excel data](https://i.ibb.co/9H7CCXjw/exported-transactions.jpg)

## Credentials

- Use these test credentials for login:

```bash
Email: test@budgex.com
Password: 12345678
```

## APIs Used

- Firebase Authentication – for login/signup
- Firebase Firestore – for storing income/expenses
- Redux features - for add/get/delete/download income & expenses

## API Endpoints

No custom backend API used. Redux Toolkit & Firebase SDK handles data operations. Example:

```js
addDoc(collection(db, "users", user.uid, "income/expenses"), {
  source/category: "Food",
  amount: 500,
  date: "dd MMM yyyy",
  type: "income/expenses",
  paymentMethod: "Cash",
  icon: "emojis",
  descrription: "" // optional
});
```

## Technology Stack

- **React.js** – UI development
- **Vite** – Fast frontend bundler and development server
- **React Router Dom** – Client-side routing for seamless page navigation
- **Redux Toolkit** – State management
- **Firebase (Auth + Firestore)** – BaaS for authentication and real-time database
- **React Hook Form + Zod** – Form handling and schema-based validation
- **ShadCN UI + Tailwind CSS** – Modern UI components and utility-first styling with theme support
- **recharts** – Interactive data visualizations (Bar, Pie, Area charts)
- **xlsx** - Export financial data to Excel
- **React Emoji Picker** – Emoji selection for categories
- **Lucide Icons** – Icon set for clean, minimal UI
- **Render** – App deployment and hosting
