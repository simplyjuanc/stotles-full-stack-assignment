import React from 'react';
import { Input, Select, Space } from 'antd';
import { Buyer } from '../../lib/Api';
import style from './RecordSearchFilters.module.css';

export type SearchFilters = {
  query: string;
  buyers: string[];
};

type BuyerLabel = {
  label: string;
  value: string;
};

type Props = {
  filters: SearchFilters;
  buyers: Buyer[];
  onChange: (newFilters: SearchFilters) => void;
};

function RecordSearchFilters(props: Props) {
  const { filters, buyers, onChange } = props;
  const [buyerLabels, setBuyerLabels] = React.useState<BuyerLabel[]>();

  React.useEffect(() => {
    setBuyerLabels(
      buyers.map((buyer) => ({
        label: buyer.name,
        value: buyer.id,
      }))
    );
  }, [buyers]);

  const handleQueryChange = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      onChange({
        ...filters,
        query: e.currentTarget.value,
      });
    },
    [onChange, filters]
  );

  const handleBuyerChange = React.useCallback(
    (buyers: string[]) => {
      onChange({
        ...filters,
        buyers,
      });
    },
    [onChange, filters]
  );

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
