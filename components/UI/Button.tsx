import { FC } from 'react';

import style from '../../styles/UI/Button.module.css';

interface Props {
  type?: 'button' | 'submit' | 'reset';
}

const Button: FC<Props> = ({ children, type = 'button' }) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={style.button}>
      {children}
    </button>
  );
};

export default Button;
