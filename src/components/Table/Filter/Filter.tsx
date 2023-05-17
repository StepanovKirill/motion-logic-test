import React from 'react';
import { Column, Table as ReactTable } from '@tanstack/react-table';

import styles from './Filter.module.scss';

interface FilterProps {
  column: Column<any, any>;
  table: ReactTable<any>;
}

function Filter({ column, table }: FilterProps) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const onMinChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]]),
    [column],
  );

  const onMaxChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value]),
    [column],
  );

  const onFilterChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => column.setFilterValue(e.target.value),
    [column],
  );

  return typeof firstValue === 'number' ? (
    <div className={styles.searchGroup}>
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={onMinChange}
        placeholder="min"
        className="input"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={onMaxChange}
        placeholder="max"
        className="input"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={onFilterChange}
      placeholder="Искать по..."
      className="input"
    />
  );
}

export default Filter;
