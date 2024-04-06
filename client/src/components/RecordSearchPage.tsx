import { Button } from 'antd';
import React from 'react';
import api, { Buyer, ProcurementRecord } from '../lib/Api';
import RecordSearchFilters, { SearchFilters } from './RecordSearchFilters';
import RecordsTable from './RecordsTable';

/**
 * This component implements very basic pagination.
 * We fetch `PAGE_SIZE` records using the search endpoint which also returns
 * a flag indicating whether there are more results available or we reached the end.
 *
 * If there are more we show a "Load more" button which fetches the next page and
 * appends the new results to the old ones.
 *
 * Any change to filters resets the pagination state.
 *
 */

const PAGE_SIZE = 10;

function RecordSearchPage() {
  const [page, setPage] = React.useState<number>(1);
  const [buyers, setBuyers] = React.useState<Buyer[]>([]);
  const [searchFilters, setSearchFilters] = React.useState<SearchFilters>({
    query: '',
    buyers: [],
  });

  const [records, setRecords] = React.useState<
    ProcurementRecord[] | undefined
  >();
  const [reachedEndOfSearch, setReachedEndOfSearch] = React.useState(false);

  React.useEffect(() => {
    void (async () => {
      const response = await api.searchRecords({
        textSearch: searchFilters.query,
        buyers: searchFilters.buyers,
        limit: PAGE_SIZE,
        offset: PAGE_SIZE * (page - 1),
      });

      if (page === 1) {
        setRecords(response.records);
      } else {
        // append new results to the existing records
        setRecords((oldRecords) =>
          oldRecords ? [...oldRecords, ...response.records] : response.records
        );
      }
      setReachedEndOfSearch(response.endOfResults);
    })();
  }, [searchFilters, page]);

  React.useEffect(() => {
    void (async () => {
      const buyers = await api.getBuyers();
      if (!buyers) return;
      setBuyers(buyers);
    })();
  }, [api]);

  const handleChangeFilters = React.useCallback((newFilters: SearchFilters) => {
    setSearchFilters(newFilters);
    setPage(1); // reset pagination state
  }, []);

  const handleLoadMore = React.useCallback(() => {
    setPage((page) => page + 1);
  }, []);

  return (
    <>
      <RecordSearchFilters
        filters={searchFilters}
        buyers={buyers}
        onChange={handleChangeFilters}
      />
      {records && (
        <>
          <RecordsTable records={records} />
          {!reachedEndOfSearch && (
            <Button onClick={handleLoadMore}>Load more</Button>
          )}
        </>
      )}
    </>
  );
}

export default RecordSearchPage;
