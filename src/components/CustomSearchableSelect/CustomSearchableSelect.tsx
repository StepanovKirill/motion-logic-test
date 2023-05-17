import React from 'react';

import searchOption from '../../utils/searchOption';
import Option, { OptionT } from './Option';
import Dropdown from './Dropdown';
import styles from './CustomSearchableSelect.module.scss';

interface CustomSelectProps {
  options: OptionT[];
  onChange: (selectOption: OptionT) => void;
  placeholder?: string;
}

function CustomSearchableSelect({
  options,
  onChange,
  placeholder = 'Search...',
}: CustomSelectProps) {
  const [searchText, setSearchText] = React.useState<string>('');
  const [searchResults, setSearchResults] = React.useState<OptionT[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const { target } = e;

      if (target instanceof Node && !rootRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleClose);

    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleClose);
    };
  }, []);

  const onSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);

      const searchString = e.target.value.trim();

      if (searchString.length >= 3) {
        setSearchResults(searchOption(searchString, options));
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    },
    [options],
  );

  const onSelect = React.useCallback(
    (selectOption: OptionT) => {
      setIsOpen(false);
      onChange(selectOption);
      setSearchText('');
    },
    [onChange],
  );

  const renderSearchResults = React.useMemo(
    () =>
      searchResults.map((item) => (
        <Option key={item.id || item.value} option={item} onSelect={onSelect} />
      )),
    [onSelect, searchResults],
  );

  return (
    <div className={styles.selectWrapper} ref={rootRef}>
      <input
        type="text"
        value={searchText}
        placeholder={placeholder}
        onInput={onSearchChange}
        className={styles.input}
      />
      <div id="dropdownContainer" className={styles.dropdownContainer}>
        {isOpen && <Dropdown>{renderSearchResults}</Dropdown>}
      </div>
    </div>
  );
}

CustomSearchableSelect.defaultProps = {
  placeholder: 'Search...',
};

export default CustomSearchableSelect;
