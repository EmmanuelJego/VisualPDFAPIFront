<template>
  <q-page class="flex justify-center">
    <div class="page-content q-mb-xl q-pb-xl">
      <div class="flex justify-center q-my-xl q-py-xl text-center">
        <h1 class="sm-page-content">
          <span class="text-primary">Automate any PDF task</span> with our large toolkit
        </h1>
        <div class="text-muted text-subtitle1 q-mt-xl sm-page-content">
          <p>
            Powerful PDF tools that you can combine, with infinite possibilities.
          </p>
        </div>
      </div>

      <div v-for="(cat, catIndex) in featuresCategories" :key="`cat-${catIndex}`"
        :class="{ 'q-mt-xl q-pt-md': catIndex > 0 }">
        <h2 class="text-h3 q-mb-md">
          {{ cat.name }}
        </h2>
        <div class="features-grid">
          <vue-feature-tile v-for="(feature, featureIndex) in cat.features" :key="`feature-${catIndex}-${featureIndex}`"
            :feature="feature" />
        </div>
      </div>

      <div class="q-mt-xl q-pt-xl text-center flex items-baseline justify-center">
        Can't find the tool you are looking for?
        <q-btn unelevated flat no-caps color="primary" label="Let us know" class="link-btn"
          @click="$bus.emit('display-contact-modal')" />
      </div>
    </div>

    <vue-main-cta />
  </q-page>
</template>

<script lang="ts">
import { createMetaMixin } from 'quasar';
import { defineComponent } from 'vue';

import icons from '../resources/icons.js';
import tools from '../resources/tools.js';

import vueFeatureTile from '../components/vue-feature-tile.vue';
import vueMainCta from '../components/vue-main-cta.vue';

export default defineComponent({
  name: 'FeaturesPage',
  components: {
    vueFeatureTile,
    vueMainCta,
  },
  mixins: [
    createMetaMixin(() => ({
      title: 'PDF tools as REST API - Visual PDF API file processing features',
      description: 'All our PDF processing features are easily integrated into your solution, whether it is a personal project or a large-scale project.',
      equiv: {
        'http-equiv': 'Content-Type',
        content: 'text/html; charset=UTF-8',
      },
    })),
  ],
  data() {
    return {
      icons,
      featuresCategories: [
        {
          name: 'PDF edition tools',
          features: this.getCategoryFeatures('edit'),
        },
        {
          name: 'PDF creation tools',
          features: this.getCategoryFeatures('create'),
        },
        {
          name: 'PDF security tools',
          features: this.getCategoryFeatures('secure'),
        },
      ],
    };
  },
  computed: {},
  methods: {
    getCategoryFeatures(category: string) {
      return tools.filter((t) => t.cateogry === category).map((t) => ({
        name: t.name,
        description: t.description,
        imageSrc: `img/tools/${t.icon}`,
        ...this.buildFeatureLinks(t.id),
      }));
    },
    buildFeatureLinks(toolid: string) {
      const getGuideName = () => `guides-${toolid}`;

      return {
        link1: {
          target: this.$router.hasRoute(getGuideName()) ? getGuideName() : 'guides',
          text: 'Guide',
        },
        link2: {
          target: 'docs-process',
          hash: toolid,
          text: 'API docs',
        },
      };
    },
  },
});
</script>
