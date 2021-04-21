import { FC } from 'react';
import styles from 'styles/UI/Button.module.css';

import { ButtonProps } from '@/types/Props/ButtonProps';

const ButtonPlain: FC<ButtonProps> = ({ children, type = 'button' }) => {
  return (
    <button type={type} className={`${styles.button} ${styles.plainButton}`}>
      {children}
    </button>
  );
};

export default ButtonPlain;
