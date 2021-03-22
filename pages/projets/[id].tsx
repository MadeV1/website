import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import Layout from '@/components/Partials/Layout';
import ButtonLink from '@/components/UI/ButtonLink';
import UserCard from '@/components/UI/UserCard';

import PageStyles from '../../styles/Pages/Projects/Show.module.css';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`${process.env.BACKEND_HOST}/projects/${id}`);
  const project = await res.json();

  return {
    props: {
      project,
    },
  };
};

const ShowProjectPage: NextPage = ({ project }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
