import React from 'react';
import { createPortal } from 'react-dom';

import styles from './Dropdown.module.scss';

interface DropdownProps {
  children: React.ReactNode;
}

function Dropdown({ children }: DropdownProps) {
  return createPortal(
    <ul className={styles.dropdownWrapper}>{children}</ul>,
    document.querySelector('#dropdownContainer') as HTMLElement,
  );
}

export default Dropdown;
