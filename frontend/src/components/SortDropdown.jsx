// src/components/SortDropdown.jsx
const SortDropdown = ({ sortBy, sortOrder, onSortByChange, onSortOrderChange }) => {
  return (
    <div className="sort-dropdown">
      <span className="sort-label">Sort by:</span>
      <select
        className="sort-select"
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
      >
        <option value="customerName">Customer Name (A–Z)</option>
        <option value="date">Date (Newest first)</option>
        <option value="quantity">Quantity</option>
      </select>

      <select
        className="sort-select order-select"
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value)}
      >
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
    </div>
  );
};

export default SortDropdown;
