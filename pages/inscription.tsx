import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthService, { RegisterPayload } from 'services/AuthService';
import ErrorService from 'services/ErrorService';

import Layout from '@/components/Partials/Layout';
import ButtonPlain from '@/components/UI/ButtonPlain';
import Card from '@/components/UI/Card';

import PageStyles from '../styles/Pages/Registration.module.css';
import FormStyles from '../styles/UI/Form.module.css';

interface AdonisError {
  field: string;
  message: string;
  rule: string;
}

interface EmailError extends AdonisError {
  message: 'VALIDATION_EMAIL_FORMAT' | 'VALIDATION_EMAIL_UNIQUE' | 'VALIDATION_EMAIL_MAXLENGTH';
}

interface PseudonymError extends AdonisError {
  message: 'VALIDATION_PSEUDONYM_REQUIRED';
}

interface PasswordError extends AdonisError {
  message: 'VALIDATION_PASSWORD_MINLENGTH' | 'VALIDATION_PASSWORD_CONFIRMATION';
}

const RegisterPage: NextPage = () => {
  const { register, handleSubmit, errors } = useForm<RegisterPayload>();
  const [emailErrors, setEmailErrors] = useState<Array<EmailError>>();
  const [pseudonymErrors, setPseudonymErrors] = useState<Array<PseudonymError>>();
  const [passwordErrors, setPasswordErrors] = useState<Array<PasswordError>>();

  const onFormSubmit = async (data: RegisterPayload) => {
    try {
      await AuthService.register(data);
    } catch (error) {
      if (error.response) {
        setEmailErrors(error.response.data.errors.filter((err: AdonisError) => err.field === 'email'));
        setPseudonymErrors(error.response.data.errors.filter((err: AdonisError) => err.field === 'pseudonym'));
        setPasswordErrors(
          error.response.data.errors.filter(
            (err: AdonisError) => err.field === 'password' || err.field === 'password_confirmation'
          )
        );
      }
    }
  };

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
          <form className={PageStyles.form} onSubmit={handleSubmit(onFormSubmit)}>
            <Card>
              <div className={FormStyles.stackedInputs}>
                <label htmlFor="pseudonymInput" className={FormStyles.label}>
                  Pseudo
                  <input
                    id="pseudonymInput"
                    name="pseudonym"
                    type="text"
                    ref={register({ required: true, minLength: 3 })}
                    className={`${FormStyles.flatInputText} ${errors.pseudonym && FormStyles.flatInputTextError}`}
                    required
                  />
                  {errors.pseudonym && (
                    <p className={FormStyles.textError}>
                      Votre nom d&apos;utilisateur doit contenir au minimum 3 caractères.
                    </p>
                  )}
                  {pseudonymErrors && (
                    <ul className={FormStyles.textError}>
                      {pseudonymErrors.map((err) => (
                        <li>{ErrorService[err.message]}</li>
                      ))}
                    </ul>
                  )}
                </label>
                <label htmlFor="mailInput" className={FormStyles.label}>
                  Adresse mail
                  <input
                    id="mailInput"
                    name="email"
                    type="email"
                    ref={register({ required: true, maxLength: 255 })}
                    className={`${FormStyles.flatInputText} ${errors.email && FormStyles.flatInputTextError}`}
                    required
                  />
                  {errors.email && <p className={FormStyles.textError}>Veuillez renseigner une adresse email valide</p>}
                  {emailErrors && (
                    <ul className={FormStyles.textError}>
                      {emailErrors.map((err) => (
                        <li>{ErrorService[err.message]}</li>
                      ))}
                    </ul>
                  )}
                </label>
                <label htmlFor="passwordInput" className={FormStyles.label}>
                  Mot de passe
                  <input
                    id="passwordInput"
                    name="password"
                    type="password"
                    ref={register({ required: true, minLength: 6 })}
                    className={`${FormStyles.flatInputText} ${errors.password && FormStyles.flatInputTextError}`}
                    required
                  />
                  {errors?.password && (
                    <p className={FormStyles.textError}>
                      Ce champ est requis et doit être d&apos;une longueur minimale de 6 caractères.
                    </p>
                  )}
                  {passwordErrors && (
                    <ul className={FormStyles.textError}>
                      {passwordErrors.map((err) => (
                        <li>{ErrorService[err.message]}</li>
                      ))}
                    </ul>
                  )}
                </label>
                <label htmlFor="confirmPasswordInput" className={FormStyles.label}>
                  Confirmation du mot de passe
                  <input
                    id="confirmPasswordInput"
                    name="password_confirmation"
                    type="password"
                    ref={register({ required: true, minLength: 6 })}
                    className={`${FormStyles.flatInputText} ${
                      errors.password_confirmation && FormStyles.flatInputTextError
                    }`}
                    required
                  />
                  {errors?.password_confirmation && (
                    <p className={FormStyles.textError}>
                      Ce champ est requis et doit être d&apos;une longueur minimale de 6 caractères.
                    </p>
                  )}
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

export default RegisterPage;
