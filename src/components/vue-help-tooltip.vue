<template>
  <span :class="icons.questionCircle">
    <q-tooltip anchor="center right" self="center start" max-width="200px">
      <slot />
    </q-tooltip>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import icons from '../resources/icons.js';

export default defineComponent({
  name: 'VueHelpTooltip',
  data() {
    return {
      icons,
    };
  },
});
</script>
