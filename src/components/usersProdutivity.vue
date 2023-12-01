<template>
  <div class="row-span-3 bg-white shadow rounded-lg">
    <div class="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
      <span>Funcionários c/ Atestado:</span>
      <button type="button"
        class="inline-flex justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-600"
        id="options-menu" aria-haspopup="true" aria-expanded="true">
        Horas Trabalhadas:
        <svg class="-mr-1 ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    <div class="overflow-y-auto" style="max-height: 24rem">
      <ul class="p-6 space-y-6">
        <li v-for="user in usuariosLeg8" :key="user.user_id" class="flex items-center mb-4">
          <div class="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />
          </div>
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center">
              <span class="py-2 px-4 font-semibold lg:table-cell">{{ user.nome_usuario }}</span>
            </div>
            <div class="ml-2 text-lg font-semibold">{{ user.horas_trabalhadas }}h</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      usuariosLeg8: []
    };
  },
  mounted() {
    axios.get('http://localhost:8000/apontamento-faltante-por-todos-usuarios/')
      .then(response => {
        this.usuariosLeg8 = response.data;
      })
      .catch(error => {
        console.error('Erro ao buscar os dados: ', error);
      });
  },
};
</script>
