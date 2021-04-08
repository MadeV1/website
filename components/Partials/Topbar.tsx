import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';
import { FC } from 'react';

import Button from '@/components/UI/Button';

import styles from '../../styles/Partials/Topbar.module.css';

const Topbar: FC = () => {
  const [session] = useSession();

  return (
    <nav className={`${styles.topbar} container`}>
      <div className={styles.brand}>
        <Link href="/">
          <a>Made</a>
        </Link>
      </div>
      <div className={styles.expand}>
        <input type="checkbox" className={styles.checkbox} id="toggler" />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={styles.toggler} htmlFor="toggler">
          <span className="sr-only">Ouvrir le menu</span>
          <div className={styles.togglerWrapper}>
            <span className={styles.togglerIcon} />
          </div>
        </label>
        <div className={styles.gray} />
        <div className={styles.links}>
          <ul>
            <li>
              <Link href="/projets">
                <a>Projets</a>
              </Link>
            </li>
            <li>
              <Link href="/profil">
                <a>Profil</a>
              </Link>
            </li>
            <li>
              <Link href="/forum">
                <a>Forum</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </li>
          </ul>
          <ul>
            {!session && (
              <>
                <li>
                  <Link href="/connexion">
                    <a>Se connecter</a>
                  </Link>
                </li>
                <li>
                  <Link href="/inscription">
                    <a className={styles.cta}>Créer un compte</a>
                  </Link>
                </li>
              </>
            )}
            {session && (
              <li>
                <Button onClick={() => signOut()}>Se déconnecter</Button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
