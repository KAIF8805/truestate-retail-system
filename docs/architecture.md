# Architecture Documentation  
Retail Sales Management System  

---

#  Backend Architecture

Backend built with **Node.js + Express**, structured into modular layers:

```
backend/
└── src/
    ├── controllers/
    ├── services/
    ├── routes/
    ├── utils/
    └── index.js
```

### **Controllers**
- Handle incoming HTTP requests  
- Validate inputs  
- Pass processing to service layer  
- Return final response  

### **Services**
- Core business logic  
- Apply Search, Filters, Sorting, Pagination  
- Work on in-memory dataset loaded from JSON  

### **Routes**
- Define REST API routes  
- Example: `/api/sales`  

### **Utils**
- Helper functions for parsing/filtering  
- Reusable logic (date parsing, numeric sanitization, etc.)  

### **Data Flow**
```
Client → Route → Controller → Service → Response → Client
```

### **Key Responsibilities**
- Efficient dataset processing (O(n) filtering)  
- Clean separation of concerns  
- Error handling middleware  
- CORS enabled for frontend compatibility  

---

#  Frontend Architecture

Frontend built with **React + Vite**.

```
frontend/
└── src/
    ├── components/
    ├── services/
    ├── hooks/
    ├── utils/
    ├── styles/
    └── App.jsx / main.jsx
```

### **Components**
- Reusable UI components  
- Filters, dropdowns, inputs, table rows  

### **Services**
- Axios-based API layer  
- `fetchSales()` interacts with backend  

### **Hooks**
- Custom state management (search, filters, sorting, pagination)  
- Centralized state updates  

### **Utils**
- Formatters, helpers (currency, number, dates)  

### **Styles**
- Centralized styling, responsive layout  

---

#  System Data Flow Diagram

```
User Action (UI)
      ↓
React State Updates
      ↓
Axios → Backend API (/api/sales)
      ↓
Search + Filter + Sort + Pagination (Service Layer)
      ↓
Filtered Dataset
      ↓
React Table Renders Updated Results
```

---

#  Folder Structure Summary

### **Backend**
- `controllers/` → HTTP handlers  
- `services/` → business logic  
- `routes/` → endpoint definitions  
- `utils/` → helper functions  

### **Frontend**
- `components/` → UI building blocks  
- `services/` → backend communication  
- `hooks/` → custom logic  
- `utils/` → helper utilities  
- `styles/` → styling  

---

#  Deployment Architecture

### **Backend: Render**
- Auto deploy on push  
- Public API endpoint  
- CORS enabled  
- Free plan sleep mode handled gracefully  

### **Frontend: Netlify**
- Auto build on push  
- Environment variables for API  
- Served as static assets  

---

#  Edge Case Handling

### **Backend**
- Missing fields  
- Invalid ranges  
- Incorrect date formats  
- Empty results  

### **Frontend**
- Displays "Network Error" or “No Results Found”  
- Keeps filters + sorting + pagination state in sync  

---

# ✔ Final Notes
- Architecture designed to be modular & scalable  
- Matches all requirements from TruEstate assignment  
- Clean code + clear separation of concerns  
