import React from 'react';
import { Row } from '@tanstack/react-table';

import styles from './App.module.scss';
import CustomSearchableSelect from '../CustomSearchableSelect/CustomSearchableSelect';
import useGetCities from '../../utils/useGetCities';
import { OptionT } from '../CustomSearchableSelect/Option';
import Button from '../Button/Button';
import { CityT } from '../../types';
import CityTable from '../CityTable/CityTable';

function App() {
  const cities = useGetCities();

  const [tableResults, setTableResults] = React.useState<CityT[]>([]);

  const ignoredOptions = React.useMemo(
    () => tableResults.map((item) => item.id || ''),
    [tableResults],
  );

  const options: OptionT[] = React.useMemo(
    () =>
      cities.map((item) => ({
        id: item.id || '',
        value: item.name || '',
        label: `${item.name}, ${item.subject}` || '',
      })),
    [cities],
  );

  const addToTable = React.useCallback(
    (selectOption: OptionT) => {
      const findCity = cities.find((item) => item.id === selectOption.id);
      if (findCity && !tableResults.includes(findCity)) {
        setTableResults([...tableResults, findCity]);
      }
    },
    [cities, tableResults, setTableResults],
  );

  const clearTable = React.useCallback(() => {
    setTableResults([]);
  }, [setTableResults]);

  const handleDeleteRows = React.useCallback(
    (selectedRows: Row<CityT>[]) => {
      setTableResults(
        tableResults.filter(
          (res) => !selectedRows.find((item) => item.original.id === res.id),
        ),
      );
    },
    [tableResults],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchGroup}>
        <CustomSearchableSelect
          options={options}
          ignoredOptions={ignoredOptions}
          onChange={addToTable}
          placeholder="Введите город для поиска"
          label="Введите город для поиска"
        />
        <Button variant="filled" onClick={clearTable}>
          Очистить таблицу
        </Button>
      </div>
      <CityTable data={tableResults} onDelete={handleDeleteRows} />
    </div>
  );
}

export default App;
