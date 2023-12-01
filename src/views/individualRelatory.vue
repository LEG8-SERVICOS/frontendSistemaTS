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
            {{ item.produtividade_mensal }}
        </template>

        <!-- Coluna da produtividade diária -->
        <template v-slot:item.produtividade_diaria="{ item }">
            {{ item.produtividade_diaria }}
        </template>

        <!-- Coluna da produtividade do dia anterior -->
        <template v-slot:item.produtividade_dia_anterior="{ item }">
            {{ item.produtividade_dia_anterior }}
        </template>
    </v-data-table>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            headers: [
                { title: 'ID do Usuário', value: 'user_id' },
                { title: 'Nome do Usuário', value: 'nome_usuario' },
                { title: 'Horas Mensais', value: 'horas_mensais' },
                { title: 'Apontamento Faltante', value: 'apontamento_faltante' },
                { title: 'Horas Trabalhadas', value: 'horas_trabalhadas' },
                { title: 'Produtividade Mensal', value: 'produtividade_mensal' },
                { title: 'Produtividade Diária', value: 'produtividade_diaria' },
                { title: 'Produtividade Dia Anterior', value: 'produtividade_dia_anterior' },
            ],
            userData: [], // Array para armazenar os dados do usuário
        };
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
  