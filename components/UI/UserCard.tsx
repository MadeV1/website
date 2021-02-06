import { ChevronRight } from 'heroicons-react';
import Link from 'next/link';
import { FC } from 'react';

import styles from '../../styles/UI/UserCard.module.css';

interface Props {
  user: {
    name: string;
    avatar: string;
    job: string;
  };
}

const UserCard: FC<Props> = ({ user }) => {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <img src={user.avatar} alt={`Avatar de ${user.name}`} />
      </div>
      <div>
        <dt className={`subtitle ${styles.title}`}>{user.name}</dt>
        <dd className={`subtitle ${styles.subtitle}`}>{user.job}</dd>
      </div>
      <div className={styles.link}>
        <Link href={`/profile/${user.name}`}>
          <a>
            <ChevronRight />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
