<template>
    <SelectorDays />
    <checkProdutivity />
</template>

<script>
import SelectorDays from '../components/selectorDays.vue';
import checkProdutivity from '../components/checkProdutivity.vue';

export default {
    components: { SelectorDays, checkProdutivity }
}
</script>