<template>
  <q-layout view="hHh lpR fff">
    <vue-header />

    <!-- Page loading progess bar -->
    <q-linear-progress v-if="isLoading" id="page-loading-progress" :value="progress / 100" />

    <q-page-container>
      <router-view />
    </q-page-container>

    <vue-footer />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import vueHeader from '../components/vue-header.vue';
import vueFooter from '../components/vue-footer.vue';

// Assume that loading will complete under this amount of time.
const defaultDuration = 3000;
// How frequently to update
const defaultInterval = 300;
// 0 - 1. Add some variation to how much the bar will grow at each interval
const variation = 0.5;
// 0 - 100. Where the progress bar should start from.
const startingPoint = 0;
// Limiting how far the progress bar will get to before loading is complete
const endingPoint = 90;

export default defineComponent({
  name: 'MainLayout',
  components: {
    vueHeader,
    vueFooter,
  },
  data() {
    return {
      progress: startingPoint,
      timeoutId: 0,
      isLoading: false,
    };
  },
  mounted() {
    this.$router.beforeEach((to, from, next) => {
      this.startLoading();
      next();
    });

    this.$router.beforeResolve((to, from, next) => {
      this.stopLoading();
      next();
    });
  },
  methods: {
    startLoading() {
      this.isLoading = true;
      this.progress = startingPoint;
      this.loop();
    },
    stopLoading() {
      this.isLoading = false;
      this.progress = 100;
      clearTimeout(this.timeoutId);
    },
    loop() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      if (this.progress >= endingPoint) {
        return;
      }
      const size = (endingPoint - startingPoint) / (defaultDuration / defaultInterval);
      const p = Math.round(this.progress + this.random(size * (1 - variation), size * (1 + variation)));
      this.progress = Math.min(p, endingPoint);
      this.timeoutId = window.setTimeout(
        this.loop,
        this.random(defaultInterval * (1 - variation), defaultInterval * (1 + variation)),
      );
    },
    random(lower: number, upper: number) {
      if (lower > upper) {
        const temp = lower;
        lower = upper;
        upper = temp;
      }
      if (lower % 1 || upper % 1) {
        const rand = Math.random();
        const randLength = `${rand}`.length - 1;
        return Math.min(lower + (rand * (upper - lower + parseFloat(`1e-${randLength}`))), upper);
      }
      return lower + Math.floor(Math.random() * (upper - lower + 1));
    },
  },
});
</script>
