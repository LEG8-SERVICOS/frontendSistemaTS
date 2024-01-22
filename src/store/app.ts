import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null,
    userId: localStorage.getItem('userId') || null, // Adicione a propriedade userId
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    setUsername(username: string) {
      this.username = username;
      localStorage.setItem('username', username);
    },
    setUserId(userId: any) { // Nova ação para atualizar o userId
      this.userId = userId;
      localStorage.setItem('userId', userId);
    },
    clearToken() {
      this.token = null;
      this.username = null;
      this.userId = null; // Limpar também o userId
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userId'); // Remover o userId do localStorage
    },
  },
});
