import { ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { FC } from 'react';

import styles from '../../styles/UI/UserCard.module.css';

interface Props {
  user: {
    pseudonym: string;
    avatar: string;
    job: string;
  };
}

const UserCard: FC<Props> = ({ user }) => {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <img src="https://picsum.photos/128/128" alt={`Avatar de ${user.pseudonym}`} />
      </div>
      <div>
        <dt className={`subtitle ${styles.title}`}>{user.pseudonym}</dt>
        <dd className={`subtitle ${styles.subtitle}`}>{user.job}</dd>
      </div>
      <div className={styles.link}>
        <Link href={`/profile/${user.pseudonym}`}>
          <a>
            <ChevronRightIcon />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
