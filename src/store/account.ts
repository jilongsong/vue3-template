import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';

import { login } from '@/api/account';
import { LoginRequest } from '@/api/account/type';

const router = useRouter();

export interface AccountState {
  token: string;
  username: string;
}

export interface AccountGetters {
  role: (state: AccountState) => string;
}

export interface AccountActions {
  login: (data: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const useAccountStore = defineStore('account', {
  state: (): AccountState => ({
    username: '',
    token: '',
  }),
  actions: {
    async login({ username, password }: LoginRequest) {
      try {
        const response = await login({ username, password });
        this.username = response.username;
        this.token = response.token;
        console.log('success');
      } catch {
        console.log('error');
      }
    },
    async logout() {
      this.username = '';
      this.token = '';
      router.push('/login');
    },
  },
});

export default useAccountStore;
