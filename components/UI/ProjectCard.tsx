import { FC } from 'react';

import ButtonLink from '@/components/UI/ButtonLink';
import { Project } from '@/types/Project';

import styles from '../../styles/UI/ProjectCard.module.css';

interface Props {
  project: Project;
}

const ProjectCard: FC<Props> = ({ project }) => {
  const { id, name, category, body: content, imageUrl, difficulty } = project;

  return (
    <article className={styles.card}>
      <div className={styles.hero}>
        <img src={imageUrl} alt={`Aperçu du projet ${name}`} />
      </div>
      <header>
        <h1 className={`title ${styles.title}`}>{name}</h1>
        <p className={`subtitle ${styles.subtitle}`}>{category.name}</p>
      </header>
      <p className={`${styles.resume}`}>{`${content?.substr(0, 200)}...`}</p>
      <footer className={styles.actions}>
        <p className={styles.difficulty}>{difficulty}</p>
        <ButtonLink url={`/projet/${id}`}>Voir le projet</ButtonLink>
      </footer>
    </article>
  );
};

export default ProjectCard;
