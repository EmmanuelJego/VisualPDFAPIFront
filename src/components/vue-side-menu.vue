<template>
  <div class="side-menu-overlay" :class="{ 'opacity-0': !mobileVisible }" @click="hide" />
  <div class="side-menu" :class="mobileVisible ? 'mobile-visible' : 'mobile-hidden'">
    <div v-for="(category, catIndex) in categories" :key="`cat-${catIndex}`">
      <div v-if="categories.length > 1" class="cat-title text-h6 text-bold q-mb-xs">
        {{ category.name }}
      </div>
      <div class="cat-items flex column q-gutter-y-xs" :class="{ 'q-pl-md': categories.length > 1 }">
        <q-btn v-for="(item, itemIndex) in category.items" :key="`item-${catIndex}-${itemIndex}`" flat no-caps
          :to="{ name: item.slug }" align="left" class="menu-btn" :class="{ 'active': item.active }" @click="hide">
          <div class="flex items-center text-left">
            {{ item.name }}
          </div>
        </q-btn>
      </div>
    </div>
    <q-btn class="side-menu-mobile-toggle" @click="toggle" color="accent" unelevated
      :icon="mobileVisible ? icons.cross : icons.menu" :ripple="false" padding="sm" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import 'src/css/components/vue-side-menu.scss';

import icons from 'src/resources/icons';
import MenuCategory from '../types/menuCategory';

export default defineComponent({
  name: 'VueSideMenu',
  components: {},
  props: {
    categories: {
      type: Array<MenuCategory>,
      required: true,
    },
  },
  data() {
    return {
      icons,
      mobileVisible: false,
      resizeObserver: undefined as ResizeObserver | undefined,
    };
  },
  watch: {
    '$router.currentRoute.value.path': {
      handler: 'setActiveItem',
      immediate: true,
    },
  },
  mounted() {
    this.resizeObserver = new ResizeObserver(() => {
      const menus = document.getElementsByClassName('side-menu');
      // We should only have 1 menu
      if (menus.length === 1 && getComputedStyle(menus[0]).position === 'sticky') {
        // Set mobile menu as closed + hiding the overlay if the menu is back to a sticky position
        this.mobileVisible = false;
      }
    });

    if (this.$parent) {
      this.resizeObserver.observe(this.$parent.$el);
    }
  },
  beforeUnmount() {
    this.resizeObserver?.disconnect();
  },
  methods: {
    setActiveItem() {
      this.categories.forEach((cat) => {
        cat.items.forEach((item) => {
          item.active = item.slug === this.$router.currentRoute.value.name;
        });
      });
    },
    toggle() {
      this.mobileVisible = !this.mobileVisible;
    },
    hide() {
      this.mobileVisible = false;
    },
  },
});
</script>
