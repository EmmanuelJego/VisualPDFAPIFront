<template>
  <h1>Merge PDFs</h1>
  <p>
    Join several PDFs easily using the Visual PDF REST API.
  </p>

  <h2>Basic PDF merging</h2>
  <p>
    To use the PDF merging tool, you will need to use a <span class="inline-code">merge</span> task in a <router-link
      :to="{ name: 'guides-pipelines' }">file processing pipeline</router-link>.
  </p>
  <pre>
    <code class="language-javascript">
      // Creating the form data for the pipeline
      const form = new FormData();

      // Adding 2 files to the pipeline
      form.append('file-1', myFirstFile);
      form.append('file-2', mySecondFile);

      // Merging these files
      form.append('tasks', [{ tool: 'merge' }]);
    </code>
  </pre>

  <h2>Custom merge order</h2>
  <p>
    By default, files are merged in the order they were added to the pipeline.
  </p>
  <p>
    However, you can define a personalized order using the <span class="inline-code">order</span> option, by giving the
    files indexes in the order of your choice.
  </p>
  <pre>
    <code class="language-javascript">
      form.append(
        'tasks',
        [
          {
            tool: 'merge',
            // Put the second file first
            options: { order: [1, 0] },
          },
        ],
      );
    </code>
  </pre>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MergeGuidePost',
  components: {},
  data() {
    return {};
  },
});
</script>
