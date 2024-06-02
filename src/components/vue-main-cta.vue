<template>
  <div class="cta-section main-cta">
    <h2 class="text-h2 text-white text-bold">
      It takes less than 5 minutes to start automating your PDFs
    </h2>
    <div class="text-h5 q-my-xl">
      Start with <span class="bg-white text-primary q-px-xs">200 free credits</span>
    </div>
    <div class="cta-button-container">
      <q-btn unelevated no-caps color="secondary" label="Get started" :ripple="false" class="text-subtitle2"
        @click="displayWIPModal" />
    </div>
    <div class="text-caption q-mt-xs">
      No credit card required
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VueMainCTA',
  components: {},
  data() {
    return {};
  },
  methods: {
    displayWIPModal() {
      this.$bus.emit('display-wip-modal');
    },
  },
});
</script>
