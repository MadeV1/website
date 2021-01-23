import Layout from '@/components/Partials/Layout';
import Button from '@/components/UI/Button';
import Head from 'next/head';

const Index = (): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Made - La plateforme de TP en ligne</title>
      </Head>

      <Layout>
        <main>
          <section>
            <h1>C&apos;est quoi Made ?</h1>
            <p>
              Trouve des idées de projet diverses, obtient les maquettes et la correction puis présente tous ça à tes
              futurs clients.
            </p>
            <Button>Voir les projets</Button>
          </section>

          <section>
            <h1>Espace communauté</h1>
            <p>
              Crée ton profil afin de poster tes projets et pouvoir être vu et contacté par d&apos;autres utilisateurs.
            </p>
            <Button>Créer mon profil</Button>
          </section>
        </main>
      </Layout>
    </div>
  );
};

export default Index;
