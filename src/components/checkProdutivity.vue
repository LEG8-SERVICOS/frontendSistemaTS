<template>
    <div>
        <h2>Produtividade do Usuário</h2>
        <div v-if="loading">Carregando...</div>
        <div v-else>
            <div>
                <strong>Nome do Usuário:</strong> {{ usuario.nome }}
            </div>
            <div>
                <strong>Produtividade do Dia Anterior:</strong> {{ usuario.produtividade_dia_anterior }}%
            </div>
            <div>
                <strong>Produtividade Diária:</strong> {{ usuario.produtividade_diaria }}%
            </div>
            <div>
                <strong>Produtividade Mensal:</strong> {{ usuario.produtividade_mensal }}%
            </div>
            <div>
                <strong>Produtividade Anual:</strong> {{ usuario.produtividade_anual }}%
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            loading: true,
            usuario: null,
        };
    },
    mounted() {
        const usuarioId = this.$route.params.id;
        axios.get(`http://localhost:8000/produtividade_usuario/${usuarioId}/`)
            .then(response => {
                this.usuario = response.data;
                this.loading = false;
            })
            .catch(error => {
                console.error(error);
                this.loading = false;
            });
    },
};
</script>
  