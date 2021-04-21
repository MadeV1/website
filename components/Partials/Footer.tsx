import Link from 'next/link';
import { FC } from 'react';
import styles from 'styles/Partials/Footer.module.css';

const Footer: FC = () => (
  <footer className={`${styles.footer}`}>
    <div className="container">
      <div className={styles.brand}>
        <p>Made</p>
      </div>
      <div className={styles.links}>
        <section>
          <h1 className={styles.sectionTitle}>Pages</h1>
          <nav>
            <ul>
              <li>
                <Link href="/projets">
                  <a>Voir les projets</a>
                </Link>
              </li>
              <li>
                <Link href="/projects/create">
                  <a>Créer un projet</a>
                </Link>
              </li>
              <li>
                <Link href="/connexion">
                  <a>Se connecter</a>
                </Link>
              </li>
              <li>
                <Link href="/inscription">
                  <a>Créer un compte</a>
                </Link>
              </li>
            </ul>
          </nav>
        </section>
        <section>
          <h1 className={styles.sectionTitle}>Informations</h1>
          <nav>
            <ul>
              <li>
                <Link href="/mise-a-jour">
                  <a>Mises à jours</a>
                </Link>
              </li>
              <li>
                <Link href="/regles-de-confidentialites">
                  <a>Règles de confidentialités</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a>Contact</a>
                </Link>
              </li>
            </ul>
          </nav>
        </section>
      </div>
    </div>
  </footer>
);

export default Footer;
