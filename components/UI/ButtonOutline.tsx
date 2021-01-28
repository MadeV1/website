import { FC } from 'react';

import styles from '../../styles/UI/Button.module.css';

const ButtonOutline: FC = ({ children }) => {
  return (
    <button type="button" className={`${styles.button} ${styles.outline}`}>
      {children}
    </button>
  );
};

export default ButtonOutline;
