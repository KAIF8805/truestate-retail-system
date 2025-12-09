// src/components/TransactionTable.jsx
const TransactionTable = ({ data }) => {
  if (!data || !data.length) {
    return <div className="no-results">No transactions found.</div>;
  }

  return (
    <div className="table-wrapper">
      <table className="transaction-table">
        <thead>
          <tr>
            <th className="table-header-cell">Transaction ID</th>
            <th className="table-header-cell">Date</th>
            <th className="table-header-cell">Customer ID</th>
            <th className="table-header-cell">Customer Name</th>
            <th className="table-header-cell">Phone Number</th>
            <th className="table-header-cell">Gender</th>
            <th className="table-header-cell">Age</th>
            <th className="table-header-cell">Product Category</th>
            <th className="table-header-cell">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="table-row">
              <td>{row.transactionId || row.transactionID || '—'}</td>
              <td>{row.date}</td>
              <td>{row.customerId}</td>
              <td>{row.customerName}</td>
              <td className="phone-cell">
                {row.phoneNumber}
              </td>
              <td>{row.gender}</td>
              <td>{row.age}</td>
              <td>{row.productCategory}</td>
              <td>{row.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
