<template>
  <v-data-table :headers="headers" :items="userData" item-value="user_id" class="elevation-1">
    <!-- Coluna do usuário -->
    <template v-slot:item.user_id="{ item }">
      {{ item.user_id }}
    </template>

    <!-- Coluna do nome do usuário -->
    <template v-slot:item.nome_usuario="{ item }">
      {{ item.nome_usuario }}
    </template>

    <!-- Coluna das horas mensais -->
    <template v-slot:item.horas_mensais="{ item }">
      {{ item.horas_mensais }}
    </template>

    <!-- Coluna do apontamento faltante -->
    <template v-slot:item.apontamento_faltante="{ item }">
      {{ item.apontamento_faltante }}
    </template>

    <!-- Coluna das horas trabalhadas -->
    <template v-slot:item.horas_trabalhadas="{ item }">
      {{ item.horas_trabalhadas }}
    </template>

    <!-- Coluna da produtividade mensal -->
    <template v-slot:item.produtividade_mensal="{ item }">
      <v-chip :color="getChipColor(item.produtividade_mensal)">
        {{ item.produtividade_mensal }}
      </v-chip>
    </template>

    <!-- Coluna da produtividade diária -->
    <template v-slot:item.produtividade_diaria="{ item }">
      <v-chip :color="getChipColor(item.produtividade_diaria)">
        {{ item.produtividade_diaria }}
      </v-chip>
    </template>

    <!-- Coluna da produtividade do dia anterior -->
    <template v-slot:item.produtividade_dia_anterior="{ item }">
      <v-chip :color="getChipColor(item.produtividade_dia_anterior)">
        {{ item.produtividade_dia_anterior }}
      </v-chip>
    </template>
    <template v-slot:item.acao="{ item }">
      <ModalEditUsers v-model="isEditModalOpen" />
      <v-icon @click="deleteUser(item.user_id)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios';
import ModalEditUsers from '@/components/modals/modalEditUsers.vue';

export default {
  components: {
    ModalEditUsers,
  },
  data() {
    return {
      isEditModalOpen: false,
      headers: [
        { title: 'Nome do Usuário', value: 'nome_usuario' },
        { title: 'Horas Diarias', value: 'horas_mensais' },
        { title: 'Horas Trabalhadas', value: 'horas_trabalhadas' },
        { title: 'Produtividade Mensal', value: 'produtividade_mensal' },
        { title: 'Produtividade Diária', value: 'produtividade_diaria' },
        { title: 'Produtividade Dia Anterior', value: 'produtividade_dia_anterior' },
        { title: 'Ações', value: 'acao', sortable: false },
      ],
      userData: [],
    };
  },
  methods: {
    getChipColor(produtividade) {
      if (produtividade >= 0 && produtividade <= 20) {
        return 'red';
      } else if (produtividade > 20 && produtividade <= 70) {
        return '#cc9900';
      } else if (produtividade > 70 && produtividade <= 100) {
        return 'green';
      }
    },
  },
  mounted() {
    // Faça uma solicitação HTTP para o endpoint
    axios.get('http://localhost:8000/apontamento-faltante-por-todos-usuarios/')
      .then(response => {
        // Preencha o array userData com os dados retornados
        this.userData = response.data;
      })
      .catch(error => {
        console.error('Erro ao buscar dados: ', error);
      });
  },
};
</script>
