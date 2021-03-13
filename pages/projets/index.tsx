import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Layout from '@/components/Partials/Layout';
import Button from '@/components/UI/Button';
import ProjectCard from '@/components/UI/ProjectCard';
import api from '@/utils/api';

import PageStyles from '../../styles/Pages/Projects/Index.module.css';
import ButtonStyles from '../../styles/UI/Button.module.css';
import FormStyles from '../../styles/UI/Form.module.css';

interface FormInputs {
  category: 'frontend' | 'backend' | 'fullstack';
  difficulty: 'easy' | 'medium' | 'hard';
  name: string;
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.BACKEND_HOST}/projects`);
  const projects = await res.json();

  return {
    props: {
      initialProjects: projects.data,
    },
  };
};

const buildSearchUrl = (name: string | null, difficulty: string | null, category: string | null) => {
  let url = `?`;

  if (typeof name === 'string') {
    url += `name=${name}&`;
  }
  if (typeof difficulty === 'string') {
    url += `difficulty=${difficulty}&`;
  }
  if (typeof category === 'string') {
    url += `category=${category}&`;
  }

  return url;
};

const IndexProjects = ({ initialProjects }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const [projects, setProjects] = useState(initialProjects);

  /* Searh bar */
  const { register, handleSubmit } = useForm<FormInputs>();

  const [difficulty, setDifficulty] = useState<string>(null);
  const [category, setCategory] = useState<string>(null);
  const [name, setName] = useState<string>(null);

  const onSubmit = (data) => {
    setName(data.name);
    setCategory(data.category);
    setDifficulty(data.difficulty);
  };

  useEffect(() => {
    const fetchAndUpdate = async () => {
      if (name === null && category === null && difficulty === null) {
        setProjects(initialProjects);
        return;
      }
      const response = await api.get(`projects${buildSearchUrl(name, difficulty, category)}`);
      setProjects(await response.data.data);
    };
    fetchAndUpdate();
  }, [name, difficulty, category, initialProjects]);

  return (
    <div>
      <Head>
        <title>Liste des derniers projets</title>
      </Head>

      <Layout>
        <h1>Rechercher un type de projet en toute simplicité</h1>

        <form className={PageStyles.searchBar} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="categoryInput" className={FormStyles.selectLabel}>
            <select id="categoryInput" ref={register} name="category" className={FormStyles.select}>
              <option value="frontend">Front-end</option>
              <option value="backend">Back-end</option>
              <option value="fullstack">Fullstack</option>
            </select>
          </label>
          <label htmlFor="difficultyInput" className={FormStyles.selectLabel}>
            <select id="difficultyInput" ref={register} name="difficulty" className={FormStyles.select}>
              <option value="easy">Facile</option>
              <option value="medium">Intermédiare</option>
              <option value="hard">Difficile</option>
            </select>
          </label>
          <label htmlFor="nameInput" className={PageStyles.nameLabel}>
            <input type="text" id="nameInput" ref={register} name="name" className={FormStyles.inputText} />
          </label>
          <Button type="submit">Chercher</Button>
        </form>

        <section className={PageStyles.grid}>
          {Array.isArray(projects) && projects.map((project) => <ProjectCard project={project} key={project.id} />)}
        </section>
      </Layout>
    </div>
  );
};

export default IndexProjects;
