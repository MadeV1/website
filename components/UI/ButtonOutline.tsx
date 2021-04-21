import { FC } from 'react';
import styles from 'styles/UI/Button.module.css';

import { ButtonProps } from '@/types/Props/ButtonProps';

const ButtonOutline: FC<ButtonProps> = ({ children, type = 'button' }) => {
  return (
    <button type={type} className={`${styles.button} ${styles.outline}`}>
      {children}
    </button>
  );
};

export default ButtonOutline;
