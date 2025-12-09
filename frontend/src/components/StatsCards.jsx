// src/components/StatsCards.jsx
const formatCurrency = (value) => {
  if (!value) return '₹0';
  return (
    '₹' +
    value.toLocaleString('en-IN', {
      maximumFractionDigits: 0,
    })
  );
};

const StatsCards = ({ totalUnits, totalAmount, totalDiscount }) => {
  return (
    <div className="stats-cards">
      <div className="stats-card">
        <span className="stats-label">Total units sold</span>
        <span className="stats-value">{totalUnits}</span>
      </div>

      <div className="stats-card">
        <span className="stats-label">Total Amount</span>
        <span className="stats-value">{formatCurrency(totalAmount)}</span>
      </div>

      <div className="stats-card">
        <span className="stats-label">Total Discount</span>
        <span className="stats-value">{formatCurrency(totalDiscount)}</span>
      </div>
    </div>
  );
};

export default StatsCards;
