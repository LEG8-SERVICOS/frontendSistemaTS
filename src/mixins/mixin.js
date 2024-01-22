const vuetifyDisableMixin = {
  data() {
    return {
      vuetifyEnabled: true, 
    };
  },
  computed: {
    vuetify() {
      return this.vuetifyEnabled ? this.$vuetify : null;
    },
  },
};

export default vuetifyDisableMixin;
