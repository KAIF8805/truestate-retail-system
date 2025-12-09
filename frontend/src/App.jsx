// src/App.jsx
import { useMemo, useState } from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';
import TransactionTable from './components/TransactionTable';
import Pagination from './components/Pagination';
import StatsCards from './components/StatsCards';
import { useSalesQuery } from './hooks/useSalesQuery';

const App = () => {
  const [query, setQuery] = useState({
    search: '',
    regions: [],
    genders: [],
    categories: [],
    paymentMethods: [],
    tags: [],
    ageMin: '',
    ageMax: '',
    dateFrom: '',
    dateTo: '',
    sortBy: 'customerName',
    sortOrder: 'asc',
    page: 1,
  });

  const filterOptions = useMemo(
    () => ({
      regions: ['North', 'South', 'East', 'West', 'Central'],
      genders: ['Male', 'Female', 'Other'],
      categories: ['Electronics', 'Clothing', 'Beauty'],
      paymentMethods: ['Cash', 'UPI', 'Card', 'Debit Card', 'Credit Card', 'Net Banking', 'Wallet'],
    }),
    []
  );

  const { data, meta, loading, error } = useSalesQuery(query);

  const updateQuery = (patch) => {
    setQuery((prev) => ({
      ...prev,
      ...patch,
      page: 'page' in patch ? patch.page : 1,
    }));
  };

  // summary cards data – based on current page (enough for UI)
  const summary = useMemo(() => {
    if (!data || !data.length) {
      return {
        totalUnits: 0,
        totalAmount: 0,
        totalDiscount: 0,
      };
    }

    let totalUnits = 0;
    let totalAmount = 0;
    let totalDiscount = 0;

    data.forEach((row) => {
      totalUnits += Number(row.quantity || 0);
      totalAmount += Number(row.totalAmount || 0);
      const discount = Number(row.totalAmount || 0) - Number(row.finalAmount || 0);
      totalDiscount += discount;
    });

    return { totalUnits, totalAmount, totalDiscount };
  }, [data]);

  return (
    <div className="app-root">
      <div className="app-shell">
        {/* Top bar */}
        <header className="top-bar">
          <div className="top-bar-title">
            <h1>Sales Management System</h1>
            <span className="top-bar-subtitle">Retail sales overview</span>
          </div>
          <div className="top-bar-right">
            <SearchBar
              value={query.search}
              onChange={(val) => updateQuery({ search: val })}
            />
          </div>
        </header>

        <main className="main-area">
          <section className="content-card">
            {/* Filters row (like Figma – dropdowns + sort) */}
            <div className="filters-wrapper">
              <FilterPanel
                regions={filterOptions.regions}
                selectedRegions={query.regions}
                onRegionsChange={(val) => updateQuery({ regions: val })}
                genders={filterOptions.genders}
                selectedGenders={query.genders}
                onGendersChange={(val) => updateQuery({ genders: val })}
                categories={filterOptions.categories}
                selectedCategories={query.categories}
                onCategoriesChange={(val) => updateQuery({ categories: val })}
                paymentMethods={filterOptions.paymentMethods}
                selectedPaymentMethods={query.paymentMethods}
                onPaymentMethodsChange={(val) =>
                  updateQuery({ paymentMethods: val })
                }
                selectedTags={query.tags}
                onTagsChange={(val) => updateQuery({ tags: val })}
                ageMin={query.ageMin}
                ageMax={query.ageMax}
                onAgeMinChange={(val) => updateQuery({ ageMin: val })}
                onAgeMaxChange={(val) => updateQuery({ ageMax: val })}
                dateFrom={query.dateFrom}
                dateTo={query.dateTo}
                onDateFromChange={(val) => updateQuery({ dateFrom: val })}
                onDateToChange={(val) => updateQuery({ dateTo: val })}
              />

              <div className="filters-sort-right">
                <SortDropdown
                  sortBy={query.sortBy}
                  sortOrder={query.sortOrder}
                  onSortByChange={(val) => updateQuery({ sortBy: val })}
                  onSortOrderChange={(val) => updateQuery({ sortOrder: val })}
                />
              </div>
            </div>

            {/* Stats cards row */}
            <div className="stats-row">
              <StatsCards
                totalUnits={summary.totalUnits}
                totalAmount={summary.totalAmount}
                totalDiscount={summary.totalDiscount}
              />
            </div>

            {/* Table + pagination */}
            <div className="table-section">
              {loading && <div className="status">Loading...</div>}
              {error && <div className="status error">{error}</div>}

              {!loading && !error && (
                <>
                  <TransactionTable data={data} />
                  <Pagination
                    page={meta.page}
                    totalPages={meta.totalPages}
                    hasNextPage={meta.hasNextPage}
                    hasPrevPage={meta.hasPrevPage}
                    onPageChange={(p) => updateQuery({ page: p })}
                  />
                </>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
