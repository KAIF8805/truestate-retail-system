// src/components/Pagination.jsx
const Pagination = ({ page, totalPages, onPageChange, hasNextPage, hasPrevPage }) => {
  if (!totalPages || totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goTo = (p) => {
    if (p < 1 || p > totalPages) return;
    onPageChange(p);
  };

  return (
    <div className="pagination">
      <button
        className="page-btn page-btn-nav"
        disabled={!hasPrevPage}
        onClick={() => goTo(page - 1)}
      >
        ‹
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={`page-btn ${p === page ? 'page-btn-active' : ''}`}
          onClick={() => goTo(p)}
        >
          {p}
        </button>
      ))}

      <button
        className="page-btn page-btn-nav"
        disabled={!hasNextPage}
        onClick={() => goTo(page + 1)}
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;
