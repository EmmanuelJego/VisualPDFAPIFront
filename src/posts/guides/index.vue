<template>
  <h1>Welcome to the Visual PDF API guide.</h1>
  <p>
    The Visual PDF user guide will allow you to understand how our REST API for processing PDF files works, and what
    possibilities it offers.
  </p>
  <p>
    You will also find lots of code examples allowing you to see a concrete use of each functionality.
  </p>
  <p>
    If you are looking for the API reference, you'll find them in our <router-link
      :to="{ name: 'docs' }">documentation</router-link>.
  </p>

  <h2>
    What is Visual PDF API?
  </h2>
  <p>
    Visual PDF API is a REST API that allows developers to create their own solutions based on the PDF file processing
    features it offers. Developers are thus relieved of having to code these functionalities themselves and all
    associated needs (file saving, security rules, task parallelization, etc.). In other words, it's a huge productivity
    gain and a lot of headaches avoided.
  </p>
  <p>
    In addition to this, Visual PDF API offers activity tracking and analytics features, which will allow anyone to
    visualize API usage in charts and lists. This data allows you to ensure that everything is working correctly, but
    above all to see the evolution of your solution, represented by the calls to our API.
  </p>

  <h2>
    First steps guides
  </h2>
  <p>
    If you're new to Visual PDF API, we highly recommend reading the first steps guides to get started. They will teach
    you how the API works, how to get credits, and all the basics that will make it easy for you to then understand the
    tools' guides and documentation.
  </p>

  <div class="features-grid">
    <vue-feature-tile v-for="(feature, index) in firstStepsCards" :key="`card-first-steps-${index}`"
      :feature="feature" />
  </div>

  <h2>
    Tool guides
  </h2>
  <p>
    The tool guides will allow you to discover all the functionalities of our API, and for each of them, the options
    available to you to best suit your needs as well as simple code examples.
  </p>

  <div class="features-grid">
    <vue-feature-tile v-for="(feature, index) in toolsCards" :key="`card-tool-${index}`" :feature="feature" />
  </div>

  <h2>
    Final words
  </h2>
  <p>
    The guides we write can sometimes be incomplete or even incorrect, although we try to keep them as up to date as
    possible.
  </p>
  <div>
    <span class="q-mr-xs vertical-middle">If you encounter a difficulty, spot an error or an omission, do not hesitate
      to let us know
      by</span>
    <q-btn unelevated flat no-caps color="primary" label="contacting us" class="link-btn" />.
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createMetaMixin } from 'quasar';

import icons from 'src/resources/icons.js';
import guidesCategories from 'src/posts/guides/index.js';
import tools from 'src/resources/tools.js';

import { MenuItem } from 'src/types/menuCategory';

import vueFeatureTile from 'src/components/vue-feature-tile.vue';

export default defineComponent({
  name: 'HomeGuidePost',
  components: {
    vueFeatureTile,
  },
  mixins: [createMetaMixin(() => ({
    title: 'Visual PDF API guides - PDF tools for developers and creators',
    description: 'The Visual PDF API guides allow you to understand how our API works to process your PDF files and all its capabilities, through examples and explanations.',
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
  }))],
  data() {
    return {
      firstStepsCards: [
        {
          name: guidesCategories[0].items[0].name,
          description: 'Learn how the Visual PDF API is protected and how to authenticate your requests.',
          icon: icons.shieldLock,
          link1: this.getFeatureLink(guidesCategories[0].items[0].slug),
        },
        {
          name: guidesCategories[0].items[1].name,
          description: 'Learn how you can call the API through 3 simple steps, which will allow you to perform processing on PDF files.',
          icon: icons.gearCode,
          link1: this.getFeatureLink(guidesCategories[0].items[1].slug),
        },
        {
          name: guidesCategories[0].items[2].name,
          description: 'Discover the possibilities offered by pipelines, which allow you to combine different tools.',
          icon: icons.wrench,
          link1: this.getFeatureLink(guidesCategories[0].items[2].slug),
        },
        {
          name: guidesCategories[0].items[3].name,
          description: 'Learn about the different credit provisioning methods that allow you to call the API and the different options available to you.',
          icon: icons.coin,
          link1: this.getFeatureLink(guidesCategories[0].items[3].slug),
        },
      ],
      toolsCards: guidesCategories[2].items.map((toolItem: MenuItem) => {
        const tool = tools.find((t: { id: string; }) => t.id === toolItem.slug);
        if (tool) {
          return {
            name: toolItem.name,
            description: tool.description,
            imageSrc: `img/tools/${tool.icon}`,
            link1: this.getFeatureLink(toolItem.slug),
          };
        }
        return undefined;
      }).filter((item) => !!item),
    };
  },
  methods: {
    getFeatureLink(slug: string) {
      return {
        target: `guides-${slug}`,
        text: 'Go to guide',
      };
    },
  },
});
</script>
