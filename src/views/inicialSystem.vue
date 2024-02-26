<template>
  <div>
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>

    <body class="flex bg-gray-100 min-h-screen">
      <sidebar />
      <div v-if="!isLoading" class="flex-grow bg-gray-100 text-gray-800">
        <headerSearch />
        <main class="p-6 sm:p-10 space-y-6">
          <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <div class="mr-6">
              <h1 class="text-4xl font-semibold mb-2">
                Bem-vindo ao sistema Leg8
              </h1>
              <h2 class="text-gray-600 ml-0.5">
                Gerenciamento de registro de atividades.
              </h2>
            </div>
            <div class="flex flex-wrap items-start justify-end -mb-3">
              <modalRegisters />
              <modalAtestados />
            </div>
          </div>
          <cards />
          <section class="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
            <div
              class="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg sm: overflow-x-auto overflow-y-auto max-h-96">
              <tableRecenty />
            </div>
            <div class="flex items-center p-8 bg-white shadow rounded-lg">
              <div
                class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                  <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path fill="#fff"
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
              <div>
                <span class="block text-2xl font-bold">{{ quantRegistros }}</span>
                <span class="block text-gray-500">Numero de Registros Total</span>
              </div>
            </div>
            <div class="flex items-center p-8 bg-white shadow rounded-lg">
              <div
                class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-orange-600 bg-orange-100 rounded-full mr-6">
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <span class="block text-2xl font-bold">{{ quantAtestados }}</span>
                <span class="block text-gray-500">Numero de Atestados Total</span>
              </div>
            </div>
            <usersProdutivity />
            <topCampaings />
          </section>
        </main>
      </div>
    </body>
  </div>
</template>

<script>
import axios from 'axios';
import sidebar from '../components/sidebar.vue';
import headerSearch from "../components/headerSearch.vue";
import usersProdutivity from "../components/usersProdutivity.vue";
import topCampaings from "../components/TopCampaigns.vue";
import cards from "../components/cards.vue";
import modalRegisters from '../components/modals/modalRegistros.vue';
import modalAtestados from '../components/modals/modalAtestados.vue';
import tableRecenty from "../components/tableRecenty.vue";

export default {
  components: {
    sidebar,
    headerSearch,
    usersProdutivity,
    topCampaings,
    cards,
    tableRecenty,
    modalRegisters,
    modalAtestados
  },
  data() {
    return {
      userId: localStorage.getItem("userId"),
      toastMessage: "",
      quantAtestados: 0,
      quantRegistros: 0,
      isLoading: true,
    };
  },
  mounted() {
    this.isLoading = true;

    // Using Promise.all to wait for both requests to complete
    Promise.all([
      this.carregarOperadores(),
      axios.get('http://localhost:8080/attestations')
        .then(response => {
          this.quantAtestados = response.data.length;
        })
        .catch(error => {
          console.error('Erro ao obter atestados:', error);
        }),
      axios.get('http://localhost:8080/records')
        .then(response => {
          this.quantRegistros = response.data.length;
        })
        .catch(error => {
          console.error('Erro ao obter registros:', error);
        })
    ]).then(() => { 
      this.isLoading = false;
    });
  },
}
</script>

<style>
.ml-auto {
  margin-left: auto;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
