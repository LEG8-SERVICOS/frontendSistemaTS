<template>
    <v-snackbar v-model="errorSnackbar" :timeout="timeout" color="error" bottom>
        O atestado possui inconsistencias ou campos em branco!
    </v-snackbar>

    <!-- Snackbar de Sucesso -->
    <v-snackbar v-model="successSnackbar" :timeout="timeout" color="success" bottom>
        O atestado foi postado com sucesso!
    </v-snackbar>
    <!-- BOTAO MODAL -->
    <button @click="abrirModalAtestado"
        class="inline-flex w-full sm:w-auto px-5 py-3 text-white bg-orange-600 hover:bg-orange-700 focus:bg-orange-700 rounded-md md:ml-6 mb-3">
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            class="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Criar um novo atestado
    </button>

    <!-- MODAL -->
    <v-dialog v-model="modalAtestado" max-width="800">
        <v-card>
            <v-card-title class="d-flex justify-space-between">
                <span>Registrar Atestados: </span>
                <v-btn icon @click="fecharModalAtestado">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-autocomplete v-model="atestado.user" :items="operadores" item-title="nome_usuario"
                        item-value="user_id" label="Pesquisar Operador" clearable></v-autocomplete>
                    <v-text-field v-model="atestado.ficou_parado" label="Ficou parado quantas horas?" type="time"
                        required></v-text-field>
                    <v-text-field v-model="atestado.data" label="Data de Registro" required type="date"></v-text-field>
                    <v-textarea v-model="atestado.observacoes" label="Observações"></v-textarea>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="enviarAtestado" color="primary" elevation="7">Enviar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import axios from 'axios';
// import { useToast } from "vue-toastification";

export default {
    data() {
        return {
            userId: localStorage.getItem("userId"),
            atestado: {
                user: "",
                ficou_parado: "",
                data: "",
                observacoes: "",
            },
            operadores: [],
            toastMessage: "",
            modalAtestado: false,
            errorSnackbar: false,
            successSnackbar: false,
        };
    },
    mounted() {
        this.carregarOperadores();
    },
    methods: {
        fecharModalAtestado() {
            this.modalAtestado = false;
        },
        abrirModalAtestado() {
            this.modalAtestado = true;
        },

        carregarOperadores() {
            axios
                .get("http://localhost:8000/apontamento-faltante-por-todos-usuarios/")
                .then((response) => {
                    this.operadores = response.data;
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        enviarAtestado() {
            axios
                .post("http://localhost:8000/atestados/", this.atestado)
                .then((response) => {
                    // const toast = useToast();
                    // toast.success(`Atestado postado ao operador!`);
                    this.errorSnackbar = false,
                        this.successSnackbar = true;
                    this.modalAtestado = false;
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                })
                .catch((error) => {
                    console.error(error);
                    this.errorSnackbar = true;
                });
        },
    },
}
</script>

<style>
.ml-auto {
    margin-left: auto;
}
</style>