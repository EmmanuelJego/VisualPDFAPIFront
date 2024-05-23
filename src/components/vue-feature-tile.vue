<template>
  <div class="feature-tile lite-card q-pa-none rounded-borders-lg">
    <div class="flex flex-grow q-pa-md no-wrap q-gutter-x-md">
      <div v-if="feature.icon || feature.imageSrc"
        class="icon-container rounded-borders bg-white flex text-accent text-h3">
        <span v-if="feature.icon" class="q-ma-auto" :class="feature.icon" />
        <img v-else class="q-ma-auto" :src="feature.imageSrc" />
      </div>
      <div class="text-left">
        <div class="text-bold text-subtitle2 q-mb-sm">
          {{ feature.name }}
        </div>
        <div class="text-muted text-body2 line-break">
          {{ feature.description }}
        </div>
        <div v-if="feature.link1 || feature.link2" class="flex q-gutter-x-md q-gutter-y-sm q-mt-xs">
          <q-btn v-for="(link, linkIndex) in [feature.link1, feature.link2].filter((link) => link)"
            :key="`link-${linkIndex}`" unelevated no-caps color="secondary" :ripple="false"
            :to="{ name: link?.target }">
            <div class="flex q-gutter-x-sm items-center">
              <span>{{ link?.text }}</span>
              <span :class="link?.icon || icons.arrowRight" />
            </div>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import '../css/components/vue-feature-tile.scss';
import icons from 'src/resources/icons';

import Feature from '../types/feature';

export default defineComponent({
  name: 'VueFeatureTile',
  components: {},
  props: {
    feature: {
      type: Object as () => Feature,
      required: true,
    },
  },
  data() {
    return {
      icons,
    };
  },
});
</script>
