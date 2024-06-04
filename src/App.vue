<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import plausibleEvents from 'src/resources/plausible-events.js';
import vueWipModal from 'src/components/vue-wip-modal.vue';
import vueContactModal from 'src/components/vue-contact-modal.vue';

export default defineComponent({
  name: 'App',
  mounted() {
    this.$bus.on('display-wip-modal', (ref: string) => {
      const plausibleProps: { [key: string]: string } = {};
      plausibleProps[plausibleEvents.props.REF_BUTTON] = ref;
      this.$plausible.event(plausibleEvents.events.DISPLAY_WAITING_FORM, plausibleProps);

      this.$q.dialog({
        component: vueWipModal,
      });
    });

    this.$bus.on('display-contact-modal', () => {
      this.$q.dialog({
        component: vueContactModal,
      });
    });
  },
});
</script>
