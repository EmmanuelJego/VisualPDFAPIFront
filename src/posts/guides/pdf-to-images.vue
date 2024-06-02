<template>
  <h1>PDF to images</h1>
  <p>
    The Visual PDF API allows you to create your own solution for transforming PDF files into images. Find out how in
    this guide.
  </p>

  <h2>Basic PDF to images transformation</h2>
  <p>
    To convert a PDF to images you need to use a <router-link :to="{ name: 'guides-pipelines' }">pipeline</router-link>
    with a <span class="inline-code">pdf-to-images</span> task.
  </p>
  <pre>
    <code class="language-javascript">
      // Creating the form data for the pipeline
      const form = new FormData();

      form.append('tasks', [{ tool: 'pdf-to-images' }]);
    </code>
  </pre>
  <p>
    And it's that simple!
  </p>
  <p>
    As output from this task, you will get an image file for each page of the input PDFs.
  </p>

  <!-- WORKAROUND: comment needed -->

  <h2>Specify pages to convert</h2>
  <p>
    You may want to only convert some of the PDF pages. To do so, use the <span class="inline-code">pages</span>
    options:
  </p>
  <pre>
    <code class="language-javascript">
      options: { pages: [0, {range: [4, 'last']}] },
    </code>
  </pre>
</template>

<script lang="ts">
import { createMetaMixin } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ImagesToPDFGuidePost',
  mixins: [createMetaMixin(() => ({
    title: 'Visual PDF API guides - How to turn PDF into images',
    description: 'The Visual PDF API allows you to create your own solution for transforming PDF files into images. Find out how in this guide.',
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
  }))],
});
</script>
