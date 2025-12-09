import { useEffect, useState } from 'react';
import { fetchSales } from '../services/api';

export const useSalesQuery = (queryState) => {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchSales({
          search: queryState.search,
          regions: queryState.regions.join(','),
          genders: queryState.genders.join(','),
          categories: queryState.categories.join(','),
          tags: queryState.tags.join(','),
          paymentMethods: queryState.paymentMethods.join(','),
          ageMin: queryState.ageMin || '',
          ageMax: queryState.ageMax || '',
          dateFrom: queryState.dateFrom || '',
          dateTo: queryState.dateTo || '',
          sortBy: queryState.sortBy,
          sortOrder: queryState.sortOrder,
          page: queryState.page,
          limit: 10
        });

        if (!cancelled) {
          setData(res.data || []);
          setMeta({
            page: res.page,
            totalPages: res.totalPages,
            totalItems: res.totalItems,
            limit: res.limit,
            hasNextPage: res.hasNextPage,
            hasPrevPage: res.hasPrevPage
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to load data');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [JSON.stringify(queryState)]);

  return { data, meta, loading, error };
};
