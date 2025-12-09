// src/components/FilterPanel.jsx
const FilterPanel = ({
  regions,
  selectedRegions,
  onRegionsChange,
  genders,
  selectedGenders,
  onGendersChange,
  categories,
  selectedCategories,
  onCategoriesChange,
  paymentMethods,
  selectedPaymentMethods,
  onPaymentMethodsChange,
  selectedTags,
  onTagsChange,
  ageMin,
  ageMax,
  onAgeMinChange,
  onAgeMaxChange,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
}) => {
  // helper – single-select but stored as array to keep API same
  const handleSingleSelectChange = (e, current, setter) => {
    const val = e.target.value;
    if (!val) setter([]);
    else setter([val]);
  };

  return (
    <div className="filter-panel">
      {/* row 1 – dropdowns */}
      <div className="filter-row">
        <div className="filter-group-inline">
          <label className="filter-label">Customer Region</label>
          <select
            className="filter-select"
            value={selectedRegions[0] || ''}
            onChange={(e) => handleSingleSelectChange(e, selectedRegions, onRegionsChange)}
          >
            <option value="">All</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group-inline">
          <label className="filter-label">Gender</label>
          <select
            className="filter-select"
            value={selectedGenders[0] || ''}
            onChange={(e) => handleSingleSelectChange(e, selectedGenders, onGendersChange)}
          >
            <option value="">All</option>
            {genders.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group-inline">
          <label className="filter-label">Product Category</label>
          <select
            className="filter-select"
            value={selectedCategories[0] || ''}
            onChange={(e) =>
              handleSingleSelectChange(e, selectedCategories, onCategoriesChange)
            }
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group-inline">
          <label className="filter-label">Payment Method</label>
          <select
            className="filter-select"
            value={selectedPaymentMethods[0] || ''}
            onChange={(e) =>
              handleSingleSelectChange(
                e,
                selectedPaymentMethods,
                onPaymentMethodsChange
              )
            }
          >
            <option value="">All</option>
            {paymentMethods.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group-inline">
          <label className="filter-label">Tags</label>
          <input
            className="filter-input"
            type="text"
            placeholder="Tag"
            value={selectedTags.join(', ')}
            onChange={(e) =>
              onTagsChange(
                e.target.value
                  .split(',')
                  .map((t) => t.trim())
                  .filter(Boolean)
              )
            }
          />
        </div>
      </div>

      {/* row 2 – age & date range */}
      <div className="filter-row secondary-row">
        <div className="filter-group-inline">
          <label className="filter-label">Age Range</label>
          <div className="filter-range-group">
            <input
              className="filter-input"
              type="number"
              placeholder="Min"
              value={ageMin}
              onChange={(e) => onAgeMinChange(e.target.value)}
            />
            <span className="filter-range-separator">–</span>
            <input
              className="filter-input"
              type="number"
              placeholder="Max"
              value={ageMax}
              onChange={(e) => onAgeMaxChange(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-group-inline">
          <label className="filter-label">Date Range</label>
          <div className="filter-range-group">
            <input
              className="filter-input"
              type="date"
              value={dateFrom}
              onChange={(e) => onDateFromChange(e.target.value)}
            />
            <span className="filter-range-separator">–</span>
            <input
              className="filter-input"
              type="date"
              value={dateTo}
              onChange={(e) => onDateToChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
