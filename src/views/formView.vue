<template>
    <div>

        <body class="flex bg-gray-100 min-h-screen">
            <sidebarSearch />
            <v-card flat>
                <v-card-title class="d-flex align-center pe-2">
                    <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
                    Relatório de Registros Geral

                    <v-spacer></v-spacer>

                    <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact"
                        label="Pesquisar Registro" single-line flat hide-details variant="solo-filled"></v-text-field>
                </v-card-title>

                <v-divider></v-divider>

                <v-data-table :headers="headers" :items="filteredRegistros" :items-per-page="1" :dense="true" item-key="id">
                    <template v-slot:item.acao="{ item }">
                        <v-icon @click="editarRegistro(item)" color="primary" dark icon>mdi-pencil</v-icon>
                        <v-icon @click="deletarRegistro(item.id)" color="red" dark icon>mdi-delete</v-icon>
                    </template>
                </v-data-table>
            </v-card>
        </body>

        <!-- MODAL -->
        <v-dialog v-model="modalRegistro" max-width="800">
            <v-card>
                <v-card-title class="d-flex justify-space-between">
                    <span>{{ isEditing ? 'Editar Registro' : 'Criar um novo registro' }}</span>
                    <v-btn icon @click="fecharModalRegistro">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <!-- Conteúdo da modal -->
                    <v-form>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field v-model="registro.titulo" label="Título" required></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="registro.local" label="Local" required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-text-field v-model="registro.data" label="Data de Registro" required type="date"></v-text-field>
                        <v-text-field v-model="registro.data_fabricacao" label="Data de Fabricação"
                            type="date"></v-text-field>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field v-model="registro.fornecedor" label="Fornecedor"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="registro.peca" label="Peça"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field v-model="registro.lote" label="Lote"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="registro.codigo" label="Código"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-text-field v-model="registro.defeito" label="Defeito"></v-text-field>
                        <v-row>
                            <v-col cols="3">
                                <v-text-field v-model="registro.quantidade_total" label="Quantidade Total"
                                    type="number"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field v-model="registro.aprovados" label="Aprovados" type="number"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field v-model="registro.rejeitados" label="Reprovados" type="number"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field v-model="registro.retrabalhados" label="Retrabalhados"
                                    type="number"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-autocomplete v-model="registro.operador_1" :items="operadores" item-title="nome_usuario"
                                    item-value="user_id" label="Pesquisar Operador" clearable></v-autocomplete>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="registro.horario_inicio_1" label="Horário de Início 1"
                                    type="time"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="registro.horario_fim_1" label="Horário de Término 1"
                                    type="time"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-autocomplete v-model="registro.operador_2" :items="operadores" item-title="nome_usuario"
                                    item-value="user_id" label="Pesquisar Operador" clearable></v-autocomplete>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="registro.horario_inicio_2" label="Horário de Início 2"
                                    type="time"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="registro.horario_fim_2" label="Horário de Término 2"
                                    type="time"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-autocomplete v-model="registro.operador_3" :items="operadores" item-title="nome_usuario"
                                    item-value="user_id" label="Pesquisar Operador" clearable></v-autocomplete>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="registro.horario_inicio_3" label="Horário de Início 3"
                                    type="time"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="registro.horario_fim_3" label="Horário de Término 3"
                                    type="time"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-autocomplete v-model="registro.operador_4" :items="operadores" item-title="nome_usuario"
                                    item-value="user_id" label="Pesquisar Operador" clearable></v-autocomplete>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="registro.horario_inicio_4" label="Horário de Início 4"
                                    type="time"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="registro.horario_fim_4" label="Horário de Término 4"
                                    type="time"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-textarea v-model="registro.observacoes" label="Observações"></v-textarea>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="isEditing ? atualizarRegistro() : enviarRegistro()" color="primary" elevation="7">
                        {{ isEditing ? 'Atualizar' : 'Enviar' }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
            registros: [],
            search: '',
            headers: [
                { title: 'Título', value: 'titulo' },
                { title: 'Local', value: 'local' },
                { title: 'Data', value: 'data' },
                { title: 'Fornecedor', value: 'fornecedor' },
                { title: 'Peça', value: 'peca' },
                { title: 'Lote', value: 'lote' },
                { title: 'Código', value: 'codigo' },
                { title: 'Defeito', value: 'defeito' },
                { title: 'Quantidade Total', value: 'quantidade_total' },
                { title: 'Aprovados', value: 'aprovados' },
                { title: 'Rejeitados', value: 'rejeitados' },
                { title: 'Retrabalhados', value: 'retrabalhados' },
                { title: 'Data de Fabricação', value: 'data_fabricacao' },
                { title: 'Horário Início 1', value: 'horario_inicio_1' },
                { title: 'Horário Fim 1', value: 'horario_fim_1' },
                { title: 'Horário Início 2', value: 'horario_inicio_2' },
                { title: 'Horário Fim 2', value: 'horario_fim_2' },
                { title: 'Horário Início 3', value: 'horario_inicio_3' },
                { title: 'Horário Fim 3', value: 'horario_fim_3' },
                { title: 'Horário Início 4', value: 'horario_inicio_4' },
                { title: 'Horário Fim 4', value: 'horario_fim_4' },
                { title: 'Observações', value: 'observacoes' },
                { title: 'Criado Por', value: 'criado_por' },
                { title: 'Operador 1', value: 'operador_1' },
                { title: 'Operador 2', value: 'operador_2' },
                { title: 'Operador 3', value: 'operador_3' },
                { title: 'Operador 4', value: 'operador_4' },
                { title: 'Ação', value: 'acao', sortable: false },
            ],
            userId: localStorage.getItem("userId"),
            registro: {
                titulo: "",
                local: "",
                data: "",
                data_fabricacao: "",
                fornecedor: "",
                peca: "",
                lote: "",
                codigo: "",
                defeito: "",
                quantidade_total: null,
                aprovados: null,
                rejeitados: null,
                retrabalhados: null,
                operador_1: null,
                operador_2: null,
                operador_3: null,
                operador_4: null,
                horario_inicio_1: "",
                horario_inicio_2: "",
                horario_inicio_3: "",
                horario_inicio_4: "",
                horario_fim_1: "",
                horario_fim_2: "",
                horario_fim_3: "",
                horario_fim_4: "",
                observacoes: "",
            },
            operadores: [],
            modalRegistro: false,
            isEditing: false,
            editingRecordId: null,
        };
    },
    computed: {
        filteredRegistros() {
            return this.registros.filter((registro) =>
                registro.titulo.toLowerCase().includes(this.search.toLowerCase())
            );
        },
    },
    created() {
        this.carregarRegistros();
    },
    methods: {
        carregarRegistros() {
            axios.get('http://localhost:8080/records')
                .then((response) => {
                    this.registros = response.data;
                })
                .catch((error) => {
                    console.error('Erro ao buscar registros:', error);
                });
        },
        deletarRegistro(registroId) {
            axios.delete(`http://localhost:8080/records/${registroId}`)
                .then(() => {
                    this.carregarRegistros();
                })
                .catch((error) => {
                    console.error('Erro ao deletar registro:', error);
                });
        },
        editarRegistro(record) {
            this.isEditing = true;
            this.editingRecordId = record.id;
            this.registro = { ...record };
            this.modalRegistro = true;
        },
        resetForm() {
            this.isEditing = false;
            this.editingRecordId = null;
            this.registro = {
                titulo: "",
                local: "",
                data: "",
                data_fabricacao: "",
                fornecedor: "",
                peca: "",
                lote: "",
                codigo: "",
                defeito: "",
                quantidade_total: null,
                aprovados: null,
                rejeitados: null,
                retrabalhados: null,
                operador_1: null,
                operador_2: null,
                operador_3: null,
                operador_4: null,
                horario_inicio_1: "",
                horario_inicio_2: "",
                horario_inicio_3: "",
                horario_inicio_4: "",
                horario_fim_1: "",
                horario_fim_2: "",
                horario_fim_3: "",
                horario_fim_4: "",
                observacoes: "",
            };
        },
        atualizarRegistro() {
            if (!this.editingRecordId) {
                return;
            }

            this.registro.criado_por = this.userId;

            axios
                .patch(`http://localhost:8000/record/${this.editingRecordId}/`, this.registro)
                .then(() => {
                    alert("Registro atualizado!");
                    this.resetForm();
                    this.modalRegistro = false;
                    this.carregarRegistros();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
</script>
  
