import { FC } from 'react';

import { ButtonProps } from '@/types/Props/ButtonProps';

import styles from '../../styles/UI/Button.module.css';

const ButtonPlain: FC<ButtonProps> = ({ children, type = 'button' }) => {
  return (
    <button type={type} className={`${styles.button} ${styles.plainButton}`}>
      {children}
    </button>
  );
};

export default ButtonPlain;
