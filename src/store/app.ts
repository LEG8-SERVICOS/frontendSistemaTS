import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null,
  }),
  actions: {
    setToken(token: any) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    setUsername(username: any) {
      this.username = username;
      localStorage.setItem('username', username);
    },
    clearToken() {
      this.token = null;
      this.username = null; 
      localStorage.removeItem('token');
      localStorage.removeItem('username'); 
    },
  },
});
