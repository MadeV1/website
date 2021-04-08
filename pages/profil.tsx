import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { getSession, useSession } from 'next-auth/client';

import Layout from '@/components/Partials/Layout';

const ProfilePage: NextPage = () => {
  const [session, loading] = useSession();

  if (!loading && session?.user) {
    return (
      <>
        <Head>
          <title>{session?.user?.name}</title>
        </Head>
        <Layout>
          <h1>Profil de {session?.user?.name}</h1>
        </Layout>
      </>
    );
  }

  return (
    <>
      <p>Chargement...</p>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await getSession(context);

  if (!user) {
    return {
      redirect: {
        destination: '/connexion',
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default ProfilePage;
