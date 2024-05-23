<template>
  <h1>Compress PDF</h1>
  <p>
    Compressing a PDF allows you to reduce its size. Find out how to compress PDF easily from the Visual PDF REST API.
  </p>

  <h2>Basic page cropping</h2>
  <p>
    The PDF compression tool can be used in a <router-link :to="{ name: 'guides-pipelines' }">pipeline</router-link>
    via a <span class="inline-code">compress</span> task.
  </p>
  <pre>
    <code class="language-javascript">
      // Creating the form data for the pipeline
      const form = new FormData();

      form.append('tasks', [{ tool: 'compress' }]);
    </code>
  </pre>

  <!-- WORKAROUND: comment needed when having a ul and pre tags following each other -->

  <h2>Compression level</h2>
  <p>
    You can choose between 3 compression levels, to best adapt the compression to your needs.
  </p>
  <ul>
    <li>
      <span class="inline-code">low</span>: the PDF quality is remained
    </li>
    <li>
      <span class="inline-code">medium</span>: images in the PDF may lose slightly quality. This is the default level
    </li>
    <li>
      <span class="inline-code">high</span>: images in the PDF can lose a lot of quality
    </li>
  </ul>
  <pre>
    <code class="language-javascript">
      form.append(
        'tasks',
        [
          {
            tool: 'compress',
            // Compress input files as much as possible
            options: { level: 'high' },
          },
        ],
      );
    </code>
  </pre>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CompressGuidePost',
  components: {},
  data() {
    return {};
  },
});
</script>
