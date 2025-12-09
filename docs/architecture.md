# Architecture

## Backend Architecture
- Entry point: src/index.js
- Routing layer: src/routes/salesRoutes.js
- Controller layer: src/controllers/salesController.js
- Service layer: src/services/salesService.js
- Utilities: src/utils/buildQueryOptions.js
- Data: src/data/sales.json

Main endpoint:
- GET /api/sales

Pipeline:
- buildQueryOptions -> applySearch -> applyFilters -> applySorting -> applyPagination

## Frontend Architecture
- Entry point: src/main.jsx
- Root component: src/App.jsx
- Components: SearchBar, FilterPanel, SortDropdown, TransactionTable, Pagination
- Hook: useSalesQuery
- Service: api.js
- Styles: styles/app.css
