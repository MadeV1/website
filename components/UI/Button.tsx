import { FC } from 'react';

import style from '../../styles/UI/Button.module.css';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const Button: FC<Props> = ({ children, type = 'button', onClick }) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={style.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
