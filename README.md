# Retail Sales Management System

## 1. Overview
Retail Sales Management System for TruEstate SDE Intern assignment.
Supports full-text search, multi-select filters, sorting and pagination over a structured sales dataset.
Frontend and backend are clearly separated with a clean, modular architecture.

## 2. Tech Stack
- Backend: Node.js, Express
- Frontend: React (Vite)
- Data: JSON dataset converted from provided CSV(some of these)

## 3. Search Implementation Summary
- Full-text search on Customer Name and Phone Number.
- Case-insensitive includes match, implemented in salesService.applySearch.
- Search composes with filters and sorting because it is part of a single processing pipeline.

## 4. Filter Implementation Summary
- Multi-select filters: Customer Region, Gender, Product Category, Tags, Payment Method.
- Range filters: Age range, Date range.
- All query params are normalized in buildQueryOptions and applied in salesService.applyFilters.
- Filters work independently and in combination and preserve active search/sort state.

## 5. Sorting Implementation Summary
- Sort options: Date (default, newest first), Quantity, Customer Name (A–Z).
- Implemented in salesService.applySorting with stable comparison logic.
- Sorting always runs after search and filters, so it respects the active result set.

## 6. Pagination Implementation Summary
- Page size fixed at 10 items.
- Pagination handled server-side in salesService.applyPagination.
- Response includes page, totalPages, totalItems, hasNextPage, hasPrevPage.
- Frontend integrates with Next/Previous buttons while preserving search, filters and sorting.

## 7. Setup Instructions

### Backend
```bash
cd backend
npm install

# IMPORTANT: replace src/data/sales.json with JSON converted from the official CSV dataset.
# A small sample file is provided for local testing.

npm run dev
# runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install

# set backend URL if deployed:
# create .env file with:
# VITE_API_BASE_URL=http://localhost:5000

npm run dev
# runs on http://localhost:5173
```
"# truestate-retail-system" 
"# truestate-retail-system" 
