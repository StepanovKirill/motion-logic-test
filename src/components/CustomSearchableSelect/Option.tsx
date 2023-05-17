import React from 'react';

import styles from './Option.module.scss';

export type OptionT = {
  value: string;
  label: string;
  id?: string;
};

interface OptionProps {
  option: OptionT;
  onSelect: (option: OptionT) => void;
}

function Option({ option, onSelect }: OptionProps) {
  const handleSelect = React.useCallback(() => {
    onSelect(option);
  }, [option, onSelect]);

  const handleKeyboardSelect = React.useCallback(
    (e: React.KeyboardEvent<HTMLLIElement>) => {
      if (e.key === 'Enter') {
        onSelect(option);
      }
    },
    [option, onSelect],
  );

  return (
    <li
      className={styles.option}
      role="option"
      aria-selected="false"
      onClick={handleSelect}
      onKeyDown={handleKeyboardSelect}
      tabIndex={0}
    >
      {option.label}
    </li>
  );
}

export default Option;
