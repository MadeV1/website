import { XCircle } from 'heroicons-react';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Layout from '@/components/Partials/Layout';
import Button from '@/components/UI/Button';
import Pagination from '@/components/UI/Pagination/Pagination';
import ProjectCard from '@/components/UI/ProjectCard';
import usePagination from '@/hooks/usePagination';
import api from '@/utils/api';

import PageStyles from '../../styles/Pages/Projects/Index.module.css';
import FormStyles from '../../styles/UI/Form.module.css';

interface FormInputs {
  category: 'frontend' | 'backend' | 'fullstack';
  difficulty: 'easy' | 'medium' | 'hard';
  name: string;
}

interface RequestParams {
  name?: string;
  difficulty?: string;
  category?: string;
  perPage?: number;
  page: number;
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.BACKEND_HOST}/projects?perPage=9`);
  const projects = await res.json();

  return {
    props: {
      initialProjects: projects.data,
      meta: projects.meta,
    },
  };
};

const IndexProjects: NextPage = ({ initialProjects, meta }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [projects, setProjects] = useState(initialProjects);
  const [paginationMeta, setPaginationMeta] = useState(meta);
  const { page, prevPage, nextPage, goTo: goToPage, maxPages } = usePagination({
    initialPage: 1,
    maxPages: paginationMeta.last_page,
  });

  /* Searh bar */
  const { register, handleSubmit } = useForm<FormInputs>();

  const [difficulty, setDifficulty] = useState<string>(null);
  const [category, setCategory] = useState<string>(null);
  const [name, setName] = useState<string>(null);

  const onSubmit = (data) => {
    if (data.name) {
      setName(data.name);
    }
    if (data.category) {
      setCategory(data.category);
    }
    if (data.difficulty) {
      setDifficulty(data.difficulty);
    }
  };

  useEffect(() => {
    const fetchAndUpdate = async () => {
      const params: RequestParams = { page, perPage: 9 };
      if (name) {
        params.name = name;
      }
      if (difficulty) {
        params.difficulty = difficulty;
      }
      if (category) {
        params.category = category;
      }
      const response = await api.get('projects', { params });
      setProjects(await response.data.data);
      setPaginationMeta(await response.data.meta);
    };
    fetchAndUpdate();
  }, [name, difficulty, category, page, initialProjects, meta]);

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
              <option value="" defaultValue="">
                Catégorie
              </option>
              <option value="frontend">Front-end</option>
              <option value="backend">Back-end</option>
              <option value="fullstack">Fullstack</option>
            </select>
            {category && (
              <button type="button" onClick={() => setCategory(null)}>
                <XCircle />
              </button>
            )}
          </label>
          <label htmlFor="difficultyInput" className={FormStyles.selectLabel}>
            <select id="difficultyInput" ref={register} name="difficulty" className={FormStyles.select}>
              <option value="" defaultValue="">
                Difficulté
              </option>
              <option value="easy">Facile</option>
              <option value="medium">Intermédiare</option>
              <option value="hard">Difficile</option>
            </select>
            {difficulty && (
              <button type="button" onClick={() => setDifficulty(null)}>
                <XCircle />
              </button>
            )}
          </label>
          <label htmlFor="nameInput" className={PageStyles.nameLabel}>
            <input type="text" id="nameInput" ref={register} name="name" className={FormStyles.inputText} />
            {name && (
              <button type="button" onClick={() => setName(null)}>
                <XCircle />
              </button>
            )}
          </label>
          <Button type="submit">Chercher</Button>
        </form>

        <section className={PageStyles.grid}>
          {Array.isArray(projects) && projects.map((project) => <ProjectCard project={project} key={project.id} />)}
        </section>
        <section className={PageStyles.pagination}>
          <Pagination page={page} prevPage={prevPage} nextPage={nextPage} goToPage={goToPage} last={maxPages} />
        </section>
      </Layout>
    </div>
  );
};

export default IndexProjects;
