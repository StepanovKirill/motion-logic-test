import React from 'react';
import { Row, RowSelectionState, Table } from '@tanstack/react-table';
import clsx from 'clsx';

import styles from './TableFooter.module.scss';
import Button from '../../Button/Button';

interface TableFooterProps<T> {
  table: Table<T>;
  onDelete: (row: Row<T>[]) => void;
}

const mergedInputClassname = clsx('input', styles.inputToPage);

const TableFooter = <T extends object>({ table, onDelete }: TableFooterProps<T>) => {
  const handleChangePageNumber = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      table.setPageIndex(Number(e.target.value) - 1 || 0);
    },
    [table],
  );

  const handleDeleteRows = React.useCallback(() => {
    const selectedRows = table.getSelectedRowModel().flatRows;
    onDelete(selectedRows);

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    table.setRowSelection((oldRowState: RowSelectionState) => ({} as RowSelectionState));
  }, [table, onDelete]);

  const handleGoToFirstPage = React.useCallback(() => {
    table.setPageIndex(0);
  }, [table]);

  const handleGoToPrevPage = React.useCallback(() => {
    table.previousPage();
  }, [table]);

  const handleGoToNextPage = React.useCallback(() => {
    table.nextPage();
  }, [table]);

  const handleGoToLastPage = React.useCallback(() => {
    table.setPageIndex(table.getPageCount() - 1);
  }, [table]);

  return (
    <>
      <div className={styles.buttonGroup}>
        <Button onClick={handleGoToFirstPage} disabled={!table.getCanPreviousPage()}>
          {'<<'}
        </Button>
        <Button onClick={handleGoToPrevPage} disabled={!table.getCanPreviousPage()}>
          {'<'}
        </Button>
        <Button onClick={handleGoToNextPage} disabled={!table.getCanNextPage()}>
          {'>'}
        </Button>
        <Button onClick={handleGoToLastPage} disabled={!table.getCanNextPage()}>
          {'>>'}
        </Button>
      </div>
      <div className={styles.buttonGroup}>
        <div className={styles.text}>
          {`Страница: ${
            table.getState().pagination.pageIndex + 1
          } из ${table.getPageCount()} | Перейти на страницу: `}
        </div>
        <div>
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={handleChangePageNumber}
            min={0}
            max={table.getPageCount()}
            className={mergedInputClassname}
          />
        </div>
      </div>
      <div className={styles.buttonGroup}>
        {`Выбрано строк: ${table.getSelectedRowModel().flatRows.length}`}
        <Button variant="filled" onClick={handleDeleteRows}>
          Удалить из таблицы
        </Button>
      </div>
    </>
  );
};

export default TableFooter;
