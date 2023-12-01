<template>
    <div>
        <!-- BOTAO MODAL -->
        <button @click="abrirModalCreateUser"
            class="inline-flex w-full sm:w-auto px-5 py-3 border border-neutral-600 text-neutral-600 hover:text-neutral-700 focus:text-neutral-700 rounded-md mb-3 md:ml-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                class="flex-shrink-0 h-6 w-6 text-neutral-600 -ml-1 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Novo Operador:
        </button>
        <!-- MODAL -->
        <v-dialog v-model="modalCreateUser" max-width="800">
            <v-card>
                <v-card-title class="d-flex justify-space-between">
                    <span>Registrar Usuário</span>
                    <v-btn icon @click="fecharModalCreateUser">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field v-model="novoUsuario.username" label="Nome de Usuário" required></v-text-field>
                        <v-text-field v-model="novoUsuario.email" label="Email" required></v-text-field>
                        <v-text-field v-model="novoUsuario.password" label="Senha" required type="password"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="registrarUsuario" color="primary" elevation="7">Registrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
import axios from 'axios';
// import { useToast } from "vue-toastification";

export default {
    data() {
        return {
            novoUsuario: {
                username: "",
                email: "",
                password: ""
            },
            modalCreateUser: false,
        };
    },
    methods: {
        fecharModalCreateUser() {
            this.modalCreateUser = false;
        },
        abrirModalCreateUser() {
            this.modalCreateUser = true;
        },
        registrarUsuario() {
            axios.post('http://localhost:8000/registeroperator/', this.novoUsuario)
                .then(response => {
                    this.fecharModalCreateUser();
                    // const toast = useToast();
                    alert(`Operador LEG8: ${this.novoUsuario.username} criado com padrão de 8h diarias!`);

                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                })
                .catch(error => {
                    console.error('Erro ao registrar o usuário:', error.response.data);
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
  