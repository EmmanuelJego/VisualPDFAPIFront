<template>
  <q-page class="flex no-wrap post-page">
    <vue-side-menu :categories="menuCategories" />
    <div class="page-content q-mx-auto q-px-lg overflow-x-hidden">
      <router-view />

      <vue-docs-bottom-nav :categories="menuCategories" :next-text="'Next guide'" :previous-text="'Previous guide'" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import guidesCategories from 'src/posts/guides/index.js';

import SideMenuPageMixin from './mixins/SideMenuPageMixin';
import DocsPageMixin from './mixins/DocsPageMixin';

export default defineComponent({
  name: 'GuidesPage',
  mixins: [SideMenuPageMixin, DocsPageMixin],
  data() {
    return {
      menuCategories: this.computeCategories('guides', guidesCategories),
    };
  },
});
</script>
