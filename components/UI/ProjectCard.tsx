import { FC } from 'react';
import styles from 'styles/UI/ProjectCard.module.css';

import ButtonLink from '@/components/UI/ButtonLink';
import { Project } from '@/types/Project';

interface Props {
  project: Project;
}

const ProjectCard: FC<Props> = ({ project }) => {
  const { id, name, category, body: content, difficulty } = project;

  return (
    <article className={styles.card}>
      <div className={styles.hero}>
        <img src="https://picsum.photos/200/300" alt={`Aperçu du projet ${name}`} />
      </div>
      <header>
        <h1 className={`title ${styles.title}`}>{name}</h1>
        <p className={`subtitle ${styles.subtitle}`}>{category?.name}</p>
      </header>
      <p className={`${styles.resume}`}>{`${content?.substr(0, 200)}...`}</p>
      <footer className={styles.actions}>
        <p className={styles.difficulty}>{difficulty}</p>
        <ButtonLink url={`/projets/${id}`}>Voir le projet</ButtonLink>
      </footer>
    </article>
  );
};

export default ProjectCard;
