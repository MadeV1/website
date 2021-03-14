import { FC } from 'react';

import PaginationStyles from '../../../styles/UI/Pagination.module.css';

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

const PaginationButton: FC<Props> = ({ onClick, children, disabled }) => {
  return (
    <button
      className={`${PaginationStyles.button} ${disabled ? PaginationStyles.selected : ''}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

export default PaginationButton;
