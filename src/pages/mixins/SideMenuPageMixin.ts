import { defineComponent } from 'vue';

import vueSideMenu from 'src/components/vue-side-menu.vue';

import { MenuCategory, MenuItem } from 'src/types/menuCategory';

export default defineComponent({
  components: { vueSideMenu },
  methods: {
    computePath(baseRouteName: string, slug: string): string {
      return `${baseRouteName}-${slug}`;
    },
    computeCategories(baseRouteName: string, categories: MenuCategory[]) {
      return categories.map((cat) => ({
        name: cat.name,
        items: cat.items.map((item: MenuItem) => ({ ...item, slug: this.computePath(baseRouteName, item.slug) })),
      }));
    },
  },
});
