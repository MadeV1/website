import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthService, { RegisterPayload } from 'services/AuthService';
import ErrorService from 'services/ErrorService';
import PageStyles from 'styles/Pages/Registration.module.css';
import FormStyles from 'styles/UI/Form.module.css';

import Layout from '@/components/Partials/Layout';
import ButtonPlain from '@/components/UI/ButtonPlain';
import Card from '@/components/UI/Card';
import FlatInput from '@/components/UI/Form/FlatInput';

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

interface FormInputs {
  pseudonym: string;
  email: string;
  password: string;
  // eslint-disable-next-line camelcase
  password_confirmation: string;
}

const RegisterPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [emailErrors] = useState<Array<EmailError>>();
  const [pseudonymErrors] = useState<Array<PseudonymError>>();
  const [passwordErrors] = useState<Array<PasswordError>>();

  const onFormSubmit = async (data: RegisterPayload) => {
    await AuthService.register(data);
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
                <FlatInput
                  label="Nom d'utilisateur"
                  type="text"
                  required
                  {...register('pseudonym')}
                  validationError={
                    errors.pseudonym && `Votre nom d&apos;utilisateur doit contenir au minimum 3 caractères.`
                  }
                  submitErrors={pseudonymErrors && pseudonymErrors.map((err) => ErrorService[err.message])}
                />
                <FlatInput
                  label="Adresse mail"
                  type="email"
                  required
                  {...register('email')}
                  validationError={errors.email && `Veuillez renseigner une adresse email valide.`}
                  submitErrors={emailErrors && emailErrors.map((err) => ErrorService[err.message])}
                />
                <FlatInput
                  label="Mot de passe"
                  type="password"
                  required
                  {...register('password')}
                  validationError={
                    errors.password && `Ce champ est requis et doit être d&apos;une longueur minimale de 6 caractères.`
                  }
                  submitErrors={passwordErrors && passwordErrors.map((err) => ErrorService[err.message])}
                />
                <FlatInput
                  label="Confirmer le mot de passe"
                  type="password"
                  required
                  {...register('password_confirmation')}
                  validationError={
                    errors.password_confirmation &&
                    `Ce champ est requis et doit être d&apos;une longueur minimale de 6 caractères.`
                  }
                  submitErrors={[]}
                />
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
