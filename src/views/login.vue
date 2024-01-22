<template>
  <!-- component -->
  <img src="../assets/leg8.png" class="hidden md:block lg:hidden" alt="Imagem para dispositivos móveis" />
  <div class="h-screen md:flex">
    <div class="relative overflow-hidden md:flex w-1/2 bg-white i justify-around items-center hidden">
      <v-snackbar v-model="errorSnackbar" :timeout="timeout" color="error" bottom>
        Usuario ou senhas incorretos, verifique e tente novamente!
      </v-snackbar>

      <!-- Snackbar de Sucesso -->
      <v-snackbar v-model="successSnackbar" :timeout="timeout" color="success" bottom>
        Login bem-sucedido!
      </v-snackbar>
      <div>
        <img src="../assets/leg8.png" alt="" />
      </div>
      <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-orange-600 border-t-8"></div>
      <div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-orange-600 border-t-8"></div>
      <div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-orange-600 border-t-8"></div>
      <div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-orange-600 border-t-8"></div>
    </div>
    <div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
      <form class="bg-white mx-auto w-4/5 md:w-auto md:max-w-md" @submit.prevent="login">
        <div class="flex justify-center md:justify-start mb-10">
          <img src="../assets/leg8.png" alt="Logo" class="h-20 md:hidden" />
        </div>
        <h1 class="text-gray-800 font-bold text-2xl mb-1">Bem vindo!</h1>
        <p class="text-sm font-bold text-orange-600 mb-7">Leg8 Serviços</p>
        <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
          </svg>
          <input class="pl-2 outline-none border-none" type="text" name="" v-model="username" id=""
            placeholder="Username" />
        </div>
        <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd" />
          </svg>
          <input class="pl-2 outline-none border-none" type="password" v-model="password" name="" id=""
            placeholder="Senha" />
        </div>
        <button type="submit" class="block w-full bg-orange-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">
          Login
        </button>
        <span @click="forgotPassword" class="text-sm ml-2 hover:text-orange-500 cursor-pointer font-extralight">Esqueceu a
          senha ?</span>
      </form>
    </div>
  </div>
</template>
  
<script>
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      emailForPasswordReset: "",
      user: "",
      error: null,
      errorSnackbar: false,
      successSnackbar: false,
      timeout: 6000,
    };
  },
  methods: {
    async login() {
      try {
        const auth = getAuth();

        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.username,
          this.password
        );

        // Sucesso no login
        const user = userCredential.user;
        console.log('Usuário logado:', user);

        localStorage.setItem('photoURL', user.photoURL || '');
        localStorage.setItem('displayName', user.displayName || '');
        localStorage.setItem('email', user.email || '');
        localStorage.setItem('userId', user.uid);
        localStorage.setItem('user', JSON.stringify(user));

        // Redirecionar para a página de dashboard após o login bem-sucedido
        this.errorSnackbar = false;
        this.successSnackbar = true;
        setTimeout(() => {
          this.$router.push("/admin/dashboard");
        }, 1500);
      } catch (error) {
        this.error = error.message;
        this.errorSnackbar = true;
      }
    },
    async forgotPassword() {
      try {
        const auth = getAuth();

        // Enviar e-mail de redefinição de senha
        await sendPasswordResetEmail(auth, this.emailForPasswordReset);

        // Exibir Snackbar de sucesso
        this.errorSnackbar = false;
        this.successSnackbar = true;
        setTimeout(() => {
          this.successSnackbar = false;
        }, 5000);
      } catch (error) {
        // Exibir Snackbar de Erro
        this.error = error.message;
        this.errorSnackbar = true;
      }
    },
  },
};
</script>