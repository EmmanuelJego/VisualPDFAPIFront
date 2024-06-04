<template>
  <q-header class="bg-white text-dark" id="main-header">
    <q-toolbar class="q-gutter-x-lg no-text-decoration full-width q-px-sm">
      <router-link to="/" class="q-ml-none brand-name">
        <vue-brand />
      </router-link>

      <q-separator vertical inset class="desktop-only-item" />

      <router-link to="/features" class="desktop-only-item">Features</router-link>
      <router-link to="/use-cases" class="desktop-only-item">Use cases</router-link>
      <router-link to="/pricing" class="desktop-only-item">Pricing</router-link>
      <router-link to="/guides" class="desktop-only-item">Guides</router-link>
      <router-link to="/docs" class="desktop-only-item">API reference</router-link>

      <div class="q-ml-auto">
        <q-btn unelevated no-caps flat color="dark" label="Login" :ripple="false" class="q-mr-sm desktop-only-item"
          @click="displayWIPModal('header login')" />
        <q-btn unelevated no-caps color="primary" label="Try for free" :ripple="false" class="desktop-only-item"
          @click="displayWIPModal('header try')" />
      </div>
      <!-- <router-link class="q-ml-auto desktop-only-item" to="login">Login</router-link> -->

      <vue-menu-dropdown class="q-ml-auto mobile-only-item" mobile :id="'mobile-menu-dropdown'">
        <template v-slot:title>
          <q-btn flat color="dark" :icon="icons.menu" :ripple="false" padding="sm" />
        </template>
        <template v-slot:dropdown-content>
          <div class="column q-gutter-y-md">
            <router-link to="/features" class="close-dropdown">Features</router-link>
            <router-link to="/use-cases" class="close-dropdown">Use cases</router-link>
            <router-link to="/guides" class="close-dropdown">Guides</router-link>
            <router-link to="/docs" class="close-dropdown">API reference</router-link>
            <router-link to="/pricing" class="close-dropdown">Pricing</router-link>

            <q-separator />

            <q-btn flat no-caps color="dark" label="Login" :ripple="false" class="text-subtitle2 close-dropdown" />
            <q-btn unelevated no-caps color="primary" label="Try for free" :ripple="false"
              class="text-subtitle2 close-dropdown" />
          </div>

          <!-- Close button -->
          <q-btn flat color="dark" :icon="icons.cross" :ripple="false" size="md" padding="sm"
            class="close-dropdown absolute-top-right" />
        </template>
      </vue-menu-dropdown>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import icons from 'src/resources/icons';

import vueMenuDropdown from './vue-menu-dropdown.vue';
import vueBrand from './vue-brand.vue';

export default defineComponent({
  name: 'VueHeader',
  components: {
    vueMenuDropdown,
    vueBrand,
  },
  data() {
    return {
      icons,
    };
  },
  methods: {
    displayWIPModal(ref: string) {
      this.$bus.emit('display-wip-modal', ref);
    },
  },
});
</script>
