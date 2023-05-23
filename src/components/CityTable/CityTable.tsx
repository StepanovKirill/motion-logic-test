import React from 'react';
import { ColumnDef, Row } from '@tanstack/react-table';

import { CityT } from '../../types';
import styles from './CityTable.module.scss';
import TableWithPagination from '../Table/TableWithPagination/TableWithPagination';

interface CityTableProps<T> {
  data: T[];
  onDelete: (row: Row<T>[]) => void;
}

const CityTable = <T extends CityT>({ data, onDelete }: CityTableProps<T>) => {
  const columns: ColumnDef<T>[] = React.useMemo(
    () => [
      {
        id: 'delete',
        // eslint-disable-next-line react/no-unstable-nested-components
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        // eslint-disable-next-line react/no-unstable-nested-components
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      {
        header: 'Название города',
        accessorKey: 'name',
      },
      {
        header: 'Регион',
        accessorKey: 'subject',
      },
      {
        header: 'Население',
        accessorKey: 'population',
      },
      {
        header: 'Координаты',
        accessorFn: ({ coords }) => `${coords.lat} ш. ${coords.lon} д.`,
      },
    ],
    [],
  );

  return (
    <TableWithPagination
      className={styles.cityTable}
      data={data}
      columns={columns}
      onDelete={onDelete}
    />
  );
};

export default CityTable;
