<template>
  <h1>Fonts</h1>
  <p>
    Tools such as <router-link :to="{ name: 'guides-sign' }">adding a signature</router-link> or <router-link
      :to="{ name: 'guides-watermark' }">adding a watermark</router-link> allow you to personalize the text content by
    choosing a font. Find in this guide the different fonts currently taken into account by the API.
  </p>
  <div class="overflow-auto">
    <table>
      <thead>
        <tr>
          <th scope="col">Font name</th>
          <th scope="col">Value</th>
          <th scope="col">Preview</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="font in fonts" :key="font.value">
          <td>{{ font.name }}</td>
          <td>{{ font.value }}</td>
          <td><img :src="`img/fonts/${font.value}.svg`" :alt="font.name" width="200" height="50"
              class="vertical-middle">
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="q-mt-md">
    <span>Can't find a font that suits your need?</span>
    <q-btn unelevated flat no-caps color="primary" label="Contact us" class="link-btn" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createMetaMixin } from 'quasar';

import fonts from 'src/resources/fonts.js';

export default defineComponent({
  name: 'FontsGuidePost',
  mixins: [createMetaMixin(() => ({
    title: 'Visual PDF API guide - Fonts',
    description: 'Tools such as adding a signature or adding a watermark allow you to personalize the text content by choosing a font. Find in this guide the different fonts currently taken into account by the API.',
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
  }))],
  data() {
    return {
      fonts,
    };
  },
});
</script>
