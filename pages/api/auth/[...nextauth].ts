import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { User } from '@/types/Fetch/User';
import api from '@/utils/api';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Adresse mail', type: 'email', placeholder: 'Votre adresse mail' },
        password: { label: 'Mot de passe', type: 'password', placeholder: 'Votre mot de passe' },
      },
      async authorize(credentials) {
        try {
          const response = await api.post<User>('/login', { email: credentials.email, password: credentials.password });
          return { name: response.data.pseudonym, email: response.data.email };
        } catch (error) {
          if (error.response) {
            return null;
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/connexion',
  },
});
