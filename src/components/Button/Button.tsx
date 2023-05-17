import React from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'empty' | 'filled';
  disabled?: boolean;
  onClick: () => void;
}

function Button({ children, onClick, disabled = false, variant = 'empty' }: ButtonProps) {
  const mergedClassName = clsx(
    variant === 'empty' ? styles.empty : styles.filled,
    disabled ? styles.disabled : '',
  );

  return (
    <button
      disabled={disabled}
      className={mergedClassName}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  variant: 'empty',
  disabled: false,
};

export default Button;
