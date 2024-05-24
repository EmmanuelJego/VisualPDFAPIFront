<template>
  <div v-if="previousPost || nextPost" class="posts-nav">
    <q-btn v-if="previousPost" unelevated no-caps class="lite-card rounded-borders-lg q-py-sm" :ripple="false"
      :to="{ name: previousPost.slug }">
      <div class="text-left flex column">
        <div class="text-subtitle2 text-muted flex items-center q-mb-xs">
          <span :class="icons.arrowRight" class="q-mr-sm rotate-180" />
          {{ previousText }}
        </div>
        <div class="text-body1 text-bold">
          {{ previousPost.name }}
        </div>
      </div>
    </q-btn>
    <q-btn v-if="nextPost" unelevated no-caps class="lite-card rounded-borders-lg q-ml-auto q-py-sm" :ripple="false"
      :to="{ name: nextPost.slug }">
      <div class="text-left flex column items-end">
        <div class="text-subtitle2 text-muted flex items-center q-mb-xs">
          {{ nextText }}
          <span :class="icons.arrowRight" class="q-ml-sm" />
        </div>
        <div class="text-body1 text-bold">
          {{ nextPost.name }}
        </div>
      </div>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import icons from 'src/resources/icons';
import { MenuCategory, MenuItem } from 'src/types/menuCategory';

export default defineComponent({
  name: 'VueDocsBottomNav',
  components: {},
  props: {
    categories: {
      type: Array<MenuCategory>,
      default: () => [],
    },
    nextText: {
      type: String,
      default: 'Next article',
    },
    previousText: {
      type: String,
      default: 'Previous article',
    },
  },
  watch: {
    '$router.currentRoute.value.path': {
      handler: 'setPosts',
      immediate: true,
    },
  },
  data() {
    return {
      icons,
      posts: [] as MenuItem[],
    };
  },
  computed: {
    currentPostIndex(): number {
      return this.posts.findIndex((item) => item.slug === this.$router.currentRoute.value.name) ?? -1;
    },
    nextPost(): MenuItem | undefined {
      if (this.currentPostIndex >= 0 && this.posts.length > this.currentPostIndex + 1) {
        return this.posts[this.currentPostIndex + 1];
      }
      return undefined;
    },
    previousPost(): MenuItem | undefined {
      if (this.currentPostIndex > 0) {
        return this.posts[this.currentPostIndex - 1];
      }
      return undefined;
    },
  },
  methods: {
    setPosts() {
      this.posts = this.categories.map((cat) => cat.items).flat();
    },
  },
});
</script>
