import React from 'react';

import searchOption from '../../utils/searchOption';
import Option, { OptionT } from './Option';
import Dropdown from './Dropdown';
import styles from './CustomSearchableSelect.module.scss';

interface CustomSelectProps {
  options: OptionT[];
  onChange: (selectOption: OptionT) => void;
  placeholder?: string;
  label?: string;
  ignoredOptions?: string[];
}

function CustomSearchableSelect({
  options,
  onChange,
  placeholder = 'Search...',
  label = '',
  ignoredOptions = [],
}: CustomSelectProps) {
  const [searchText, setSearchText] = React.useState<string>('');
  const [searchResults, setSearchResults] = React.useState<OptionT[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const rootRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

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
        setSearchResults(
          searchOption(searchString, options).filter(
            (item) => !ignoredOptions.includes(item.id || ''),
          ),
        );
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    },
    [options, ignoredOptions],
  );

  const onSelect = React.useCallback(
    (selectOption: OptionT) => {
      setIsOpen(false);
      onChange(selectOption);
      inputRef.current?.focus();
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
      <label htmlFor="searchCity">{label}</label>
      <input
        id="searchCity"
        type="text"
        value={searchText}
        placeholder={placeholder}
        onInput={onSearchChange}
        className={styles.input}
        ref={inputRef}
        autoComplete="off"
      />
      <div id="dropdownContainer" className={styles.dropdownContainer}>
        {isOpen && <Dropdown>{renderSearchResults}</Dropdown>}
      </div>
    </div>
  );
}

CustomSearchableSelect.defaultProps = {
  placeholder: 'Search...',
  label: '',
  ignoredOptions: [],
};

export default CustomSearchableSelect;
