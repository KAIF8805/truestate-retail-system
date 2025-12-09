// src/components/SearchBar.jsx
const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        placeholder="Name, Phone no."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="search-icon" aria-hidden="true">
        🔍
      </span>
    </div>
  );
};

export default SearchBar;
