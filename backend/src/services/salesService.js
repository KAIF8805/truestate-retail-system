const rawData = require('../data/sales.json');

// 🔥 SAFELY MAP CSV → JSON
const salesData = rawData.map((row, index) => {
  return {
    transactionId: row['Transaction ID'] || index + 1,

    customerId: row['Customer ID'] || '',
    customerName: row['Customer Name'] || '',
    phoneNumber: String(row['Phone Number'] || ''), // FIXED 🔥 always string
    gender: row['Gender'] || '',
    age: Number(row['Age'] || 0),
    customerRegion: row['Customer Region'] || '',
    customerType: row['Customer Type'] || '',

    productId: row['Product ID'] || '',
    productName: row['Product Name'] || '',
    brand: row['Brand'] || '',
    productCategory: row['Product Category'] || '',
    tags: row['Tags'] || '',

    quantity: Number(row['Quantity'] || 0),
    pricePerUnit: Number(row['Price per Unit'] || 0),
    discountPercentage: Number(row['Discount Percentage'] || 0),
    totalAmount: Number(row['Total Amount'] || 0),
    finalAmount: Number(row['Final Amount'] || 0),

    date: row['Date'] || '',
    paymentMethod: row['Payment Method'] || '',
    orderStatus: row['Order Status'] || '',
    deliveryType: row['Delivery Type'] || '',
    storeId: row['Store ID'] || '',
    storeLocation: row['Store Location'] || '',
    salespersonId: row['Salesperson ID'] || '',
    employeeName: row['Employee Name'] || ''
  };
});

// 🔍 SAFE SEARCH
function applySearch(data, search) {
  if (!search || search.trim() === '') return data;

  const query = search.toLowerCase();

  return data.filter((item) => {
    const name = String(item.customerName || '').toLowerCase();
    const phone = String(item.phoneNumber || '').toLowerCase(); // FIXED 🔥

    return name.includes(query) || phone.includes(query);
  });
}

// 🎯 FILTERS
function applyFilters(data, options) {
  const { regions, genders, categories, tags, paymentMethods, ageRange, dateRange } =
    options;

  return data.filter((item) => {
    if (regions.length && !regions.includes(item.customerRegion)) return false;
    if (genders.length && !genders.includes(item.gender)) return false;
    if (categories.length && !categories.includes(item.productCategory)) return false;
    if (paymentMethods.length && !paymentMethods.includes(item.paymentMethod))
      return false;

    // Age
    if (ageRange.min !== null && item.age < ageRange.min) return false;
    if (ageRange.max !== null && item.age > ageRange.max) return false;

    // Date range
    if (dateRange.from || dateRange.to) {
      const d = new Date(item.date);
      if (dateRange.from && d < new Date(dateRange.from)) return false;
      if (dateRange.to && d > new Date(dateRange.to)) return false;
    }

    // Tags
    if (tags.length) {
      const itemTags = String(item.tags || '')
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean);

      const hasAnyTag = tags.some((tag) =>
        itemTags.includes(String(tag).toLowerCase())
      );

      if (!hasAnyTag) return false;
    }

    return true;
  });
}

// 🔽 SORTING
function applySorting(data, sort) {
  const sorted = [...data];
  const { by, order } = sort;

  sorted.sort((a, b) => {
    let valA;
    let valB;

    if (by === 'date') {
      valA = new Date(a.date);
      valB = new Date(b.date);
    } else if (by === 'quantity') {
      valA = Number(a.quantity);
      valB = Number(b.quantity);
    } else if (by === 'customerName') {
      valA = String(a.customerName || '').toLowerCase();
      valB = String(b.customerName || '').toLowerCase();
    } else {
      return 0;
    }

    if (valA < valB) return order === 'asc' ? -1 : 1;
    if (valA > valB) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
}

// 📄 PAGINATION
function applyPagination(data, pagination) {
  const { page, limit } = pagination;
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;

  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * limit;
  const endIndex = startIndex + limit;

  const items = data.slice(startIndex, endIndex);

  return {
    items,
    page: safePage,
    limit,
    totalItems,
    totalPages
  };
}

// 🚀 FINAL EXPORT
exports.getSales = (options) => {
  let result = salesData;

  result = applySearch(result, options.search);
  result = applyFilters(result, options);
  result = applySorting(result, options.sort);

  const paginated = applyPagination(result, options.pagination);

  return {
    data: paginated.items,
    page: paginated.page,
    totalPages: paginated.totalPages,
    totalItems: paginated.totalItems,
    limit: paginated.limit,
    hasNextPage: paginated.page < paginated.totalPages,
    hasPrevPage: paginated.page > 1
  };
};
