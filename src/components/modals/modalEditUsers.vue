<template>
    <!-- MODAL -->
    <v-icon @click="abrirModalEditUser(userData.user_id)">mdi-pencil</v-icon>
    <v-dialog v-model="modalEditUser" max-width="800">
        <v-card>
            <v-card-title class="d-flex justify-space-between">
                <span>Editar Operadores: </span>
                <v-btn icon @click="fecharModalEditUser">   
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field v-model="editUser.user_id" label="User ID" disabled></v-text-field>
                    <v-text-field v-model="editUser.nome_usuario" label="Nome do Usuário"></v-text-field>
                    <v-text-field v-model="editUser.horas_mensais" label="Horas Mensais" type="number"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="enviarEditUser" color="primary" elevation="7">Enviar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            modalEditUser: false,
            editUser: {
                user_id: null,
                nome_usuario: "",
                horas_mensais: null
            }
        };
    },
    methods: {
        async abrirModalEditUser(userId) {
            try {
                const response = await axios.get(`http://localhost:8000/apontamento-faltante-por-usuario/${userId}`);
                const userData = response.data;
                this.editUser.user_id = userData.user_id;
                this.editUser.nome_usuario = userData.nome_usuario;
                this.editUser.horas_mensais = userData.horas_mensais;
                this.modalEditUser = true;
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        },
        fecharModalEditUser() {
            this.modalEditUser = false;
        },
        async enviarEditUser() {
            const dataToUpdate = {
                nome_usuario: this.editUser.nome_usuario,
                horas_mensais: this.editUser.horas_mensais,
            };

            try {
                await axios.patch(`http://localhost:8000/apontamento-faltante-por-usuario/${this.editUser.user_id}/`, dataToUpdate);
                this.modalEditUser = false;
            } catch (error) {
                console.error('Error updating user:', error);
            }
        },
    },
};
</script>
  