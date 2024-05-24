<template>
  <q-page class="flex no-wrap post-page">
    <vue-side-menu :categories="menuCategories" />
    <div class="page-content q-mx-auto q-px-lg">
      <router-view />

      <vue-docs-bottom-nav :categories="menuCategories" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import docsCategories from 'src/posts/docs/index.js';

import SideMenuPageMixin from './mixins/SideMenuPageMixin';
import DocsPageMixin from './mixins/DocsPageMixin';

export default defineComponent({
  name: 'DocsPage',
  mixins: [SideMenuPageMixin, DocsPageMixin],
  data() {
    return {
      menuCategories: this.computeCategories('docs', docsCategories),
    };
  },
});
</script>
