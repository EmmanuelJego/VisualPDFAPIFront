<template>
  <q-footer id="app-footer">
    <div class="bg-secondary flex">
      <div class="page-content q-mx-auto q-py-xl">
        <div class="flex gap-xl">
          <div class="q-mr-auto">
            <vue-brand />
            <div class="q-my-sm text-muted">
              Create your own PDF solution and automate your PDF tasks.
            </div>
          </div>

          <div class="flex gap-xl">
            <div>
              <div class="text-h6 q-mb-sm">
                Product
              </div>
              <div class="flex column">
                <router-link to="features" class="no-text-decoration">Features</router-link>
                <router-link to="use-cases" class="no-text-decoration">Use cases</router-link>
                <router-link to="guides" class="no-text-decoration">Guides</router-link>
                <router-link to="docs" class="no-text-decoration">API reference</router-link>
                <router-link to="pricing" class="no-text-decoration">Pricing</router-link>
                <a href="https://visualpdf.com" target="_blank" class="no-text-decoration">Web app</a>
              </div>
            </div>
            <div>
              <div class="text-h6 q-mb-sm">
                Legal
              </div>
              <div class="flex column">
                <router-link to="privacy-policy" class="no-text-decoration">Privacy</router-link>
                <router-link to="terms-and-conditions" class="no-text-decoration">Terms</router-link>
              </div>
            </div>
            <div>
              <q-btn unelevated no-caps color="primary" label="Try for free" :ripple="false" @click="displayWIPModal" />
            </div>
          </div>
        </div>
        <hr class="q-my-xl" />
        <div class="text-muted row">
          Conceived by Emmanuel Jégo. All rights reserved.
          <q-space />
          Visual PDF API
        </div>
      </div>
    </div>
  </q-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import vueBrand from './vue-brand.vue';

export default defineComponent({
  name: 'VueFooter',
  components: {
    vueBrand,
  },
  data() {
    return {};
  },
  methods: {
    displayWIPModal() {
      this.$bus.emit('display-wip-modal', 'footer try');
    },
  },
});
</script>
