import React from 'react';
import { ColumnDef, Row, flexRender, useReactTable } from '@tanstack/react-table';

import { defaultOptions } from '../options';
import Filter from '../Filter/Filter';
import TableFooter from '../TableFooter/TableFooter';

interface TableWithPaginationProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  onDelete: (row: Row<T>[]) => void;
  className?: string;
}

const TableWithPagination = <T extends object>({
  data,
  columns,
  onDelete,
  className = '',
}: TableWithPaginationProps<T>) => {
  const table = useReactTable<T>({
    data,
    columns,
    ...defaultOptions,
    enableRowSelection: true,
  });

  return (
    <>
      <table className={className}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <>
                      {/* eslint-disable-next-line */}
                      <div onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                      {header.column.getCanFilter() ? (
                        <Filter column={header.column} table={table} />
                      ) : null}
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <TableFooter table={table} onDelete={onDelete} />
    </>
  );
};

TableWithPagination.defaultProps = {
  className: '',
};

export default TableWithPagination;
