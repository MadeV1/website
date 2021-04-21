import Link from 'next/link';
import { FC } from 'react';
import styles from 'styles/UI/Button.module.css';

interface Props {
  url: string;
}

const ButtonLink: FC<Props> = ({ children, url }) => {
  return (
    <Link href={url}>
      <a className={`${styles.button} ${styles.inlined}`}>{children}</a>
    </Link>
  );
};

export default ButtonLink;
