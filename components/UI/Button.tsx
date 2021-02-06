import { FC } from 'react';

import style from '../../styles/UI/Button.module.css';

const Button: FC = ({ children }) => {
  return (
    <button type="button" className={style.button}>
      {children}
    </button>
  );
};

export default Button;
