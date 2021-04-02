import { NextPage } from 'next';
import Head from 'next/head';
import { useForm } from 'react-hook-form';

import Layout from '@/components/Partials/Layout';
import ButtonPlain from '@/components/UI/ButtonPlain';
import Card from '@/components/UI/Card';

import PageStyles from '../styles/Pages/Registration.module.css';
import FormStyles from '../styles/UI/Form.module.css';

interface FormInputs {
  pseudonym: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const RegisterPage: NextPage = () => {
  const { register } = useForm<FormInputs>();

  return (
    <>
      <Head>
        <title>S&apos;inscrire</title>
      </Head>
      <Layout>
        <div className={PageStyles.grid}>
          <h1 className={`title ${PageStyles.title}`}>Je veux m&apos;inscrire</h1>
          <p className={PageStyles.paragraph}>
            Tu auras désormais accès à diverses fonctionnalités comme par exemples créer un projet, un profil
            communautaire et participer à différents concours puis pouvoir avoir accès au forum.
          </p>
          <form className={PageStyles.form}>
            <Card>
              <div className={FormStyles.stackedInputs}>
                <label htmlFor="pseudonymInput" className={FormStyles.label}>
                  Pseudo
                  <input
                    id="pseudonymInput"
                    name="pseudonym"
                    type="text"
                    ref={register}
                    className={FormStyles.flatInputText}
                  />
                </label>
                <label htmlFor="mailInput" className={FormStyles.label}>
                  Adresse mail
                  <input id="mailInput" name="email" type="email" ref={register} className={FormStyles.flatInputText} />
                </label>
                <label htmlFor="passwordInput" className={FormStyles.label}>
                  Mot de passe
                  <input
                    id="passwordInput"
                    name="password"
                    type="password"
                    ref={register}
                    className={FormStyles.flatInputText}
                  />
                </label>
                <label htmlFor="confirmPasswordInput" className={FormStyles.label}>
                  Confirmation du mot de passe
                  <input
                    id="confirmPasswordInput"
                    name="passwordConfirm"
                    type="password"
                    ref={register}
                    className={FormStyles.flatInputText}
                  />
                </label>
              </div>
              <ButtonPlain type="submit">S&apos;inscrire</ButtonPlain>
            </Card>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default RegisterPage;
