import { FC } from 'react';

import ButtonLink from '@/components/UI/ButtonLink';

import styles from '../../styles/UI/ProjectCard.module.css';

interface Props {
  title: string;
  category: string;
  resume: string;
  imageUrl: string;
}

const ProjectCard: FC<Props> = ({ title, category, resume, imageUrl }) => {
  return (
    <article className={styles.card}>
      <div className={styles.hero}>
        <img src={imageUrl} alt={`Aperçu du projet ${title}`} />
      </div>
      <header>
        <h1 className={`title ${styles.title}`}>{title}</h1>
        <p className={`subtitle ${styles.subtitle}`}>{category}</p>
      </header>
      <p className={`${styles.resume}`}>{resume}</p>
      <footer className={styles.actions}>
        <p>Difficile</p>
        <ButtonLink url="/projet/1">Voir le projet</ButtonLink>
      </footer>
    </article>
  );
};

export default ProjectCard;
