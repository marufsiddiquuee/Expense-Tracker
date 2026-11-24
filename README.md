# Expense Tracker

A small app built with **Vite + React + Tailwind CSS + shadcn/ui**.

## Features
- Home page: enter your name, then continue to your expenses
- Add and delete expenses with a category
- Live total, saved in `localStorage`

## React Hooks used
- `useState`: name, form inputs, expense list
- `useEffect`: saves expenses to localStorage, updates the page title, redirects if no name is set
- `useNavigate`: moves between `/` and `/expenses`

## Run
```bash
npm install
npm run dev
```
