<template>
  <v-data-table :headers="headers" :items="userData" :items-per-page="5" class="elevation-1">
    <!-- Coluna do Nome do Usuário -->
    <template v-slot:item.email="{ item }">
      {{ item.email }}
    </template>

    <!-- Coluna das Horas Mensais -->
    <template v-slot:item.totalHorasTrabalhadasMes="{ item }">
      {{ item.totalHorasTrabalhadasMes }}
    </template>

    <!-- Coluna do Apontamento Faltante -->
    <template v-slot:item.horasFaltantesHoje="{ item }">
      {{ item.horasFaltantesHoje }}
    </template>

    <!-- Coluna das Horas Trabalhadas -->
    <template v-slot:item.totalHorasTrabalhadasHoje="{ item }">
      {{ item.totalHorasTrabalhadasHoje }}
    </template>

    <!-- Coluna da Produtividade Diária -->
    <template v-slot:item.produtividadeMediaDiaria="{ item }">
      <v-chip :color="getProdutividadeChipColor(item.produtividadeMediaDiaria)">
        {{ item.produtividadeMediaDiaria }}%
      </v-chip>
    </template>

    <!-- Coluna da Produtividade do Dia Anterior -->
    <template v-slot:item.produtividadeDiaAnterior="{ item }">
      <v-chip :color="getProdutividadeChipColor(item.produtividadeDiaAnterior)">
        {{ item.produtividadeDiaAnterior }}%
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      headers: [
        { title: 'Nome do Usuário', value: 'email' },
        { title: 'Horas Mensais', value: 'totalHorasTrabalhadasMes' },
        { title: 'Apontamento Faltante diário', value: 'horasFaltantesHoje' },
        { title: 'Horas Trabalhadas', value: 'totalHorasTrabalhadasHoje' },
        { title: 'Produtividade Diária', value: 'produtividadeMediaDiaria' },
        { title: 'Produtividade Dia Anterior', value: 'produtividadeDiaAnterior' },
      ],
      userData: [],
    };
  },
  methods: {
    getProdutividadeChipColor(produtividade) {
      if (produtividade < 50) {
        return 'red';
      } else if (produtividade >= 50 && produtividade <= 90) {
        return '#cc9900'; // Amarelo
      } else if (produtividade > 90) {
        return 'green';
      }
    },
    fetchData() {
      axios.get('http://localhost:8080/work-statistics-per-user')
        .then(response => {
          this.userData = response.data;
        })
        .catch(error => {
          console.error('Erro ao buscar dados: ', error);
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
