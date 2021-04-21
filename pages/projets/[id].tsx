import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import PageStyles from 'styles/Pages/Projects/Show.module.css';

import Layout from '@/components/Partials/Layout';
import ButtonLink from '@/components/UI/ButtonLink';
import UserCard from '@/components/UI/UserCard';
import { Project } from '@/types/Project';
import api from '@/utils/api';

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('/projects');

  return {
    paths: data.map((project: Project) => ({
      params: {
        id: project.id.toString(),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { data } = await api.get<Project>(`/projects/${params?.id}`);
  return {
    props: {
      project: data,
    },
    revalidate: 1,
  };
};

const ShowProjectPage: NextPage = ({ project }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{project.name}</title>
      </Head>
      <Layout>
        <div className={PageStyles.grid}>
          <h1 className={PageStyles.title}>{project.name}</h1>
          <p className={PageStyles.description}>{project.body}</p>
          <div className={PageStyles.footer}>
            <div className={PageStyles.actions}>
              {project.sketch && <ButtonLink url={project.sketch}>Voir la maquette</ButtonLink>}
              {project.answer && (
                <Link href={project.answer}>
                  <a>Voir la correction</a>
                </Link>
              )}
            </div>

            {project.user && <UserCard user={project.user} />}
          </div>
          <div className={PageStyles.image}>
            <img src="https://picsum.photos/1200/400" alt="Project's overview" />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ShowProjectPage;
