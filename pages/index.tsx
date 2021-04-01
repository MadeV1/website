import Head from 'next/head';

import Layout from '@/components/Partials/Layout';
import ButtonLink from '@/components/UI/ButtonLink';
import UserCard from '@/components/UI/UserCard';

import styles from '../styles/Pages/Homepage.module.css';

const Index = (): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Made - La plateforme de TP en ligne</title>
      </Head>

      <Layout>
        <section className={styles.twoColumnSection}>
          <div>
            <h1 className="title">C&apos;est quoi Made ?</h1>
            <p>
              Trouve des idées diverses de projet, obtient les maquettes et la correction puis présente tous ça à tes
              futurs clients.
            </p>
            <div className={styles.buttonWrapper}>
              <ButtonLink url="/projets">Voir les projets</ButtonLink>
            </div>
          </div>
          <div>
            <img src="img/design/drawings/projets.svg" alt="Tableau de posts-it" />
          </div>
        </section>

        <section className={`${styles.twoColumnSection} ${styles.gridReverse}`}>
          <div>
            <h1 className="title">Espace communauté</h1>
            <p>
              Crée ton profil afin de poster tes projets et pouvoir être vu et contacté par d&apos;autres utilisateurs.
            </p>
            <div className={styles.buttonWrapper}>
              <ButtonLink url="/profil">Créer mon profil</ButtonLink>
            </div>
          </div>
          <div className={styles.userCards}>
            <UserCard
              user={{ pseudonym: 'Mickael Ferri', job: 'UI Designer', avatar: 'https://www.blexar.com/avatar.png' }}
            />
            <UserCard
              user={{ pseudonym: 'Thomas Belo', job: 'Développeur', avatar: 'https://www.blexar.com/avatar.png' }}
            />
            <UserCard
              user={{ pseudonym: 'Sandra Saidi', job: 'Développeuse', avatar: 'https://www.blexar.com/avatar.png' }}
            />
          </div>
        </section>

        <section>
          <h1 className="title centered">Made c&apos;est aussi ça...</h1>
          <div className={styles.twoColumnSection}>
            <div className="centered">
              <div>
                <img src="/img/design/drawings/entraide.svg" alt="Mains qui se serrent" />
              </div>
              <h2 className="title">Une communauté d&apos;entraide</h2>
              <p>
                Nos utilisateurs sont eux-mêmes acteurs ! Ils créent des projets pour vous afin de vous aider en toute
                bienveillance.
              </p>
            </div>

            <div className="centered">
              <div>
                <img src="/img/design/drawings/apprentissage.svg" alt="Cible avec fléchette" />
              </div>
              <h2 className="title">Un endroit d&apos;apprentissage</h2>
              <p>Vous pouvez apprendre très simplement grâce aux projets fournis par la communauté et nous-même.</p>
            </div>
          </div>
        </section>

        <section className={styles.twoColumnSection}>
          <div>
            <h1 className="title">Nous contacter</h1>
            <p>
              Tu as besoin d&apos;aide pour réaliser des actions sur Made, des bus sont survenus subitements et tu
              aimerais nous en faire part ?
            </p>
            <form className={styles.form}>
              <textarea className={styles.contactInput} name="message" placeholder="Message" />
              <button className={styles.contactSubmit} type="submit">
                Envoyer
              </button>
            </form>
          </div>
          <div>
            <img src="/img/design/drawings/contact.svg" alt="Cible avec fléchette" />
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default Index;
