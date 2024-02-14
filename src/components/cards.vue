<template>
  <section class="grid md:grid-cols-2 xl:grid-cols-4 gap-6 bg-gray-100">
    <div class="flex items-center p-8 bg-white shadow rounded-lg">
      <div
        class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6">
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <span class="block text-2xl font-bold">{{ calcularTotalHorasTrabalhadasNoMes() }}h</span>
        <span class="block text-gray-500">Total de horas trabalhadas no mes (hrs).</span>
      </div>
    </div>
    <div class="flex items-center p-8 bg-white shadow rounded-lg">
      <div
        class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
      <div>
        <span class="block text-2xl font-bold">{{ calcularMediaProdutividadeMensal() }}%</span>
        <span class="block text-gray-500">Produtividade média do mes (%).</span>
      </div>
    </div>
    <div class="flex items-center p-8 bg-white shadow rounded-lg">
      <div
        class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      </div>
      <div>
        <span class="inline-block text-2xl font-bold"> {{ calcularMediaProdutividadeDiaAnterior() }}%</span>
        <span class="block text-gray-500">Produtividade do dia anterior (%).</span>
      </div>
    </div>
    <div class="flex items-center p-8 bg-white shadow rounded-lg">
      <div
        class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <div>
        <span class="block text-2xl font-bold">{{ calcularMediaApontamentoFaltante() }}h</span>
        <span class="block text-gray-500">Média de Apontamento faltante de funcionário (hrs).</span>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      horasTrabalhadasNoMes: 0,
      produtividadeMediaDiaria: 0,
      produtividadeMediaMensal: 0,  
      apontamentoFaltante: 0
    };
  },
  mounted() {
    this.getWorkStatistics();
  },
  methods: {
    async getWorkStatistics() {
      try {
        const response = await axios.get('http://localhost:8080/work-statistics');
        const data = response.data;
        
        // Atualiza os dados na interface
        this.horasTrabalhadasNoMes = data.horasTrabalhadasPorMes.total;
        this.produtividadeMediaDiaria = data.produtividadeMediaDiaria;
        this.produtividadeMediaMensal = data.produtividadeMediaMensal;
        this.apontamentoFaltante = data.apontamentoFaltante;
        // Atualize outros dados conforme necessário
      } catch (error) {
        console.error('Erro ao obter estatísticas de trabalho:', error);
      }
    }
  }
}
</script>