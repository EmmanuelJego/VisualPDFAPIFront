<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import vueWipModal from 'src/components/vue-wip-modal.vue';

export default defineComponent({
  name: 'App',
  mounted() {
    this.$bus.on('display-wip-modal', () => {
      this.$q.dialog({
        component: vueWipModal,
      });
    });
  },
});
</script>
