<template>
  <q-page class="flex justify-center">
    <div class="page-content">
      <div class="flex justify-center q-my-xl q-py-xl">
        <h1 class="text-center sm-page-content">
          <span class="text-primary">Automate any PDF task</span> with our large toolkit
        </h1>
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
        <q-btn unelevated flat no-caps color="primary" label="Let us know" class="link-btn" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import icons from '../resources/icons.js';
import tools from '../resources/tools.js';

import vueFeatureTile from '../components/vue-feature-tile.vue';

export default defineComponent({
  name: 'FeaturesPage',
  components: {
    vueFeatureTile,
  },
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
      const getDocsName = () => `docs-${toolid}`;

      return {
        link1: {
          target: this.$router.hasRoute(getGuideName()) ? getGuideName() : 'guides',
          text: 'Guide',
        },
        link2: {
          target: this.$router.hasRoute(getDocsName()) ? getDocsName() : 'docs',
          text: 'API docs',
        },
      };
    },
  },
});
</script>
