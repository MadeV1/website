import { signIn } from 'next-auth/client';

import { User } from '@/types/Fetch/User';
import api from '@/utils/api';

export interface RegisterPayload {
  pseudonym: string;
  email: string;
  password: string;
  // eslint-disable-next-line camelcase
  password_confirmation: string;
}

export default {
  async register(data: RegisterPayload) {
    await api.post('/register', data);
    await api.post<User>('login', { email: data.email, password: data.password });
    return signIn('credentials', { email: data.email, password: data.password, callbackUrl: '/' });
  },
  async signIn(email: string, password: string) {
    return signIn('credentials', { email, password, redirect: false });
  },
};
