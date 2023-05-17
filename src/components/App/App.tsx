import React from 'react';

import styles from './App.module.scss';
import CustomSearchableSelect from '../CustomSearchableSelect/CustomSearchableSelect';
import useGetCities from '../../utils/useGetCities';
import { OptionT } from '../CustomSearchableSelect/Option';

function App() {
  const cities = useGetCities();

  const options: OptionT[] = React.useMemo(
    () =>
      cities.map((item) => ({
        id: item.id,
        value: item.name || '',
        label: `${item.name}, ${item.subject}` || '',
      })),
    [cities],
  );

  const addToTable = React.useCallback(
    (selectOption: OptionT) => {
      console.log(cities.find((item) => item.id === selectOption.id));
    },
    [cities],
  );

  return (
    <div className={styles.wrapper}>
      <CustomSearchableSelect
        options={options}
        onChange={addToTable}
        placeholder="Введите город для поиска"
      />
    </div>
  );
}

export default App;
