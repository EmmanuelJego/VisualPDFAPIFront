<template>
  <q-page class="flex no-wrap post-page">
    <vue-side-menu :categories="menuCategories" />
    <div class="page-content q-mx-auto q-px-lg">
      <div class="row">
        <div class="col-9 docs-content">
          <router-view @vue:mounted="onViewMounted" @vue:updated="onViewMounted" />
        </div>

        <q-tree class="col-3 docs-summary" v-if="summaryReady" :nodes="summaryItems" dense node-key="label"
          default-expand-all v-model:selected="selectedSummaryItem" no-selection-unset />
      </div>

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
