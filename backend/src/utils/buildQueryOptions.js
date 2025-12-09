module.exports = function buildQueryOptions(query) {
  const {
    search = '',
    regions,
    genders,
    ageMin,
    ageMax,
    categories,
    tags,
    paymentMethods,
    dateFrom,
    dateTo,
    sortBy = 'date',
    sortOrder = 'desc',
    page = '1',
    limit = '10'
  } = query;

  const parseMulti = (value) =>
    value
      ? String(value)
          .split(',')
          .map((v) => v.trim())
          .filter(Boolean)
      : [];

  const options = {
    search: String(search).trim().toLowerCase(),

    regions: parseMulti(regions),
    genders: parseMulti(genders),
    categories: parseMulti(categories),
    tags: parseMulti(tags),
    paymentMethods: parseMulti(paymentMethods),

    ageRange: {
      min: ageMin ? Number(ageMin) : null,
      max: ageMax ? Number(ageMax) : null
    },

    dateRange: {
      from: dateFrom ? new Date(dateFrom) : null,
      to: dateTo ? new Date(dateTo) : null
    },

    sort: {
      by: ['date', 'quantity', 'customerName'].includes(sortBy)
        ? sortBy
        : 'date',
      order: sortOrder === 'asc' ? 'asc' : 'desc'
    },

    pagination: {
      page: Math.max(1, parseInt(page, 10) || 1),
      limit: Math.max(1, parseInt(limit, 10) || 10)
    }
  };

  if (
    options.ageRange.min !== null &&
    options.ageRange.max !== null &&
    options.ageRange.min > options.ageRange.max
  ) {
    const tmp = options.ageRange.min;
    options.ageRange.min = options.ageRange.max;
    options.ageRange.max = tmp;
  }

  if (
    options.dateRange.from &&
    options.dateRange.to &&
    options.dateRange.from > options.dateRange.to
  ) {
    const tmp = options.dateRange.from;
    options.dateRange.from = options.dateRange.to;
    options.dateRange.to = tmp;
  }

  return options;
};
