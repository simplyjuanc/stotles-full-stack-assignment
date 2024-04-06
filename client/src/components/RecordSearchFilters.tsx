import React, { useEffect } from 'react';
import { Input, Select, Space } from 'antd';
import { Buyer } from '../lib/Api';
import style from './RecordSearchFilters.module.css';

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
  // TODO Add filter UI elem from Ant Design
  // Use: "multiple selection" or "Select with search field" in https://ant.design/components/select

  console.log({ buyers });
  const [buyerLabels, setBuyerLabels] = React.useState<any>();

  useEffect(() => {
    setBuyerLabels(
      buyers.map((buyer) => ({
        label: buyer.name,
        value: buyer.id,
      }))
    );
  }, []);

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
  // console.log({ buyerLabels });
  return (
    <div className={style.filter_header}>
      <h2>Filters</h2>
      <div className={style.filter}>
        <h3>Content</h3>
        <Input
          placeholder='Search text...'
          value={filters.query}
          onChange={handleQueryChange}
          className={style.input}
        />
      </div>
      <div className={style.filter}>
        <h3>Buyer</h3>
        <Space direction='vertical' className={style.input}>
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
    </div>
  );
}

export default RecordSearchFilters;
