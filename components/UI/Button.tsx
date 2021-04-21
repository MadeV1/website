import { FC } from 'react';
import style from 'styles/UI/Button.module.css';

import { ButtonProps } from '@/types/Props/ButtonProps';

const Button: FC<ButtonProps> = ({ children, type = 'button', onClick }) => {
  return (
    <button type={type} className={style.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
