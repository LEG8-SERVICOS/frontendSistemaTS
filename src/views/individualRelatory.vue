<template>
    <div>

        <body class="flex bg-gray-100 min-h-screen">
            <sidebarSearch />
            <v-card flat>
                <v-card-title class="d-flex align-center pe-2">
                    <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
                    Relatório de Produtividade/Dia

                    <v-spacer></v-spacer>

                    <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact"
                        label="Pesquisar Usuario" single-line flat hide-details variant="solo-filled"></v-text-field>
                </v-card-title>

                <v-divider></v-divider>

                <v-data-table :headers="headers" :items="userData" item-value="user_id" class="elevation-1">
                    <!-- Coluna do usuário -->
                    <template v-slot:item.user_id="{ item }">
                        {{ item.user_id }}
                    </template>

                    <!-- Coluna da data -->
                    <template v-slot:item.data="{ item }">
                        {{ item.data }}
                    </template>

                    <!-- Coluna do dia da semana -->
                    <template v-slot:item.dia_da_semana="{ item }">
                        {{ item.dia_da_semana }}
                    </template>

                    <template v-slot:item.horas_mensais="{ item }">
                        {{ item.horas_mensais }}
                    </template>

                    <template v-slot:item.horas_trabalhadas="{ item }">
                        {{ item.horas_trabalhadas }}
                    </template>

                    <template v-slot:item.horas_atestados="{ item }">
                        {{ item.horas_atestados }}
                    </template>

                    <!-- Coluna do apontamento faltante -->
                    <template v-slot:item.apontamento_faltante="{ item }">
                        {{ item.apontamento_faltante }}
                    </template>

                    <!-- Coluna da produtividade diária -->
                    <template v-slot:item.produtividade_diaria="{ item }">
                        {{ item.produtividade_diaria }}
                    </template>

                </v-data-table>
            </v-card>
        </body>
    </div>
</template>
  
<script>
import axios from 'axios';
import sidebarSearch from '@/components/sidebar.vue';
import headerSearch from '@/components/headerSearch.vue';

export default {
    components: { sidebarSearch, headerSearch },
    data() {
        return {
            headers: [
                { title: 'ID do Usuário', value: 'user_id' },
                { title: 'Nome do Usuário', value: 'nome_usuario' },
                { title: 'Data', value: 'data' },
                { title: 'Dia da Semana', value: 'dia_da_semana' },
                { title: 'Horas diárias', value: 'horas_mensais' },
                { title: 'Horas trabalhadas', value: 'horas_trabalhadas' },
                { title: 'Horas atestadas', value: 'horas_atestados' },
                { title: 'Apontamento Faltante', value: 'apontamento_faltante' },
                { title: 'Produtividade Diária', value: 'produtividade_diaria' },
            ],
            userData: [], // Array para armazenar os dados do usuário
        };
    },
    computed: {
        filteredRegistros() {
            return this.item.filter((registro) =>
                registro.titulo.toLowerCase().includes(this.search.toLowerCase())
            );
        },
    },
    mounted() {
        // Faça uma solicitação HTTP para o endpoint
        axios.get('http://localhost:8000/apontamentosgerais/')
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
  