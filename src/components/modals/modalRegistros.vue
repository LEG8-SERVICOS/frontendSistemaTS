<template>
    <!-- BOTAO MODAL -->
    <button @click="abrirModalRegistro"
        class="inline-flex w-full sm:w-auto px-5 py-3 text-white bg-emerald-600 hover:bg-emerald-700 focus:bg-emerald-700 rounded-md mb-3 md:ml-6">
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            class="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Criar um novo registro
    </button>

    <!-- MODAL -->
    <v-dialog v-model="modalRegistro" max-width="800">
        <v-card>
            <v-card-title class="d-flex justify-space-between">
                <span>Report de Registros LEG8</span>
                <v-btn icon @click="fecharModalRegistro">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-text-field type="hidden" v-model="registro.criado_por" :value="userId"></v-text-field>
                <v-snackbar v-model="errorSnackbar" :timeout="timeout" color="error" bottom>
                    O registro possui inconsistencias ou campos em branco!
                </v-snackbar>

                <!-- Snackbar de Sucesso -->
                <v-snackbar v-model="successSnackbar" :timeout="timeout" color="success" bottom>
                    O registro foi postado com sucesso!
                </v-snackbar>

                <v-snackbar v-model="warningSnackbar" :timeout="timeout" color="warning" bottom>
                    A quantidade total não bate com a soma das quantidades! Verifique os campos de quantidade!
                </v-snackbar>
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
                    <v-text-field v-model="registro.data_fabricacao" label="Data de Fabricação" type="date"></v-text-field>
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
                <v-btn border @click="enviarRegistro" class="text-none" prepend-icon="mdi-check" variant="text">
                    Registrar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            userId: localStorage.getItem('userId'),
            registro: {
                titulo: '',
                local: '',
                data: '',
                data_fabricacao: '',
                fornecedor: '',
                peca: '',
                lote: '',
                codigo: '',
                defeito: '',
                quantidade_total: null,
                aprovados: null,
                rejeitados: null,
                retrabalhados: null,
                criado_por: null,
                operador_1: null,
                operador_2: null,
                operador_3: null,
                operador_4: null,
                horario_inicio_1: '',
                horario_inicio_2: '',
                horario_inicio_3: '',
                horario_inicio_4: '',
                horario_fim_1: '',
                horario_fim_2: '',
                horario_fim_3: '',
                horario_fim_4: '',
                observacoes: '',
            },
            operadores: [],
            toastMessage: '',
            modalRegistro: false,
            errorSnackbar: false,
            successSnackbar: false,
            warningSnackbar: false,
        };
    },
    mounted() {
        this.carregarOperadores();
    },
    methods: {
        fecharModalRegistro() {
            this.modalRegistro = false;
        },
        abrirModalRegistro() {
            console.log(this.operadores)
            this.modalRegistro = true;
        },
        carregarOperadores() {
            axios
                .get("http://localhost:8080/users/")
                .then((response) => {
                    this.operadores = response.data.map(item => ({
                        user_id: item.uid,
                        nome_usuario: item.data.email,
                    }));
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        enviarRegistro() {

            this.registro.criado_por = this.userId;

            if (this.registro.horario_inicio_2 === '' && this.registro.horario_fim_2 === '') {
                delete this.registro.horario_inicio_2;
                delete this.registro.horario_fim_2;
            }
            if (this.registro.horario_inicio_3 === '' && this.registro.horario_fim_3 === '') {
                delete this.registro.horario_inicio_3;
                delete this.registro.horario_fim_3;
            }
            if (this.registro.horario_inicio_4 === '' && this.registro.horario_fim_4 === '') {
                delete this.registro.horario_inicio_4;
                delete this.registro.horario_fim_4;
            }
            console.log(this.registro);
            axios
                .post("http://localhost:8080/record/", this.registro)
                .then((response) => {
                    this.successSnackbar = true;
                    this.modalRegistro = false;
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                })
                .catch((error) => {
                    this.errorSnackbar = true;
                    console.error(error);
                });
        },
    },
}
</script>

<style scoped>
.ml-auto {
    margin-left: auto;
}
</style>
