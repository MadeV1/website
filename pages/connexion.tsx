import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { getSession } from 'next-auth/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthService from 'services/AuthService';
import PageStyle from 'styles/Pages/Login.module.css';
import FormStyles from 'styles/UI/Form.module.css';

import Layout from '@/components/Partials/Layout';
import ButtonPlain from '@/components/UI/ButtonPlain';
import Card from '@/components/UI/Card';

interface FormInputs {
  email: string;
  password: string;
}

const ConnexionPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [loginError, setLoginError] = useState<string>();
  const router = useRouter();

  const onFormSubmit = async (data: FormInputs) => {
    const response = await AuthService.signIn(data.email, data.password);
    if (!response.ok) {
      setLoginError(response.error);
    } else {
      router.push('/profil');
    }
  };

  return (
    <>
      <Head>
        <title>Se connecter</title>
      </Head>
      <Layout>
        <div>
          <h1 className={`title ${PageStyle.title}`}>Connexion</h1>
          <form className={PageStyle.form} onSubmit={handleSubmit(onFormSubmit)}>
            <Card>
              {loginError && (
                <p className={FormStyles.textError}>Informations de connexion invalides. Veuillez réessayer</p>
              )}
              <div className={FormStyles.stackedInputs}>
                <label htmlFor="pseudonymInput" className={FormStyles.label}>
                  Email
                  <input
                    id="emailInput"
                    type="email"
                    {...register('email', { required: true, minLength: 3 })}
                    className={`${FormStyles.flatInputText}`}
                    required
                  />
                </label>
                <label htmlFor="passwordInput" className={FormStyles.label}>
                  Mot de passe
                  <input
                    id="passwordInput"
                    type="password"
                    {...register('password', { required: true, minLength: 6 })}
                    className={`${FormStyles.flatInputText} ${errors.password && FormStyles.flatInputTextError}`}
                    required
                  />
                  {errors?.password && (
                    <p className={FormStyles.textError}>
                      Ce champ est requis et doit être d&apos;une longueur minimale de 6 caractères.
                    </p>
                  )}
                </label>
                <ButtonPlain type="submit">Se connecter</ButtonPlain>
              </div>
            </Card>
          </form>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await getSession(context);

  if (user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default ConnexionPage;
