import { FC } from 'react';

import CardStyles from '../../styles/UI/Card.module.css';

const Card: FC = ({ children }) => <div className={CardStyles.card}>{children}</div>;

export default Card;
