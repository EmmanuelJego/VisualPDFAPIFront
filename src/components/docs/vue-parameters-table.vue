<template>
  <div class="overflow-auto">
    <table>
      <thead>
        <tr>
          <th v-for="col in cols" :key="`col-${col}`" scope="col">{{ col }}</th>
        </tr>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VueParameter',
  components: {},
  props: {
    cols: {
      type: Array<string>,
      default: () => ['Name', 'Description', 'Type', 'Required'],
    },
  },
  data() {
    return {};
  },
});
</script>
