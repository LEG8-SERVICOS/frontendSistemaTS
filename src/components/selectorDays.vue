<template>
  <div>
    <select v-model="periodoSelecionado">
      <option value="dia">Dia</option>
      <option value="mes">Mês</option>
      <option value="ano">Ano</option>
    </select>

    <input v-if="periodoSelecionado === 'dia'" type="date" v-model="dataSelecionada">
    <input v-if="periodoSelecionado === 'mes'" type="month" v-model="dataSelecionada">
    <input v-if="periodoSelecionado === 'ano'" type="number" v-model="anoSelecionado" placeholder="Ano">

    <button @click="carregarRegistros">Carregar Registros</button>

    <ul>
      <li v-for="registro in registros" :key="registro.id">{{ registro }}</li>
    </ul>
  </div>
</template>
  
<script>
import axios from "axios";
export default {
  data() {
    return {
      periodoSelecionado: 'dia',
      dataSelecionada: null,
      anoSelecionado: null,
      registros: [],
    };
  },
  methods: {
    carregarRegistros() {
      let url = 'http://localhost:8000/';
      if (this.periodoSelecionado === 'dia') {
        const [ano, mes, dia] = this.dataSelecionada.split('-');
        url = `http://localhost:8000/registrosLogs/dia/${ano}/${mes}/${dia}/`;
      } else if (this.periodoSelecionado === 'mes') {
        const [ano, mes] = this.dataSelecionada.split('-');
        url = `http://localhost:8000/registrosLogs/mes/${ano}/${mes}/`;
      } else if (this.periodoSelecionado === 'ano') {
        url = `http://localhost:8000/registrosLogs/ano/${this.anoSelecionado}/`;
      }

      axios.get(url)
        .then(response => {
          this.registros = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>
  