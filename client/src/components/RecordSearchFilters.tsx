import React from 'react';
import { Input, Select, Space, type SelectProps } from 'antd';
import { Buyer } from '../lib/Api';

export type SearchFilters = {
  query: string;
  buyer: string;
};

type Props = {
  filters: SearchFilters;
  buyers: Buyer[];
  onChange: (newFilters: SearchFilters) => void;
};

function RecordSearchFilters(props: Props) {
  const { filters, buyers, onChange } = props;
  const [buyerLabels, setBuyerValues] = React.useState(
    buyers.map((buyer) => {
      return {
        label: buyer.name,
        value: buyer.id,
      };
    })
  );

  // TODO add debouncer for the API call
  const handleQueryChange = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      onChange({
        ...filters,
        query: e.currentTarget.value,
      });
    },
    [onChange, filters]
  );

  const handleBuyerChange = React.useCallback((selection: string[]) => {
    // TODO add changing label length, so that when it's selected it gets truncated
    console.log({ selection });
    onChange({
      ...filters,
      buyer: selection.join(',') || '',
    });
    console.log({ buyer: filters.buyer });
  }, []);

  return (
    <div>
      <Input
        placeholder='Search text...'
        value={filters.query}
        onChange={handleQueryChange}
      />
      <Space direction='vertical'>
        <Select
          mode='multiple'
          allowClear
          style={{ width: '100%' }}
          placeholder='Please select buyer'
          onChange={handleBuyerChange}
          options={buyerLabels}
        />
      </Space>
    </div>
  );
}

export default RecordSearchFilters;
