<template>
  <h1>Visual PDF API reference</h1>

  <h2>REST API</h2>
  <p>
    The Visual PDF API is structured around the principles of <a
      href="https://en.wikipedia.org/wiki/Representational_State_Transfer" target="_blank">REST</a> (Representational
    State Transfer), a widely adopted
    architectural style for designing networked applications. This means that our API leverages standard HTTP methods
    (such as GET, POST, DELETE) to perform operations on resources, which are typically represented as URLs. Each
    endpoint in the Visual PDF API corresponds to a specific function, enabling you to easily interact with and
    manipulate PDF files.
  </p>

  <h2>Guides</h2>
  <p>
    If you are not yet familiar with our API and its functionalities, or how a REST API works, we advise you to start by
    reading our <router-link :to="{ name: 'guides' }">guides</router-link>.
  </p>
  <p>
    Our guides will allow you to discover our API, how to use it and what its features are, through explanations and
    examples. The API reference will allow you to obtain the different API endpoints and the details of their
    parameters.
  </p>

  <h2>Access condition</h2>
  <p>
    Our API is restricted to users with a valid account.
  </p>
  <p>
    Each request made must be <router-link :to="{ name: 'docs-authentication' }">authenticated</router-link> using an
    API key obtained from your admin portal.
  </p>
  <p>
    <router-link :to="{ name: 'docs-process' }">File processing requests</router-link> consume credits, which you can
    get through a subscription or prepaid package. Visit the <router-link
      :to="{ name: 'pricing' }">pricing</router-link> page to find out more.
  </p>

  <h2>Get started</h2>
  <div class="features-grid">
    <vue-feature-tile v-for="(feature, index) in getStartedCards" :key="`card-first-steps-${index}`"
      :feature="feature" />
  </div>

  <h2>Main API resources</h2>
  <div class="features-grid">
    <vue-feature-tile v-for="(feature, index) in resourcesCards" :key="`card-first-steps-${index}`"
      :feature="feature" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import icons from 'src/resources/icons.js';
import docsCategories from 'src/posts/docs/index.js';

import vueFeatureTile from 'src/components/vue-feature-tile.vue';

export default defineComponent({
  name: 'HomeDocsPost',
  components: {
    vueFeatureTile,
  },
  data() {
    return {
      getStartedCards: [
        {
          name: docsCategories[0].items[0].name,
          description: 'How to authenticate your requests with an API key.',
          icon: icons.shieldLock,
          link1: this.getFeatureLink(docsCategories[0].items[0].slug),
        },
        {
          name: docsCategories[0].items[1].name,
          description: 'The different steps to process files with the API',
          icon: icons.gearCode,
          link1: this.getFeatureLink(docsCategories[0].items[1].slug),
        },
      ],
      resourcesCards: [
        {
          name: docsCategories[1].items[0].name,
          description: 'Run a file processing pipeline and its different tasks.',
          icon: icons.wrench,
          link1: this.getFeatureLink(docsCategories[1].items[0].slug),
        },
        {
          name: docsCategories[1].items[1].name,
          description: 'Download pipeline output files.',
          icon: icons.download,
          link1: this.getFeatureLink(docsCategories[1].items[1].slug),
        },
      ],
    };
  },
  methods: {
    getFeatureLink(slug: string) {
      return {
        target: `docs-${slug}`,
        text: 'See documentation',
      };
    },
  },
});
</script>
